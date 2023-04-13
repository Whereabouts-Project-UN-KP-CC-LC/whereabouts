const db = require('../models/whereaboutsModel');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const axios = require('axios');

const whereaboutsController = {};

// LOGIN component middleware

whereaboutsController.checkUserExists = async (req, res, next) => {
  try {
    // check all reqd fields are provided on req body (already checked on FE, so this may not be needed)
    const props = ['phone_number', 'password'];

    if (!props.every((prop) => Object.hasOwn(req.body, prop))) {
      return next({
        log: 'Express error handler caught whereaboutsController.checkUserExists error: Missing phone number or password',
        status: 500,
        message: { error: 'Missing phone number or password' },
      });
    }

    // destructure / sanitize req body
    const { phone_number, password } = req.body;

    // check that a record for passed phone_number exists in users table
    const queryStrCheck = 'SELECT * FROM users u WHERE u.phone_number=$1';
    const existingUser = await db.query(queryStrCheck, [phone_number]);
    if (!existingUser.rows[0]) {
      return next({
        log: 'Express error handler caught whereaboutsController.checkUserExists error: No user exists for input phone number',
        status: 500,
        message: { error: 'No user exists for input phone number' },
      });
    }

    // if user exists in users table, compare user-input password with stored hashed password
    const passwordIsMatch = await bcrypt.compare(
      password,
      existingUser.rows[0].password
    );

    if (!passwordIsMatch) {
      
      return next({
        log: 'Express error handler caught whereaboutsController.checkUserExists error: Input password is incorrect',
        status: 400, // original 500
        message: { error: 'Input password is incorrect' },
      });
    }
    // no need to persist data, only success message needed on FE
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught whereaboutsController.checkUserExists error',
      status: 500,
      message: { error: 'User login failed' },
      // message: { error: error.stack }, // for more detailed debugging info
    });
  }
};

// REGISTER component middleware

whereaboutsController.insertNewUser = async (req, res, next) => {
  try {
    // check all reqd fields are provided on req body (already checked on FE, so this may not be needed)
    const props = ['name', 'phone_number', 'password'];

    if (!props.every((prop) => Object.hasOwn(req.body, prop))) {
      return next({
        log: 'Express error handler caught whereaboutsController.insertNewUser error: Missing name, phone number, or password',
        status: 500,
        message: { error: 'Missing name, phone number, or password' },
      });
    }

    // destructure / sanitize req body
    const { name, phone_number, password } = req.body;

    // check user does NOT already exist in users table
    const queryStrCheck = 'SELECT * FROM users u WHERE u.phone_number=$1';
    const existingUser = await db.query(queryStrCheck, [phone_number]);
    if (existingUser.rows[0]) {
      return next({
        log: 'Express error handler caught whereaboutsController.insertNewUser error: A user with this phone number already exists',
        status: 409,
        message: { error: 'A user with this phone number already exists' },
      });
    }

    // salt+hash user-input password
    const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);

    // insert new user's info (inc hashed password) into users table
    const queryStrInsert =
      'INSERT INTO users(name, phone_number, password) VALUES($1, $2, $3) RETURNING *';

    const insertedUser = await db.query(queryStrInsert, [
      name,
      phone_number,
      hashedPassword,
    ]);

    // no need to persist data, only success message needed on FE
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught whereaboutsController.insertNewUser error',
      status: 500,
      message: { error: 'Failed to create new user' },
      // message: { error: error.stack } // for more detailed debugging info
    });
  }
}
//get contacts of current user
whereaboutsController.getContacts = async (req, res, next) => {
    try {
        res.locals.contacts = await db.query(
            `select u.phone_number, u.name from users u
            inner join contacts_join cj on u.phone_number = cj.contact_phone_number
            where cj.traveler_phone_number = $1`,
            [req.params['phone_number']]
        );
        return next();
    } catch (error) {
        return next({
            log: 'Express error handler caught whereaboutsController.getContacts error',
            status: 500,
            message: { error: 'Retrieving contacts of current user failed' },
        });
    }
};

//get single user by phone number
whereaboutsController.getUserByPhoneNumber = async (req, res, next) => {

  try {
      res.locals.user = await db.query(
          `SELECT * FROM users WHERE phone_number=$1`,
          [req.params['phone_number']]
      );
      return next();
  } catch (error) {
      return next({
          log: 'Express error handler caught whereaboutsController.getUserByPhoneNumber error',
          status: 500,
          message: { error: 'Retrieving single user failed' },
      });
  }
};

//delete contact
whereaboutsController.deleteContact = async (req, res, next) => {
    try {
        await db.query(
            `DELETE FROM contacts_join
            WHERE traveler_phone_number = $1 AND contact_phone_number = $2`,
            [req.params.travelerPhone, req.params.contactPhone]
        );
        return next();
    } catch (error) {
        return next({
            log: 'Express error handler caught whereaboutsController.deleteContact error',
            status: 500,
            message: { error: 'Failed to delete contact' },
        });
    }
};

//gets current location, stores new trip with current location and stores traveler/watcher relation after user clicks 'start new trip'
whereaboutsController.startNewTrip = async (req, res, next) => {
  try {
    //get user's current location
    const {data} = await axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBRzoiY1lCeVlXPEZELkqEdTehWIUcijms`); //FIXME --> use .env to store the key
    const lat = data.location.lat;
    const lng = data.location.lng;
    //store trip in trips table
    const {rows} = await db.query(
      `INSERT
      INTO trips
      (start_timestamp, start_lat, start_lng)
      VALUES
      (NOW(), ${lat}, ${lng})
      RETURNING id`
    );
    const tripId = rows[0].id;
    //store traveler in join table
    await db.query(
      `INSERT
      INTO trips_users_join
      (trips_id, user_is_traveler, user_phone_number)
      VALUES
      (${tripId}, TRUE, ${req.body.traveler})`
    );
    req.body.watchers.forEach(async watcher => {
      await db.query(
        `INSERT
        INTO trips_users_join
        (trips_id, user_is_traveler, user_phone_number)
        VALUES
        (${tripId}, FALSE, ${watcher})`
      );
    })
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught whereaboutsController.startNewTrip error',
      status: 500,
      message: { error: 'Error starting a new trip' },
    });
  }
};

module.exports = whereaboutsController;

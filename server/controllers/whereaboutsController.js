const db = require('../models/whereaboutsModel');

const whereaboutsController = {};

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

module.exports = whereaboutsController;
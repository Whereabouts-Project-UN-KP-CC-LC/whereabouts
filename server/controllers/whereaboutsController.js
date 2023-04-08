const db = require('../models/whereaboutsModel');

const whereaboutsController = {};

whereaboutsController.getUser = async (req, res, next) => {
    const id = req.params.id;
    res.locals.user = await db.query('SELECT * FROM users WHERE id=$1', [id]);
    return next();
};

//get contacts of current user
whereaboutsController.getContacts = async (req, res, next) => {
    res.locals.contacts = await db.query(
        `SELECT c.traveler_id, u.id as contact_id, u.name, u.phone_number
        FROM users u
        INNER JOIN contacts_join c
        ON u.id = c.contact_id
        WHERE c.traveler_id = $1`,
        [req.params.id]
    );
    return next();
};

//get single user by phone number
whereaboutsController.getUserByPhoneNumber = async (req, res, next) => {
    res.locals.user = await db.query(
        `SELECT * FROM users WHERE phone_number=$1`,
        [req.params['phone_number']]
    );
    return next();
};

//delete contact
whereaboutsController.deleteContact = async (req, res, next) => {
    await db.query(
        `DELETE FROM contacts_join
        WHERE traveler_id = $1 AND contact_id = $2`,
        [req.params.travelerId, req.params.contactId]
    );
    return next();
};
module.exports = whereaboutsController;
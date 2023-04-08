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

module.exports = whereaboutsController;
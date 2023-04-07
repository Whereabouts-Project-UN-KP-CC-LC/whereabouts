const db = require('../models/whereaboutsModel');

const whereaboutsController = {};

whereaboutsController.getUser = async (req, res, next) => {
    const id = req.params.id;
    res.locals.user = await db.query('SELECT * FROM users WHERE id=$1', [id]);
    return next();
};

module.exports = whereaboutsController;
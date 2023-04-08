const express = require('express');
const router = express.Router();
const whereaboutsController = require('../controllers/whereaboutsController');

// LOGIN component routes

router.post('/login', whereaboutsController.checkUserExists, (req, res) =>
  res.status(200).json(res.locals.verifiedUser)
);

// REGISTER component routes

router.post('/register', whereaboutsController.insertNewUser, (req, res) =>
  res.status(200).json(res.locals.newUser)
);

module.exports = router;

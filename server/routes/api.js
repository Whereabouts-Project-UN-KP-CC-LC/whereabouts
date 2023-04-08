const express = require('express');
const router = express.Router();
const whereaboutsController = require('../controllers/whereaboutsController');

// LOGIN component routes

router.post('/login', whereaboutsController.checkUserExists, (req, res) =>
  res.sendStatus(200)
);

// REGISTER component routes

router.post('/register', whereaboutsController.insertNewUser, (req, res) =>
  res.sendStatus(200)
);

module.exports = router;

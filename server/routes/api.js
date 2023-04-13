const express = require('express');
const router = express.Router();
const whereaboutsController = require('../controllers/whereaboutsController');

// LOGIN component routes

router.post('/login', whereaboutsController.checkUserExists, (req, res) => {
  res.sendStatus(200);
});
//get all contacts of current user
router.get('/users/contacts/', whereaboutsController.getContacts, (req, res) => {
  const { rows } = res.locals.contacts;
  res.status(200).json(rows);
});

// REGISTER component routes
//get single user by phone number (for adding contacts). If nothing is found, the 'rows' property is an empty array.
// testing without :phone_number in route
router.get('/users/:phone_number', whereaboutsController.getUserByPhoneNumber, (req, res) => {
  const { rows } = res.locals.user;
  res.status(200).json(rows);
});

//delete a contact
router.delete('/users/contacts/traveler/:travelerPhone/contact/:contactPhone', whereaboutsController.deleteContact, (req, res) => {
  res.status(204).json([]); //204 --> no content
});


router.post('/register', whereaboutsController.insertNewUser, (req, res) =>
  res.sendStatus(200)
);

//start new trip
router.post('/trips/start', whereaboutsController.startNewTrip, (req, res) => {
  res.status(204).json([]);
});

module.exports = router;
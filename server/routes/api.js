const express = require('express');
const router = express.Router();
const whereaboutsController = require('../controllers/whereaboutsController');



router.get('/users/:id', whereaboutsController.getUser, (req, res) => {
  console.log(`res.locals.user: ${res.locals.user}`)
    res.status(200).json(res.locals.user)
});

//get all contacts of current user
router.get('/users/contacts/:id', whereaboutsController.getContacts, (req, res) => {
  const { rows } = res.locals.contacts;
  res.status(200).json(rows);
});

//get single user by phone number (for adding contacts). If nothing is found, the 'rows' property is an empty array.
router.get('/users/byphone/:phone_number', whereaboutsController.getUserByPhoneNumber, (req, res) => {
  const { rows } = res.locals.user;
  res.status(200).json(rows);
});

//delete a contact
router.delete('/users/contacts/traveler/:travelerId/contact/:contactId', whereaboutsController.deleteContact, (req, res) => {
  res.status(204).json([]); //204 --> no content
});

module.exports = router;

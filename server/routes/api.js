const express = require('express');
const router = express.Router();
const whereaboutsController = require('../controllers/whereaboutsController');



router.get('/users/:id', whereaboutsController.getUser, (req, res) => {
  console.log(`res.locals.user: ${res.locals.user}`)
    res.status(200).json(res.locals.user)
});

//get all contacts of current user
router.get('/users/contacts/:id', whereaboutsController.getContacts, (req, res) => {
  res.status(200).json(res.locals.contacts);
});



module.exports = router;

const express = require('express');
const router = express.Router();
const Users = require('../models/users');

//INDEX route
router.get('/', (req, res) => {
  Users.find((err, foundUser) => {
    if(err) console.log(err);
    console.log(foundUser);
    res.render('users/index.ejs', {users : foundUser});
  });
});










module.exports = router;

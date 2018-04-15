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

//NEW route
router.get('/new', (req, res) => {
  res.render('users/new.ejs')
});

router.post('/', (req, res) => {
//need to use body-parser
//also, properties in schema and input form MUST MATCH
  Users.create(req.body, (err, createdUser) => {
    if(err) console.log(error);
    console.log(createdUser);
    res.redirect('/users');
  });
});










module.exports = router;

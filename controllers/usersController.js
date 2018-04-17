const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Photos = require('../models/photos');


//INDEX route
router.get('/', async (req, res) => {
  try {
    const foundUser = await Users.find();
    res.render('users/index.ejs', {
      users : foundUser
    });
  } catch(err) {
    res.send(err)
  }
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


//SHOW
router.get('/:id', (req, res) => {
  Users.findById(req.params.id, (err, foundUser) => {
    if(err) console.log(err);
    res.render('Users/show.ejs', {
      users: foundUser
    });
  });
});


//UPDATE
//GET route// to 'get' edit page up
router.get('/:id/edit', (req, res) => {

  Users.findById(req.params.id, (err, foundUser) => {
    if(err) console.log(err);
    else console.log(foundUser);
    res.render('users/edit.ejs', {
      users: foundUser,
    });
  });
});



//DELETE
//delete using the index of data in model
router.delete('/:id', (req, res) => {

  Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if(err) console.log(err);
    else {
      console.log(deletedUser);
      res.redirect('/users')
    }
  });
});


//EDIT
//PUT route/ to 'put' update on index page
router.put('/:id', (req, res) => {

  const userEdit = {};
    userEdit.username = req.body.username;
    userEdit.password = req.body.password;

    Users.findByIdAndUpdate(req.params.id, userEdit, {new : true}, (err, updatedUser) => {
      if(err) console.log(err);
      console.log(updatedUser);
      res.redirect('/users');
    })
  });








module.exports = router;

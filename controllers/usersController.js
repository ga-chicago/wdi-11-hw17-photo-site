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

router.post('/', async (req, res) => {
//need to use body-parser
//also, properties in schema and input form MUST MATCH

  try {
    const createdUser = await Users.create(req.body);
    res.redirect('/users');
  } catch(err) {
    res.send(err)
  }
});


//SHOW
router.get('/:id', async (req, res) => {
  try {
      const foundUser = await Users.findById(req.params.id);
      res.render('Users/show.ejs', {
        users: foundUser
      });
    } catch(err) {
      res.send(err)
    }
});



//UPDATE
//GET route// to 'get' edit page up
router.get('/:id/edit', async (req, res) => {
  try {
      const foundUser = await Users.findById(req.params.id);
      res.render('users/edit.ejs', {
        users: foundUser,
      });
    } catch(err) {
      res.send(err)
    }
});



//DELETE
//delete using the index of data in model
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndRemove(req.params.id,)
    res.redirect('/users')
  } catch(err) {
    res.send(err)
  }
});


//EDIT
//PUT route/ to 'put' update on index page
router.put('/:id', async (req, res) => {
  try {
    const userEdit = {};
    userEdit.username = req.body.username;
    userEdit.password = req.body.password;
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, userEdit, {new : true});
    res.redirect('/users');
  } catch(err) {
      res.send(err)
  }
});


module.exports = router;

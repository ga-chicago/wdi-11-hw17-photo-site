const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Articles = require('../models/photos');


//ROUTE TO USER INDEX
router.get('/', (req, res) => {

	Users.find((err, foundUsers) => {
		if (err) console.log(err);
		res.render('users/index.ejs', {
			users: foundUsers
		}); 	
	});
});

//ROUTE TO NEW USER PAGE
router.get('/new', (req, res) => {
	res.render('users/new.ejs');
});

//ROUTE TO ADD NEW USER
router.post('/', (req, res) => {
	
	Users.create(req.body, (err, createdUser) => {
		if(err) console.log(err);
		res.redirect('/users');
	});
});

//ROUTE TO SHOW PAGE

router.get('/:id', (req, res) => {
	
	Users.findById(req.params.id, (err, foundUser) => {
		if(err) console.log(err);
		res.render('users/show.ejs', {
			user: foundUser
		});
	});
});


//ROUTE TO DELETE USER

router.delete('/:id', (req, res) => {

	Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if(err) console.log(err);
		console.log(deletedUser);
		res.redirect("/users");
	});
});

//ROUTE TO EDIT USER
router.get('/:id/edit', (req, res) => {

	Users.findById(req.params.id, (err, foundUser) => {
		if (err) console.log(err);
		res.render('users/edit.ejs', {
			user: foundUser
		});
	});
});

//PUT ROUTE FOR AFTER EDIT
router.put('/:id', (req, res) => {

	Users.findByIdAndUpdate(req.params.id, req.body, (err, updatedAuthor) => {
		if(err) console.log(err);
		res.redirect('/users')
	});
});

module.exports = router;
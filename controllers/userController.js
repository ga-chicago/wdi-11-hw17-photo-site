const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Articles = require('../models/photos');


//ROUTE TO USER INDEX
router.get('/', async (req, res) => {

	try {

		const foundUsers = await Users.find();
		res.render('users/index.ejs',{
			users: foundUsers
		})

	} catch (err){

		res.send(err);
		
	}
});


//ROUTE TO NEW USER PAGE
router.get('/new', (req, res) => {
	res.render('users/new.ejs');
});

//ROUTE TO ADD NEW USER
router.post('/', async (req, res) => {

	try {

		const createdUser = await Users.create(req.body);
		res.redirect('/users')

	} catch (err) {

		res.send(err)

	}
});

//ROUTE TO SHOW PAGE

router.get('/:id', async (req, res) => {
	
	try {

		const foundUser = await Users.findById(req.params.id);
		res.render('users/show.ejs', {
			user: foundUser
		});

	} catch (err) {

		res.send(err)

	}
});


//ROUTE TO DELETE USER

router.delete('/:id', async (req, res) => {

	try {

		const deletedUser = await Users.findByIdAndRemove(req.params.id);
		res.redirect('/users');

	} catch (err) {

		res.send(err)
	}
});


//ROUTE TO EDIT USER
router.get('/:id/edit', async (req, res) => {

	try {

		const foundUser = await Users.findById(req.params.id);
		res.render('users/edit.ejs',{
			user: foundUser
		})

	} catch (err) {

		res.send(err)

	}
});


//PUT ROUTE FOR AFTER EDIT
router.put('/:id', async(req, res) => {

	try {

		const updatedAuthor = await Users.findByIdAndUpdate(req.params.id, req.body);
		res.redirect('/users')


	} catch (err) {

		res.send(err)
	}
});


module.exports = router;
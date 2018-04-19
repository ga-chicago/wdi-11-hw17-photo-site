const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
	const message = req.session.message;
	req.session.message = null;
	res.render('auth/login.ejs', {
		message: message
	})
})


router.post('/login', async (req, res, next) => {

	try {
		// find the user
		const user = await User.findOne({username: req.body.username});
		// if the user is not in the database, it will return null
		if (user) {
			// if user is found
			// now we need to compare the passwords 
			// bcrypt.compareSync returns true or false
			if(bcrypt.compareSync(req.body.password, user.password)) {
				req.session.loggedIn = true;
				req.session.username = user.username;
				res.redirect('/articles');
			} else {
				// if user password doesn't match input
				req.session.message = "Username or password is incorrect. Please try again.";
				res.redirect('/');
			}
		} else {
			// if user isn't found
			req.session.message = "Username or password is incorrect. Please try again.";
			res.redirect('/');
		}
	} catch (err) {
		next(err)
	}
})

router.post('/register', (req, res) => {

	const password = req.body.password;

	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const newUser = ({
		username: req.body.username,
		password: passwordHash
	})
	const user = User.create(newUser);
		// if the user was successfully created, let's create the session for that user
		if (user) {
			req.session.loggedIn = true;
			req.session.username = user.username;
			res.redirect('/photos');
		} else {
			req.sesson.message = "Sorry, it didn't work";
			res.redirect('/');
		}
})


module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
	res.render('auth/login.ejs', {})
})


router.post('/login', (req, res) => {



	req.session.loggedIn = true;
	req.session.username = req.body.username;
	req.session.password = req.body.password;
	res.redirect('/photos');
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
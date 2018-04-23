const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
	const message = req.session.message;
	req.session.message = null;
	res.render('auth/login.ejs', {
		message: message
	});		
})

router.post("/login", async (req, res, next) => {
	try {
		const user = await User.findOne({username: req.body.username});

		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				req.session.logged = true;
				req.session.username = user.username;

				res.redirect('/users')
			} else {
				req.session.message = "Username or password is incorrect."
				res.redirect("/");
			}
		} else {
			req.session.message = "Username or password is incorrect."
			res.redirect("/")
		}
	} catch(err) {
		next(err)
	}
})

router.get('/registration', (req, res, next) => {
	const message = req.session.message;
	req.session.message = null;
	res.render('auth/register.ejs', {
		message: message
	})
})

router.post("/registration", async (req, res, next) => {
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

	const newUser = {
		username: req.body.username,
		password: passwordHash
	}

	try {
		const existingUser = await User.findOne({username: req.body.username});

		if (existingUser) {
			req.session.message = "Sorry, that username is already taken."
			// res.send('username is already taken')
			res.redirect('/');
		} else {
			const user = await User.create(newUser);
			console.log(user);
			// res.send(user);
			if (user) {
				req.session.logged = true;
				req.session.username = user.username;
				res.redirect('/users')
			}
		}
	} catch (err) {
		req.session.message = "Sorry, it didn't work."
		// res.send(req.session.message)
		res.redirect('/')
	}
})


module.exports = router;
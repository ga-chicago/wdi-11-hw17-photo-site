const express = require('express');
const router = express.Router();
const Users = require('../models/users')

// ** INDEX GET ROUTE **
router.get('/', (req, res) => {
	Users.find((err, users) => {
		res.render('users/index.ejs', {
			theUsers: users
		});	
	});		
});

// ** NEW ** route 
router.get('/new', (req, res) => {
	res.render('users/new.ejs')	
});

router.post('/', (req, res) => {
	Users.create({
		username: req.body.username,
		password: req.body.password
	}, (err, newUser) => {
		if(err) console.log(err);
		else console.log(newUser);
	});
	res.redirect('/users')		
})

module.exports = router;
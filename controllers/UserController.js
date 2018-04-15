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

module.exports = router;
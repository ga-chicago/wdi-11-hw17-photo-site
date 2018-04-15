const express = require('express');
const router = express.Router();
const Users = require('../models/users')

// ** INDEX GET ROUTE **
router.get('/', (req, res) => {
	console.log('route is being called');
	Users.find((err, users) => {
		res.render('users/index.ejs', {
			theUsers: users
		});	
	});		
});



module.exports = router;
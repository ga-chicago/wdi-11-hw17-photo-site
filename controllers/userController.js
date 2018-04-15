const express = require('express');
const router = express.Router();
const Users = require('../models/users');


//ROUTE TO USER INDEX
router.get('/', (req, res) => {

	Users.find((err, foundUsers) => {
		if (err) console.log(err);
		console.log(foundUsers, ' Users');
		res.render('users/index.ejs'); 	
	});
});


module.exports = router;
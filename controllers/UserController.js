const express = require('express');
const router = express.Router();
const Users = require('../models/users')

// ** INDEX GET ROUTE **
router.get('/', (req, res) => {
	Users.find((err, users) => {
		res.render('users/index.ejs', {
			theUsers: users,
			id: req.params.id
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

// ** SHOW ** route
router.get('/:id', (req, res) => {
	Users.findById(req.params.id, (err, user) => {
		console.log("show route, user: " + user);
		if(err) console.log(err);
		res.render('users/show.ejs', {
			user: user,
			id: req.params.id
		})
	})	
})


// ** edit route ** 
router.get('/:id/edit', (req, res) => {
	console.log("req.body: " + req.body);
	Users.findById(req.params.id, (err, user) => {
		if(err) console.log(err);
		console.log("User: " + req.body);
		console.log(req.body.username);
		console.log(req.body.password);
		res.render('users/edit.ejs', {
			user: user,
			id: req.params.id
		})
	})		
})

router.put('/:id', (req, res) => {
	const theUser = {
		username: req.body.username,
		password: req.body.password
	}
	Users.findByIdAndUpdate(req.params.id, theUser, {new: true}, (err, user) => {
		if(err) console.log(err);
		console.log("here is the new user: " + user);
		res.redirect('/users')	
	})	

})


// **DELETE** route
router.delete('/:id', (req, res) => {
	Users.findByIdAndRemove(req.params.id, (err, user) => {
		if(err) console.log(err);
		else console.log("deleted this user: " + user);	
		res.redirect('/users')
	})
	
})




module.exports = router;
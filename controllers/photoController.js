const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const Users = require('../models/users')

// ** index ** get route
router.get('/', (req, res) => {
	Photos.find((err, photos) => {
		if(err) console.log(err);
		res.render('photos/index.ejs', {
			thePhotos: photos,
			id: req.params.id
		});	
	});		
});

// ** new ** route
router.get('/new', (req, res) => {
	res.render('photos/new.ejs')		
})

router.post('/', (req, res) => {
	Users.find({},(err, allUsers) => {
		for (let i = 0; i < allUsers.length; i++) {
			if (req.body.username === allUsers[i].username) {
				Photos.create(req.body, (err, newPhoto) => {
					if(err) console.log(err);
					res.redirect('/photos/')
				})
			} else {
				console.log("No matching username found. Please create a new user account") // this will eventually need to be a modal or another view but this is good enough for now
			}
		}	
	})
})

// ** show ** route
router.get('/:id', (req, res) => {
	Photos.findById(req.params.id, (err, photo) => {
		if(err) console.log(err);
		res.render('photos/show.ejs', {
			photo: photo
		})	
	})		
})

module.exports = router;
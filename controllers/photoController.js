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
				Users.findOne({username: req.body.username}, (err, foundUser) => {
					Photos.create(req.body, (err, newPhoto) => {
						if(err) console.log(err);
						foundUser.photos.push(newPhoto);
						foundUser.save((err, data) => {
							res.redirect('/photos/')
						})
						
					})
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
			photo: photo, 
			id: req.params.id
		})	
	})		
})

// ** delete ** route
router.delete('/:id', (req, res) => {
	Photos.findById(req.params.id, (err, photo) => {
		Users.findOne({username: photo.username}, (err, foundUser) => {

			for (let i = 0; i < foundUser.photos.length; i++) {
				// console.log(foundUser.photos[i])
				// console.log(req.params.id);
				// console.log(foundUser.photos[i]._id + "<-- id for each photo");
				if (foundUser.photos[i]._id === req.params.id) {
					res.send('true')
					// foundUser.photos[i].remove();
					// foundUser.save((err, data) => {
					// 	if(err) console.log(err);
					// 	else {
					// 		console.log("I work");
					// 	}
					// 	res.redirect('/photos')
					// })
				}
			}
			// foundUser.photos.id(req.params.id).remove();
			// foundUser.save((err, data) => {
			// 	if(err) console.log(err);
			// 	res.redirect('/photos')
			// })
		})	
	})


	// Photos.findByIdAndRemove(req.params.id, () => {
	// 	console.log({'photos._id': req.params.id})
	// 	Users.findOne({'photos._id': req.params.id}, (err, foundUser) => {
	// 		res.send(foundUser + " foundUser");
			// foundUser.photos.id(req.params.id).remove();
			// foundUser.save(() => {
			// 	res.redirect('/photos')
			// })
	// 	})
	// })		
})


module.exports = router;
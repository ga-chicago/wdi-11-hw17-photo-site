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

// ** edit ** route 
router.get('/:id/edit', async (req, res, next) => {
	try {
		const foundPhoto = await Photos.findById(req.params.id);

		const allUsers = await Users.find();

		const foundPhotoUser = await Users.findOne({'photos._id': req.params.id});

		console.log(foundPhoto._id);

		res.render('photos/edit.ejs', {
			photo: foundPhoto,
			users: allUsers,
			photoUser: foundPhotoUser
		})

	} catch (err) {
		next(err);
	}
})

router.put('/:id', async (req, res, next) => {
	try {
		const updatedPhoto = await Photos.findByIdAndUpdate(req.params.id, req.body, {new: true});

		const foundUser = await Users.findOne({'photos._id': req.params.id})

		if (foundUser._id.toString() != req.body.userId) {
			foundUser.photos.id(req.params.id).remove();

			const savedFoundUser = await foundUser.save();
			const newUser = await Users.findById(req.body.userId);
			newUser.photos.push(updatedPhoto);

			const savedNewUser = await newUser.save();

			res.redirect('/photos/' + req.params.id)
		} else {
			foundUser.photos.id(req.params.id).remove();

			foundUser.photos.push(updatedPhoto);

			const savedFoundUser = await foundUser.save();
			res.redirect('/photos/' + req.params.id);
		}
	} catch(err) {
		next(err)
	}
})


//**delete ** route
router.delete("/:id", async (req, res, next) => {
	try {
		const deletedPhoto = await Photos.findByIdAndRemove(req.params.id);
		const foundUser = await Users.findOne({'photos._id': req.params.id});
		foundUser.photos.id(req.params.id).remove();
		const savedUser = await foundUser.save();
		res.redirect("/photos");
	} catch (err) {
		next(err);
	}
})



module.exports = router;
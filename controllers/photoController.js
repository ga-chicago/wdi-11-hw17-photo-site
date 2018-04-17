const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const User = require('../models/users');

//ROUTE TO PHOTO INDEX
router.get('/', (req, res) => {

	Photos.find((err, foundPhotos) => {
		if(err)console.log(err);
		res.render('photos/index.ejs',{photos: foundPhotos});
	});
});

//ROUTE FOR LIST OF USERS
router.get('/new', (req, res) => {
	User.find({}, (err, allUsers) => {
		res.render('photos/new.ejs', {
			users: allUsers
		});
	});
});


//ROUTE TO SHOW PAGE

router.get('/:id', (req, res) => {
	// console.log("---------------------------hittheshowroute--------------------------")
	Photos.findById(req.params.id, (err, foundPhoto) => {
		User.findOne({'articles._id': req.paramsid}, (err, foundUser) => {
			if(err) console.log(err);
			res.render('photos/show.ejs', {
				photo: foundPhoto,
				user: foundUser
			});
		});
	});
});



//ROUTE TO ADD NEW PHOTO
router.post('/', (req, res) => {
	User.findById(req.body.userId, (err, foundUser) => {
		Photos.create(req.body, (err, addedPhoto) => {
			if(err) console.log(err);
			foundUser.photos.push(addedPhoto);
			foundUser.save((err, data) => {
				res.redirect('/photos');
			})
		})
	});
});

//ROUTE TO DELETE PHOTO

router.delete('/:id', (req, res) => {
	Photos.findByIdAndRemove(req.params.id, () => {
		User.findOne({'photos._id': req.params.id}, (err, foundUser) => {
			foundUser.photos.id(req.params.id).remove();
			foundUser.save((err, data) => {
				res.redirect('/photos');
			});
		});
	});
});

//ROUTE TO EDIT IMAGE
router.get('/:id/edit', (req, res) => {

	Photos.findById(req.params.id, (err, foundPhoto) => {
		User.find({}, (err, allUsers) => {
			if (err) console.log(err);
			User.findOne({'photos._id': req.params.index}, (err, foundUser) => {
			res.render('photos/edit.ejs', {
				photo: foundPhoto,
				title: foundPhoto.title,
				webLink: foundPhoto.webLink,
				users: allUsers,
				photographer: foundUser
				});
			});
		});
	});
});

//PUT ROUTE FOR AFTER EDIT
router.put('/:id', (req, res) => {

	Photos.findByIdAndUpdate(req.params.id, req.body, (err, updatedPhoto) => {
		if(err) console.log(err);
		res.redirect('/photos')
	});
});



module.exports = router;
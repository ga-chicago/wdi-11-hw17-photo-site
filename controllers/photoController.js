const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const User = require('../models/users');

//ROUTE TO PHOTO INDEX
router.get('/', async (req, res) => {

	try {

		const foundPhotos = await Photos.find();
		res.render('photos/index.ejs',
		{
			photos: foundPhotos
		})
	} catch (err) {
		res.send(err)
	}
});

//ROUTE FOR LIST OF USERS
router.get('/new', async (req, res) => {

	try {
		const allUsers = await User.find({})
		res.render('photos/new.ejs',{
			users: allUsers
		})
	} catch (err) {
		res.send(err)
	}
});


//ROUTE TO SHOW PAGE

router.get('/:id', async (req, res) => {
	try {
		const foundPhoto = await Photos.findById(req.params.id);
		const foundUser = await User.findOne({'articles._id': req.paramsid})

		res.render('photos/show.ejs', {
			photo: foundPhoto,
			user: foundUser
		})
	} catch (err) {
		res.send(err)
	}
});


//ROUTE TO ADD NEW PHOTO
router.post('/', async (req, res) => {

	try {

		const foundUser = await User.findById(req.body.userId);
		const addedPhoto = await Photos.create(req.body);

		foundUser.photos.push(addedPhoto);
		foundUser.save((err, data) => {
			res.redirect('/photos')
		})
	} catch (err) {
		res.send(err)
	}
});

//ROUTE TO DELETE PHOTO

router.delete('/:id', async(req, res) => {

	try {

		const deletedPhoto = await Photos.findByIdAndRemove(req.params.id);
		const foundUser = await User.findOne({'photos._id': req.params.id});

		foundUser.photos.id(req.params.id).remove();
		foundUser.save((err, data) => {
			res.redirect('/photos');
		});

	} catch (err) {
		res.send(err)
	}
});

//ROUTE TO EDIT IMAGE
router.get('/:id/edit', async(req, res) => {

	try {
		const foundPhoto = await Photos.findById(req.params.id);
		const allUsers = await User.find({});
		const foundUser = await User.findOne({'photos._id': req.params.index});

		res.render('photos/edit.ejs', {
			photo: foundPhoto,
			title: foundPhoto.title,
			webLink: foundPhoto.webLink,
			users: allUsers,
			photographer: foundUser
		})
	} catch (err) {
		res.send(err)
	}
});


//PUT ROUTE FOR AFTER EDIT
router.put('/:id', async (req, res) => {

	try {
		const updatedPhoto = await Photos.findByIdAndUpdate(req.params.id, req.body);
		res.redirect('/photos')
	} catch (err){
		res.send(err)
	}
});



module.exports = router;
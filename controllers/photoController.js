const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');

//ROUTE TO PHOTO INDEX
router.get('/', (req, res) => {

	Photos.find((err, foundPhotos) => {
		if(err)console.log(err);
		res.render('photos/index.ejs',{photos: foundPhotos});
	});
});

//ROUTE TO NEW PHOTO PAGE
router.get('/new', (req, res) => {
	res.render('photos/new.ejs');
});

//ROUTE TO ADD NEW PHOTO
router.post('/', (req, res) => {
	
	Photos.create(req.body, (err, addedPhoto) => {
		if(err) console.log(err);
		res.redirect('/photos');
	});
});

//ROUTE TO SHOW PAGE

router.get('/:id', (req, res) => {
	
	Photos.findById(req.params.id, (err, foundPhoto) => {
		if(err) console.log(err);
		res.render('photos/show.ejs', {
			photo: foundPhoto
		});
	});
});

//ROUTE TO DELETE Photo

router.delete('/:id', (req, res) => {

	Photos.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
		if(err) console.log(err);
		console.log(deletedPhoto);
		res.redirect("/photos");
	});
});

//ROUTE TO EDIT USER
router.get('/:id/edit', (req, res) => {

	Photos.findById(req.params.id, (err, foundPhoto) => {
		if (err) console.log(err);
		res.render('photos/edit.ejs', {
			photo: foundPhoto
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
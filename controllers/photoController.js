const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const Users = require('../models/users');

// index route
router.get("/", (req, res) => {
	Photos.find((err, foundPhotos) => {
		if (err) console.log(err);
		console.log(foundPhotos);
		res.render('photos/index.ejs', {
			photos: foundPhotos
		});
	})
})

// new route
router.get("/new", (req, res) => {
	res.render('photos/new.ejs')
})

router.post("/", (req, res) => {
	Photos.create(req.body, (err, createdPhoto) => {
		if (err) console.log(err);
		console.log(createdPhoto);
		res.redirect("/photos");
	})
})

// show route
router.get("/:id", (req, res) => {
	Photos.findById(req.params.id, (err, foundPhoto) => {
		if (err) console.log(err);
		res.render('photos/show.ejs', {
			photo: foundPhoto
		})
	})
})

// edit route
router.get("/:index/edit", (req, res) => {
	Photos.findById(req.params.index, (err, photo) => {
			if (err) console.log(err);
			console.log(photo);
			res.render("photos/edit.ejs", {
				photo: photo,
				index: photo.id
			});
		})
})

router.put("/:id", (req, res) => {
	Photos.findByIdAndUpdate(
		req.params.id,
		{
			username: req.body.username,
			url: req.body.url,
			caption: req.body.caption,
			dateAdded: req.body.dateAdded
		},
		(err, photos) => {
			if (err) console.log(err);
			res.redirect("/photos");
		})
})

router.delete("/:id", (req, res) => {
	Photos.findByIdAndRemove(req.params.id, (err, deletedPhoto) => {
		if (err) console.log(err);
		res.redirect("/photos");
	})
})



module.exports = router;
const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const Users = require('../models/users');

// index route
router.get("/", async (req, res, next) => {
	try {
		const foundPhotos = await Photos.find();
		res.render('photos/index.ejs', {
			photos: foundPhotos
		});		
	} catch (err) {
		next(err);
	}
})

// new route
router.get("/new", (req, res, next) => {
	res.render('photos/new.ejs')
})

router.post("/", async (req, res, next) => {
	try {
		const createdPhoto = await Photos.create(req.body);
		res.redirect("/photos");
	} catch (err) {
		next(err);
	}
})

// show route
router.get("/:id", async (req, res, next) => {
	try {
		const foundPhoto = await Photos.findById(req.params.id);
		res.render('photos/show.ejs', {
			photo: foundPhoto
		})		
	} catch (err) {
		next(err);
	}
})

// edit route
router.get("/:id/edit", async (req, res, next) => {
	try {
		const foundPhoto = await Photos.findById(req.params.id);
		res.render("photos/edit.ejs", {
			photo: foundPhoto,
			index: foundPhoto.id
		});		
	} catch (err) {
		next(err);
	}
})

router.put("/:id", async (req, res, next) => {
	try {
		const updatedPhoto = Photos.findByIdAndUpdate(req.params.id, req.body);
		res.redirect("/photos");
	} catch (err) {
		next(err);
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		const deletedPhoto = Photos.findByIdAndRemove(req.params.id);
		res.redirect("/photos");
	} catch (err) {
		next(err);
	}
})



module.exports = router;
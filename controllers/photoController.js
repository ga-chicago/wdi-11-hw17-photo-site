const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');
const Users = require('../models/users');

// index route
router.get("/", async (req, res) => {
	try {
		const foundPhotos = await Photos.find();
		res.render('photos/index.ejs', {
			photos: foundPhotos
		});		
	} catch (err) {
		res.send(err);
	}
})

// new route
router.get("/new", (req, res) => {
	res.render('photos/new.ejs')
})

router.post("/", async (req, res) => {
	try {
		const createdPhoto = await Photos.create(req.body);
		res.redirect("/photos");
	} catch (err) {
		res.send(err);
	}
})

// show route
router.get("/:id", async (req, res) => {
	try {
		const foundPhoto = await Photos.findById(req.params.id);
		res.render('photos/show.ejs', {
			photo: foundPhoto
		})		
	} catch (err) {
		res.send(err);
	}
})

// edit route
router.get("/:id/edit", async (req, res) => {
	try {
		const foundPhoto = await Photos.findById(req.params.id);
		res.render("photos/edit.ejs", {
			photo: foundPhoto,
			index: foundPhoto.id
		});		
	} catch (err) {
		res.send(err);
	}
})

router.put("/:id", async (req, res) => {
	try {
		const updatedPhoto = Photos.findByIdAndUpdate(req.params.id, req.body);
		res.redirect("/photos");
	} catch (err) {
		res.send(err);
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const deletedPhoto = Photos.findByIdAndRemove(req.params.id);
		res.redirect("/photos");
	} catch (err) {
		res.send(err);
	}
})



module.exports = router;
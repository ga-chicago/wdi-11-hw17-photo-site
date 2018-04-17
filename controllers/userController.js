const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Photos = require('../models/photos');

// index route
router.get("/", async (req, res) => {
	try {
		const foundUsers = await Users.find();
		res.render('users/index.ejs', {
			users: foundUsers
		})
	} catch (err) {
		res.send(err);
	}
})

// new route
router.get("/new", (req, res) => {
	res.render('users/new.ejs')
})

router.post("/", async (req, res) => {
	try {
		const createdUser = await Users.create(req.body);
		res.redirect("/users");
	} catch (err) {
		res.send(err);
	}
})

// show route
router.get("/:id", async (req, res) => {
	try {
		const foundUser = await Users.findById(req.params.id);
		res.render('users/show.ejs', {
			user: foundUser
		})		
	} catch (err) {
		res.send(err);
	}
})

// edit route
router.get("/:id/edit", async (req, res) => {
	try {
		const foundUser = await Users.findById(req.params.id);
		res.render("users/edit.ejs", {
			user: foundUser,
			index: foundUser.id
		});
	} catch (err) {
		res.send(err);
	}
})

router.put("/:id", async (req, res) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body);
		res.redirect("/users");
	} catch (err) {
		res.send(err);
	}
})

router.delete("/:id", async (req, res) => {
	try {
		const deletedUser = await Users.findByIdAndRemove(req.params.id);
		res.redirect("/users");
	} catch (err) {
		res.send(err);
	}
})



module.exports = router;
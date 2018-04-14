const express = require('express');
const router = express.Router();
const Users = require('../models/users');

// index route
router.get("/", (req, res) => {
	Users.find((err, foundUsers) => {
		if (err) console.log(err);
		console.log(foundUsers);
		res.render('users/index.ejs', {
			users: foundUsers
		});
	})
})

// new route
router.get("/new", (req, res) => {
	res.render('users/new.ejs')
})

router.post("/", (req, res) => {
	Users.create(req.body, (err, createdUser) => {
		if (err) console.log(err);
		console.log(createdUser);
		res.redirect("/users");
	})
})

// show route
router.get("/:id", (req, res) => {
	Users.findById(req.params.id, (err, foundUser) => {
		if (err) console.log(err);
		res.render('users/show.ejs', {
			user: foundUser
		})
	})
})

// edit route
router.get("/:index/edit", (req, res) => {
	Users.findById(req.params.index, (err, user) => {
			if (err) console.log(err);
			console.log(user);
			res.render("users/edit.ejs", {
				user: user,
				index: user.id
			});
		})
})

router.put("/:id", (req, res) => {
	Users.findByIdAndUpdate(
		req.params.id,
		{
			username: req.body.username,
			password: req.body.password
		},
		(err, Users) => {
			if (err) console.log(err);
			res.redirect("/users");
		})
})

router.delete("/:id", (req, res) => {
	Users.findByIdAndRemove(req.params.id, (err, deletedUser) => {
		if (err) console.log(err);
		res.redirect("/users");
	})
})



module.exports = router;
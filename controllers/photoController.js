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
router.get("/new", async (req, res, next) => {
	try {
		const allUsers = await Users.find(); 
		res.render('photos/new.ejs', {
			users: allUsers
		})
	} catch (err) {
		next(err);
}})
// router.post('/', async (req, res, next) => {
// 	try {
// 		const foundAuthor = await Author.findById(req.body.authorId);
// 		const createdArticle = await Articles.create(req.body);
// 		foundAuthor.articles.push(createdArticle);
// 		const savedAuthor = await foundAuthor.save();
// 		res.redirect("/articles");
// 	} catch (err) {
// 		next(err);
// 	}
// });
router.post("/", async (req, res, next) => {
	try {
		// make it so photos get added to users photos on their page
		const foundUser = await Users.findById(req.body.userId);
		const createdPhoto = await Photos.create(req.body);
		foundUser.photos.push(createdPhoto);
		const savedUser = await foundUser.save();
		res.redirect("/photos");
	} catch (err) {
		next(err);
	}
})

// show route
router.get("/:id", async (req, res, next) => {
	try {
		const foundPhoto = await Photos.findById(req.params.id);
		const foundUser = await Users.findOne({'photos._id': req.params.id});
		res.render('photos/show.ejs', {
			photo: foundPhoto,
			user: foundUser,
			userId: req.body.userId
		})		
	} catch (err) {
		next(err);
	}
})

// edit route
router.get("/:id/edit", async (req, res, next) => {
	try {
		const foundPhoto = await Photos.findById(req.params.id);
		const allUsers = await Users.find({});
		const foundUserPhoto = await Users.findOne({'photos._id': req.params.id});
		res.render("photos/edit.ejs", {
			photo: foundPhoto,
			users: allUsers,
			userPhoto: foundUserPhoto,
			index: foundPhoto.id
		});		
	} catch (err) {
		next(err);
	}
})

router.put("/:id", async (req, res, next) => {
	try {
		const updatedPhoto = await Photos.findByIdAndUpdate(req.params.id, req.body);
		const foundUser = await User.findOne({'photos._id': req.params.id});

		if (foundUser._id.toString() != req.body.userId){
			foundUser.photos.id(req.params.id).remove();
			const newUser = await User.findById(req.body.userId);
			newUser.photos.push(updatedPhoto);
			const savedNewUser = await newUser.save();
			res.redirect('/photos/' + req.params.id);
		} else {
			foundUser.photos.id(req.params.id).remove();
			foundUser.photos.push(updatedPhoto);
			const savedFoundUser = await foundUser.save();
			res.redirect("/photos/" + req.params.id);
		}
	} catch (err) {
		next(err);
	}
})

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
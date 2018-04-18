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
// router.get('/:id/edit', (req, res, next) => {
// 	try {
// 		const foundPhoto = await Photos.findById(req.params.id);

// 		const allUsers = await Users.find();

// 		const foundPhotoUser = await User.findOne({})


// 	} catch (err) {
// 		next(err);
// 	}
// })




// ** delete ** route
// router.delete('/:id', async (req, res, next) => {
// 	try {
// 		// find the username on the photo
// 		const foundPhoto = await Photos.findById(req.params.id)
// 		res.send(foundPhoto.username, "<-- foundPhoto.username")

// 		// get the user who's username matches
// 		// find their array - loop? 
// 		// const foundUser = await Users.find({username: foundPhoto.username})

// 	} catch(err) {
// 		next(err);
// 	}
// })


// router.delete('/:id', async (req, res, next) => {
// //MAKE SURE TO WORK ON THIS ON THE PROMISE BRANCH
// 	try {
// 		const foundPhoto = await Photos.findById(req.params.id);
// 		console.log("------------------------------");
// 		console.log("------------------------------");
// 		// console.log(foundPhoto);
		
// 		// I want to get the user that has this photo in their photos array. 
// 		const foundUser = await Users.find({username: foundPhoto.username})
// 		console.log(foundUser + "<-- found user");
// 		console.log(foundUser.photos + "<-- found user's photos")
// 		console.log("------------------------------");
// 		console.log("------------------------------");
// 		const userPhotoArray = foundUser.photos
// 		console.log(userPhotoArray);
// 	} catch(err) {
// 		next(err)
// 	}

//TYLER CODE
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


// MARIE CODE 
// router.delete('/:id', async (req, res, next) => {
//     try {
//         const deletedUser = await Users.findByIdAndRemove(req.params.id);
//         const photoIds = [];
//         console.log(deletedUser)
//         for (let i = 0; i < deletedUser.photos.length; i++){
//             photoIds.push(deletedUser.photos[i].id);
//         }
//         const deletedPhotos = await Photos.remove({
//             _id: {
//                 $in: photoIds
//             }
//         })
//         res.redirect('/users');
//     } catch (err) {
//     	next(err)
//     }
// });


	// const photo = Photos.findById(req.params.id);
	
	// console.log("------------------------------");
	// console.log("------------------------------");
	// console.log(photo + "<--- photo");
	// console.log(photo.username + "<--- photo.username");
	// console.log("------------------------------");
	// console.log("------------------------------");
	// console.log("------------------------------");

	// const foundUser = Users.findOne({username: photo.username})
	// console.log("------------------------------");
	// console.log("------------------------------");
	// console.log("------------------------------");
	// console.log(foundUser + "<--- foundUser");
	// console.log("------------------------------");
	// console.log("------------------------------");
	// console.log("------------------------------");
	// console.log(foundUser.photos);
	// console.log("------------------------------");
	// console.log("------------------------------");
	// console.log("------------------------------");





	// Photos.findById(req.params.id, (err, photo) => {
	// 	Users.findOne({username: photo.username}, (err, foundUser) => {
	// // 		for (let i = 0; i < foundUser.photos.length; i++) {
	// // 			// console.log(foundUser.photos[i])
	// // 			// console.log(req.params.id);
	// // 			// console.log(foundUser.photos[i]._id + "<-- id for each photo");
	// // 			if (foundUser.photos[i]._id.toString() === req.params.id.toString()) {
	// // 				// res.send(foundUser.photos[i]);
	// // 				foundUser.photos[i].splice(i, 1)
	// // 				// foundUser.photos[i].remove();
	// // 				foundUser.save((err, data) => {
	// // 					if(err) console.log(err);
	// // 					res.redirect('/photos')
	// // 				})
	// // 			}
	// // 		}
	// // 		// foundUser.photos.id(req.params.id).remove();
	// // 		// foundUser.save((err, data) => {
	// // 		// 	if(err) console.log(err);
	// // 		// 	res.redirect('/photos')
	// // 		// })
	// 	})	
	// })


	// Photos.findByIdAndRemove(req.params.id, () => {
	// 	console.log({'photos._id': req.params.id})
	// 	Users.findOne({'photos._id': req.params.id}, (err, foundUser) => {
	// 		res.send(foundUser + " foundUser");
	// 		foundUser.photos.id(req.params.id).remove();
	// 		foundUser.save(() => {
	// 			res.redirect('/photos')
	// 		})
	// 	})
	// })		
// })


module.exports = router;
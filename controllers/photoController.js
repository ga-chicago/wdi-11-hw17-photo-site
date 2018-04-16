const express = require('express');
const router = express.Router();
const Photos = require('../models/photos');

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

module.exports = router;
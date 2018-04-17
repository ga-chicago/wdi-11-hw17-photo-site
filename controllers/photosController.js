const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Photos = require('../models/photos')


router.get('/', (req, res) => {
  Photos.find((err, foundPhotos) => {
    if(err) console.log(err);
    console.log(foundPhotos);
    res.render('photos/index.ejs', {photos : foundPhotos});
  });
});










module.exports = router;

const mongoose = require('mongoose');
const Photos = require('./photos.js')

//how all of the objects in the collection will look
const userSchema = new mongoose.Schema({
	userName: String,
	photos: [Photos.schema]
});

//Creating the collection --> author will be the name of the collection
module.exports = mongoose.model('Users', userSchema);
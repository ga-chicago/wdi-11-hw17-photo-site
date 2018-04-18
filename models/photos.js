const mongoose = require('mongoose');

//how all of the objects in the collection will look
const photoSchema = new mongoose.Schema({
	title: String,
	webLink: String
});

//Creating the collection --> author will be the name of the collection
module.exports = mongoose.model('Photos', photoSchema);
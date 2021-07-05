const mongoose = require('mongoose');
const Photo = require('./photos')


const userSchema = new mongoose.Schema({
	username: {
		type: String

	},
	password: {
		type: String
	
	}, 
	photos: [Photo.schema]
})

module.exports = mongoose.model('Users', userSchema)
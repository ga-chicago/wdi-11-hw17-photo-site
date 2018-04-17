const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String

	},
	password: {
		type: String
	
	}, 
	photos: Array
})

module.exports = mongoose.model('Users', userSchema)
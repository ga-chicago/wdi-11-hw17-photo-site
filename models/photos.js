const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	url: {
		type: String
	},
	about: {
		type: String
	}
})

module.exports = mongoose.model('Photos', photoSchema)
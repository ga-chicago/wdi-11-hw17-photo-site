const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	url: {
		type: String,
		required: true,
		unique: true
	},
	caption: String
});

module.exports = mongoose.model("Photo", photoSchema);
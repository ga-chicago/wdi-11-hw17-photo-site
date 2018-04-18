const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	username: {
		type: String,
		// required: true	
	},
	url: {
		type: String,
		required: true,
		unique: true
	},
	caption: String,
	dateAdded: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("Photo", photoSchema);
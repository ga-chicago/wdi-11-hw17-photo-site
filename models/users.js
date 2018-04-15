const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
});

//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('Users', userSchema);

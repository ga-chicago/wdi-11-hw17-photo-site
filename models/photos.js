const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	img: {
		type: String,
	},
	description: {
		type: String,
	},
  date: {
       type: Date,
       default: Date.now
     }
});

//creating collection, putting collection into database
//and setting schema onto information
module.exports = mongoose.model('Photos', photoSchema);

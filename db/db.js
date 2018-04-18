//need mongoose
const mongoose = require('mongoose');
//dont forget to npm install mongoose!

const connectionString = 'mongodb://localhost/photosite';
//                                           ^^^^^this names the database!!

mongoose.connect(connectionString);

mongoose.connection.on('connected', () => {
  console.log("mongoose connected to db");
});

mongoose.connection.on('error', (err) => {
  console.log("mongoose error: ", err);
});

mongoose.connection.on('disconnected', () => {
  console.log("mongoose disconnected");
});


//don't export bc we don't need access to these variables

const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
// const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");

//run DB file before routes --> you want your database up and running WHILE those routes are run
require('./db/db');

//must be before controllers
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
// // app.set('view engine', 'ejs');
// // app.use(expressLayouts);


//CONTROLLERS
//require our controllers
const userController = require('./controllers/userController');
//map every route starting with a / to be /authors
app.use('/users', userController);

app.listen(3000, () => {
	console.log("Server is listening on Port: " + PORT)
});
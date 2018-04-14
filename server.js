const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');

// call the database
require('./db/db');

// enable css files
app.use(express.static('public'))

// controllers
const usersController = require('./controllers/userController');
// const photosController = require('./controllers/photoController');

// middle ware
app.use(methodOverride("_method"));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', usersController);
// app.use('/photos', photosController);

// seeding data -- adding some data when you start development
app.get('/seed', (req, res) => {
			// Article.create();
			// Author.create();



	res.send('I just added some data for you');
	
})


app.listen(PORT, () => {
	console.log("server is running on PORT " + PORT);
})
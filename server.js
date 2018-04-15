const express = require('express');
const app     = express();
const PORT = 3000;
const router = express.Router();
const bodyParser = require('body-parser');
const methodOverride = require ('method-override');
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');

//connect to database
require('./db/db');

//use CSS files
// app.use(express.static('public'))

//middleware
//remember to put method override before using Controller!!!!!
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}))
// app.use(expressLayouts);
// app.use(express.static('public'))


//CONTROLLERS
const usersController = require('./controllers/usersController')
app.use('/users', usersController);

const photosController = require('./controllers/photosController')
app.use('/photos', photosController);













app.listen(PORT, function (){
  console.log("sever is listening on port: " + PORT);
});

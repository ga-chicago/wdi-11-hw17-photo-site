const express = require('express');
const app     = express();
const PORT = 3000;
const router = express.Router();
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require ('method-override');
const expressLayouts = require('express-ejs-layouts');

app.set('view engine', 'ejs');

//connect to database
require('./db/db');

//use CSS files
app.use(express.static('public'))

//middleware
//remember to put method override before using Controller!!!!!
app.use(session({
    secret: 'that gum you like is coming back in style', //used to encrypt cookie
    resave: false, //do not update unless the session object is changed
    saveUninitialized: false //it is illegal to store cookies in a users browser until they log in
}));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}))
// app.use(expressLayouts);
// app.use(express.static('public'))


//CONTROLLERS
const usersController = require('./controllers/usersController')
app.use('/users', usersController);

const homeController = require('./controllers/homeController')
app.use('/home', homeController);

const photosController = require('./controllers/photosController')
app.use('/photos', photosController);

app.get('*', (req, res) => {
  res.status(404).send("404! This isn't a page!")
})



app.listen(PORT, function (){
  console.log("sever is listening on port: " + PORT);
});

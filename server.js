const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');

const userController = require('./controllers/UserController');
const photoController = require('./controllers/photoController');
const authController = require('./controllers/auth')

require('./db/db'); // run our db file 
// app.set('view engine', 'ejs');
// app.use(expressLayouts);

// set up session

app.use(session ({
	secret: "this is my secret key",
	resave: false,
	saveUninitialized: false,
	cookie: {secure: false}
}));

//middleware

app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
	const url = req.path;
	 if(url.includes('photos') || url.includes('users')) {
	 	if(req.session.logged === true) {
	 		next();
	 	} else {
	 		// console.log('problem with server.js middleware')
	 		// req.session.message = "You must be logged in to access this page."
	 		// res.redirect("/")
	 	}
	 } else {
	 	next();
	 }
})

// CONTROLLERS 
app.use('/users', userController)
app.use('/photos', photoController)
app.use('/', authController)






app.use(express.static('public'))

// seeding a database is adding some data to the database so there is something to work with when you start developmen
app.get('/seed', (req, res) => {
	//Articles.create
	//Articles.create
	//Articles.create
	//Articles.create
	//Articles.create

	//Authors.create
	//Authors.create
	//Authors.create
	//Authors.create
	//Authors.create
	//Authors.create

	res.send('I just added some data for you')
})

app.get('/', (req, res) => {
	res.render('users/new.ejs')		
})

app.listen(3000, () => {
	console.log('server is listening on port 3000');
})
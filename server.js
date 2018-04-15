const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')

const userController = require('./controllers/UserController');

require('./db/db') // run our db file 
// app.set('view engine', 'ejs');
// app.use(expressLayouts);

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'))

app.use('/users', userController)





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

app.listen(3000, () => {
	console.log('server is listening on port 3000');
})
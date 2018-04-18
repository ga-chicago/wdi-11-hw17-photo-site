const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const Photos = require('../models/photos');
const bcrypt = require('bcrypt')


//INDEX route
router.get('/', async (req, res) => {
  try {
    const foundUser = await Users.find();
    res.render('users/index.ejs', {
      users : foundUser
    });
  } catch(err) {
    res.send(err)
  }
});


//LOGIN GET route
router.get('/login', (req, res) => {
      const message = req.session.message;
      req.session.message = null;
    res.render('login.ejs', {
          message: message
    })

})


//LOGOUT GET route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
          if(err) {
            console.log("uh oh", err);
          } else {
                  res.redirect('/users/register')
          }
    })
})


//REGISTER GET route
router.get('/register', (req, res) => {
      res.render('register.ejs');
})

//LOGIN POST route
router.post('/login', (req, res) => {
    Users.findOne( {username: req.body.username}, (err, userFound) => {
        if(userFound) {
            if(bcrypt.compareSync(req.body.password, userFound.password)) {
                  req.session.username = req.body.username;
                  req.sesssion.loggedIn = true;
                  req.session.message = `Hello, ${req.body.username}, hope you're having a nice day!`;

                  res.redirect('/home')
            } else {
                  req.session.message = "Incorrect username or password."

                  res.redirect('/users/login')
            }
        } else {
              req.session.message = "Incorrect username or password."
              res.redirect('/users/login')
        }
    })
})


//REGISTER POST route
router.post('/register', (req, res) => {
      const password = req.body.password;
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const userDbEntry = {
            username: req.body.username,
            password: passwordHash
      }

      Users.create(userDbEntry, (err, createdUser) => {
          console.log(createdUser, "^^^this is the user that got created -------------");

          req.session.username = createdUser.username
          req.session.loggedIn = true;
          req.session.message = "Thanks for signing up, " + req.body.username;

          res.redirect('/home')
      })

})

//NEW user route
router.get('/new', (req, res) => {
  res.render('users/new.ejs')
});

router.post('/', async (req, res) => {
//need to use body-parser
//also, properties in schema and input form MUST MATCH

  try {
    const createdUser = await Users.create(req.body);
    res.redirect('/users');
  } catch(err) {
    res.send(err)
  }
});


//SHOW user route
router.get('/:id', async (req, res) => {
  try {
      const foundUser = await Users.findById(req.params.id);
      res.render('Users/show.ejs', {
        users: foundUser
      });
    } catch(err) {
      res.send(err)
    }
});



//UPDATE user route
//GET route// to 'get' edit page up
router.get('/:id/edit', async (req, res) => {
  try {
      const foundUser = await Users.findById(req.params.id);
      res.render('users/edit.ejs', {
        users: foundUser,
      });
    } catch(err) {
      res.send(err)
    }
});



//DELETE user route
//delete using the index of data in model
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndRemove(req.params.id,)
    res.redirect('/users')
  } catch(err) {
    res.send(err)
  }
});


//EDIT user route
//PUT route/ to 'put' update on index page
router.put('/:id', async (req, res) => {
  try {
    const userEdit = {};
    userEdit.username = req.body.username;
    userEdit.password = req.body.password;
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, userEdit, {new : true});
    res.redirect('/users');
  } catch(err) {
      res.send(err)
  }
});


module.exports = router;

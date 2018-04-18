const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session)
    const d = new Date(Date.now());

    const message = req.session.message;

    req.session.message = null;

    if(req.session.loggedIn) {
          res.render('home.ejs', {
                username: req.session.username,
                loginDate: d.toLocaleTimeString('en-us'),
                message: message
          })
    } else {
          req.session.message = "You must be logged in to do this"
          res.redirect('/users/login')
    }

})

module.exports = router;

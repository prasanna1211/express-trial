var express = require('express');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/', function(err, res) {
  res.json({
    message: 'Default Route'
  });
});

// Sets up a dummy user
router.post('/register', function(req, res) {
  var prasanna = new User({
    name: req.body.name,
    password: req.body.password,
  });

  prasanna.save(function(err, success) {
    if(err) throw err;
    console.log(' User saved successfully ', success);
    res.json({ success: true });
  });
});

// Displays all users
router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  })
});

// Adds a users
router.post('/login', function(req, res) {
  console.log('user', req.body);
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if(err) throw err;
    if(!user) {
      res.json({
        success: false,
        message: 'User Not Found'
      });
    } else if(user) {
      console.log(' password ', user, req.body.password);
      if(user.password !== req.body.password) {
        res.json({
          success: false,
          message: 'Wrong Password',
        })
      } else {
        var token = jwt.sign(user, 'secret', {
          expiresIn: 1440*60
        });
        res.json({
          success: true,
          token: token,
        });
      }
    }
  })
});

module.exports = router;

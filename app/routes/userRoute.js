var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.get('/', function(err, res) {
  res.json({
    message: 'Default Route'
  });
});

// Sets up a dummy user
router.get('/setup', function(req, res) {
  var prasanna = new User({
    name: 'Prasanna',
    passowrd: 'password',
    admin: true
  });

  prasanna.save(function(err) {
    if(err) throw err;
    console.log(' User saved successfully ');
    res.json({ success: true });
  })
});

// Displays all users
router.get('/users', function(req, res) {
  debugger;
  User.find({}, function(err, users) {
    res.json(users);
  })
});

module.exports = router;

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var routes = require('./routes');

var url = require('../config.js').database;

var app = express();
// Body parser for post
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(morgan('dev'));

var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/login');

app.use('/api', routes);

app.listen(port, function(err, succ) {
  console.log(' started listening at port ');
});

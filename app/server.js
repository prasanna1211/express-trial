var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose')

const app = express();
// Body parser for post
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(morgan('dev'));

var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.send('API endpoint is http://localhost' + port + '/api');
});

app.listen(port, function(err, succ) {
  console.log(' started listening at port ');
});

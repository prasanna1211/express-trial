var express = require('express');
var Router = express.Router();

var userRoutes = require('./userRoute');

Router.use('/account', userRoutes);

module.exports = Router;

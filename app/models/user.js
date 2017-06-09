var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  password: String,
  admin: Boolean,
});

module.exports = mongoose.Model('User', UserSchema);

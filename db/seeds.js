var mongoose = require('mongoose');
var User = require('../models/user');

var databaseUri = require('../config/db')('development');
mongoose.connect(databaseUri);

User.collection.drop();

var user = User.create({
  email: "jase_lai@hotmail.com",
  firstName: "Jason",
  lastName: "Lai",
  password: "password",
  passwordConfirmation: "password"
}, function(err, user) {
  if(err) return console.log(err);
  console.log(user);

  mongoose.connection.close();
});


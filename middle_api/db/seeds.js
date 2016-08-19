var mongoose = require('mongoose');
var User = require('../models/user');

var databaseUri = require('../config/db')('development');
mongoose.connect(databaseUri);





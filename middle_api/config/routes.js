var router = require('express').Router();

var usersController = require('../controllers/users');
var authController = require("../controllers/authentications");

//require json web token stuff
var secret = require("../config/tokens").secret;
var jwt = require("jsonwebtoken");

//middleware to check for token 
function secureRoute(req, res, next){
  if(!req.headers.authorization) return res.status(401).json({ message: "Unauthorized!" });
  var token = req.headers.authorization.replace("Bearer ", "");

  jwt.verify(token, secret, function(err, payload){
    if(err || !payload) return res.status(401).json({ message: "Unauthorized!" });
    
    req.user = payload;
    next(); 
  });
}

router.route('/users')
  .get(usersController.index)


module.exports = router;

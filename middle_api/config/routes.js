var router = require('express').Router();

var usersController = require('../controllers/users');
var authController = require("../controllers/authentications");
var friendsController = require('../controllers/friends');
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
var uuid = require('uuid');

var s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: 'eu-west-1'
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    dirname: 'uploads',
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: function(req, file, next) {
      next(null, file.mimetype);
    },
    key: function(req, file, next) {
      var ext = '.' + file.originalname.split('.').splice(-1)[0];
      var filename = uuid.v1() + ext;
      next(null, filename);
    }
  })
});

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
  .get(usersController.index);

router.route("/users/:id")
  .get(usersController.show)
  .post(usersController.update)
  .patch(usersController.update)
  .delete(usersController.delete);

router.post("/register", upload.single('profile_pic'),authController.register);
router.post("/login", authController.login);

module.exports = router;

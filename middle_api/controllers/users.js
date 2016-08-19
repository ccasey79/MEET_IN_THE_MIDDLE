var User = require('../models/user');

function usersIndex(req, res) {
  User.find(function(err, shoes) {
    if(err) return res.status(500).json(err);
    return res.status(200).json(shoes);
  });
}

module.exports = {
  index: usersIndex,
}
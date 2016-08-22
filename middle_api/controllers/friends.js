var User = require("../models/user");

function addFriend(req, res) {

  req.user = currentUser

  User.findById(req.params.id, function(err, friend, currentUser){
    if(err) return res.status(500).json(err);
    currentUser.friends.push(friend._id);
    friend.friends.push(currentUser._id);
  });

}

module.exports = {
friend: addFriend
};
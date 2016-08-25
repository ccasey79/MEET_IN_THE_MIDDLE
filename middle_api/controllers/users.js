var User = require('../models/user');

function usersIndex(req, res) {
  User.find(function(err, shoes) {
    if(err) return res.status(500).json(err);
    return res.status(200).json(shoes);
  });
}

function usersShow(req, res) {
  User.findById(req.user._id, function(err, user){
    if(err) return res.status(500).json(err);
    return res.status(201).json(user);
  });
}

function usersUpdate(req, res) {

  if(req.file) {
    req.body.profile_pic = req.file.key;
  }

  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true }, function(err,user){
    if(err) return res.status(400).json(err);
    return res.status(200).json(user);
  });
}

function usersDelete(req, res) {
  User.findByIdAndRemove(req.user._id,function(err){
    if(err) return res.status(500).json(err);
    return res.status(204).send();
  });
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
}
var mongoose = require('mongoose');
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
});

userSchema.set('toJSON', {
  transform: function(doc, json){
    delete json.passwordHash;
    return json;
  }
});

userSchema.virtual("password").set(function(password) {
  //save on the object in case we need it later.
  this._password = password;

  //has the password and save on the passwordHash property.
  this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));

});

userSchema.virtual("passwordConfirmation").get(function() {
  return this._passwordConfirmation;
})
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.path("passwordHash").validate(function(passwordHash){
  if(this.isNew) {
    if(!this._password){
      //if no password sent from client
      return this.invalidate("password", "A password is required");
    }
    if(this._password != this._passwordConfirmation) {
      //if the password and password confirmation don't match
      return this.invalidate("passwordConfirmation", "Passwords do not match");
    }
  }
});

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model("User", userSchema);





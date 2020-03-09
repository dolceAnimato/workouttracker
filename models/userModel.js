const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  trail: {
    type: String,
    required: "Trail name is Required"
  },
  note: {
    type: String,
    required: "Route starting location is required."
  },
  userCreated: {
    type: Date,
    default: Date.now
  },

  lastUpdated: {
    type: Date,
    default: Date.now
  }
});


UserSchema.methods.lastUpdatedDate = function () {
  this.lastUpdated = Date.now();

  return this.lastUpdated;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  address: String,
});

exports.module = mongoose.model("User", schema);

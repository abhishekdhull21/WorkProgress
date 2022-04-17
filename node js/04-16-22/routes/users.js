var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
// var User = require("../models/User");
/* GET users listing. */
const schema = mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  address: String,
});
const User = mongoose.model("User", schema);
// const User = mongoose.model("User", schema);
router.post("/", function (req, res, next) {
  console.log(req.body);
  const params = req.body;
  const user = new User({
    name: params.name,
    mobile: params.mobile,
    email: params.email,
    address: params.address,
  });
  user.save();
  res.send(user);
});
router.get("/", function (req, res, next) {
  User.find({}).then(function (user) {
    res.send(user);
  });
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    // console.log(user);
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User not exists" });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);
    const user = await User.findOne({ _id: req.params.id });
    if (body.name) {
      user.name = body.name;
    }
    if (body.email) {
      user.email = body.email;
    }
    if (body.mobile) {
      user.mobile = body.mobile;
    }
    if (body.address) {
      user.address = body.address;
    }
    await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User not exists" });
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    res.status(204).send(user);
  } catch {
    res.status(404).send({ error: "User not exists" });
  }
});
module.exports = router;

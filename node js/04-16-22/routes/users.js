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
  // console.log(req);
  const params = req.query;
  const user = new User({
    name: params.name,
    mobile: params.mobile,
    email: params.email,
    address: params.address,
  });
  user.save();
  res.send(user);
});
router.get("/", async function (req, res, next) {
  const user = await User.find({});
  // console.log(user);
  // user.save();
  res.send(user);
});
router.get("/:id", async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  console.log(user);
  res.send(user);
});

router.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.findOne({ _id: req.params.id });
    if (body.name) {
      user.name = body.name;
    }
    if (body.email) {
      user.name = body.email;
    }
    if (body.number) {
      user.name = body.number;
    }
    if (body.address) {
      user.name = body.address;
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

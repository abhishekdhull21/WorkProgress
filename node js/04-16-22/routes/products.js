var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/products", function (req, res, next) {});
router.get("/product{id}", function (req, res, next) {});
// router.post();

module.exports = router;

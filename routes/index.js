const express = require("express");
const router = express.Router();

const { homePage, loginPage } = require("../controllers/auth");

router.route("/").get(homePage);
router.route("/login").get(loginPage);

module.exports = router;

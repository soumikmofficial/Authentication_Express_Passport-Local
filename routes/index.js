const express = require("express");
const router = express.Router();

const { homePage, dashboard } = require("../controllers/auth");
const ensureAuth = require("../config/auth");

router.route("/").get(homePage);
router.route("/dashboard").get(ensureAuth, dashboard);

module.exports = router;

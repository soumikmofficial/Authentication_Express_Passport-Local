const express = require("express");
const router = express.Router();

const {
  registerPage,
  loginPage,
  register,
  login,
} = require("../controllers/auth");

router.route("/login").get(loginPage).post(login);
router.route("/register").get(registerPage).post(register);

module.exports = router;

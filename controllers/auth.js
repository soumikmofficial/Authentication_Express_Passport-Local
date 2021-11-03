const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// **the pages***

const homePage = (req, res) => {
  res.render("home", { title: "Home" });
};

const loginPage = (req, res) => {
  res.render("login", { title: "Login" });
};
const registerPage = (req, res) => {
  res.render("register", { title: "Register" });
};
const dashboard = (req, res) => {
  res.render("dashboard", { title: "Dashboard", email: req.user.email });
};

// **the auth functons**

const register = async (req, res) => {
  const { email, password1, password2 } = req.body;
  let errors = [];

  if (!email || !password1 || !password2) {
    errors.push({ msg: "All the fields are required" });
  }

  if (password1 !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password1.length < 6 || password2.length < 6) {
    errors.push({ msg: "Password must be 6 characters or longer" });
  }

  if (errors.length > 1) {
    return res.render("register", {
      errors,
      email,
      password1,
      password2,
      title: "register",
    });
  } else {
    try {
      let newUser = await User.findOne({ email });
      if (newUser) {
        errors.push({ msg: "Email already registered" });
        return res.render("register", {
          errors,
          email,
          password1,
          password2,
          title: "register",
        });
      } else {
        newUser = await new User({
          email,
          password: await bcrypt.hash(password1, 12),
        });
        await newUser.save();
        req.flash("success_msg", "You have registered successfully");
        res.redirect("/user/login");
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You have logged out successfully");
  res.redirect("/user/login");
};

module.exports = {
  homePage,
  loginPage,
  registerPage,
  register,
  login,
  dashboard,
  logout,
};

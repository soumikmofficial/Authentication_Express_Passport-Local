const express = require("express");
const connectDB = require("./config/connect");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const app = express();

require("dotenv").config();
require("./config/passport")(passport);

// static files like css
app.use(express.static("./public"));

// ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//session
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

// global
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//routes
app.use("/", indexRouter);
app.use("/user/", authRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();

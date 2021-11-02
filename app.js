const express = require("express");
const connectDB = require("./config/connect");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const app = express();

require("dotenv").config();

app.use(express.static("./public"));

// ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

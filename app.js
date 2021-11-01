const express = require("express");
const connectDB = require("./config/connect");
const expressLayouts = require("express-ejs-layouts");
const pageRouter = require("./routes/index");
const app = express();

require("dotenv").config();

// ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use("/", pageRouter);

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

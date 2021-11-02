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

// **the auth functons**

const register = async (req, res) => {
  console.log(req.body);
  res.send("working");
};
const login = async (req, res) => {
  console.log(req.body);
  res.send("login");
};

module.exports = { homePage, loginPage, registerPage, register, login };

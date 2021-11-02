const homePage = (req, res) => {
  res.render("home", { title: "Home" });
};

const loginPage = (req, res) => {
  res.render("login", { title: "Login" });
};

module.exports = { homePage, loginPage };

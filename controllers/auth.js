const homePage = (req, res) => {
  res.render("home", { title: "Home" });
};

module.exports = { homePage };

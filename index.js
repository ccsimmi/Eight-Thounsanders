require("dotenv").config();
const express = require("express");
const layouts = require("express-ejs-layouts");
const path = require("path");
const { mountains } = require("./constants/const");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(layouts);
app.set("layout", "layouts/base")

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { title: "Mountains", mountains });
})

app.get("/:mountain", (req, res, next) => {
  const name = req.params.mountain;
  const mountain = mountains.find(m => m.slug.toLowerCase() === name.toLowerCase());

  if (!mountain) {
    return next()
  }

  res.render("mountain", { title: mountain.name, mountain})
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Page Not Found "});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
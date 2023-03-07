const express = require("express");
const path = require("path");

const authRoutes = require("./routes/auth.router");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Working, Bitch</h1>");
});

app.listen(3000, () => console.log(`listening at http://localhost:3000`));

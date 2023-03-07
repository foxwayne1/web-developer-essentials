const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Working, Bitch");
});

app.listen(3001, () => console.log(`listening at http://localhost:3001`));
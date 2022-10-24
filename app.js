const express = require("express");
const app = express();
const { connectDB } = require("./src/config/db.config");

connectDB();
require('dotenv').config()


const PORT = process.env.PORT || 3000;

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./src/routes/user.routes"));

app.listen(PORT, function () {
  console.log(`Runing on port ${PORT}`);
});

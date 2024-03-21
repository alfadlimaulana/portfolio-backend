const express = require("express");
const methodOverride = require("method-override");
const cors = require('cors')
const path = require('path')
var cookieParser = require("cookie-parser");
require('dotenv').config()

const app = express();
const publicDirectoryPath = path.join(__dirname, 'public');

const projectRoutes = require("./src/routes/projectRoutes");
const userRoutes = require("./src/routes/userRoutes");

require("./src/utils/db.js");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use('/public', express.static(publicDirectoryPath))
app.use("/api/projects", projectRoutes);
app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});

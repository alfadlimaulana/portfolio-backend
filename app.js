const express = require("express");
const methodOverride = require("method-override");
const cors = require('cors')
var cookieParser = require("cookie-parser");
require('dotenv').config()

const app = express();
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");

require("./utils/db.js");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use("/api/projects", projectRoutes);
app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});

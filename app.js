const express = require("express");
const methodOverride = require("method-override");
var cookieParser = require("cookie-parser");

const app = express();
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const port = 3000;

require("./utils/db.js");

app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.use("/api/projects", projectRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

const jwt = require("jsonwebtoken");
const { getErrorMessage } = require("../utils/helper");
require('dotenv').config()

module.exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          status: "failed",
          errors: getErrorMessage(new Error(err)),
        });
      } else {
        console.log(decoded);
        next();
      }
    });
  } else {
    res.status(401).json({
      status: "failed",
      errors: getErrorMessage(new Error("Anda Belum Login")),
    });
  }
};

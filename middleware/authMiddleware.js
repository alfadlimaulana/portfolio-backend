const jwt = require("jsonwebtoken");
const { getErrorMessage } = require("../utils/helper");

module.exports.isLoggedIn = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "portfolio fadli", (err, decoded) => {
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

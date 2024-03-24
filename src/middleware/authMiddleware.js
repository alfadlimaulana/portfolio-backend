const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { getErrorMessage } = require("../utils/helper");
require('dotenv').config()

module.exports.isLoggedIn = async (req, res, next) => {
  const { authorization } = req.headers

  if(!authorization) {
    return res.status(401).json({error: "authorization token required"})
  }

  const token = authorization.split(' ')[1]

  try {
    const {_id} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = { _id }

    next();
  } catch (error) {
    res.status(401).json({
      status: "failed",
      errors: getErrorMessage(new Error("Request is not authorized")),
    });
  }
};

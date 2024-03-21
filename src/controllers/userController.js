const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const path = require('path')
const bcrypt = require("bcrypt");
const { getErrorMessage } = require("../utils/helper.js");

const maxAge = 1 * 24 * 60 * 60;
const createToken = (payload, secret, expires) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expires,
  });
  return token;
};

module.exports.register = async (req, res) => {
  try {
    const data = await User.create(req.body);
    const token = await createToken({ id: data._id }, process.env.ACCESS_TOKEN_SECRET, maxAge);
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000,
    });
    return res.status(201).json({
      status: "success",
      data: data,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      errors: getErrorMessage(error),
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const data = await User.findOne({ username: req.body.username });

    if (data) {
      const match = await bcrypt.compare(req.body.password, data.password);
      
      if (match) {
        const token = await createToken({ username: data.username }, process.env.ACCESS_TOKEN_SECRET, maxAge);

        res.cookie("jwt", token, {
          maxAge: maxAge * 1000,
        });

        return res.status(200).json({
          status: "success",
          data,
          token: token,
          message: "Login Success",
        });
      } else {
        throw Error("Password salah");
      }
    } else {
      throw Error("Username tidak ditemukan");
    }
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      errors: getErrorMessage(error),
    });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: -1,
  });

  res.status(200).json({
    status: "success",
    message: "Berhasil keluar",
  });
};

const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const path = require('path')
const bcrypt = require("bcrypt");
const { getErrorMessage } = require("../utils/helper.js");

const maxAge = 60 * 60 * 24 * 1;
const createToken = (payload, secret, expires) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expires,
  });
  return token;
};

module.exports.register = async (req, res) => {
  try {
    const data = await User.create(req.body);
    const token = await createToken({ _id: data._id }, process.env.ACCESS_TOKEN_SECRET, maxAge);
    
    return res.status(201).json({
      status: "success",
      data: {
        username: data.username,
        token
      },
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
        const token = await createToken({ _id: data._id }, process.env.ACCESS_TOKEN_SECRET, maxAge);

        return res.status(200).json({
          status: "success",
          data: {
            username: data.username,
            token,
          },
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
  res.status(200).json({
    status: "success",
    message: "Berhasil keluar",
  });
};

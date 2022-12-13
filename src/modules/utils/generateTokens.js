const jwt = require("jsonwebtoken");

const generateAccessToken = (userInfo) => {
  return jwt.sign({ userInfo }, process.env.SECRET, { expiresIn: "30m" });
};

const generateRefreshToken = (userInfo) => {
  return jwt.sign({ userInfo }, process.env.SECRET, { expiresIn: "15d" });
};

module.exports = { generateAccessToken, generateRefreshToken };

const jwt = require("jsonwebtoken");

const generateAccessToken = (userInfo) => {
  return jwt.sign({ userInfo }, process.env.SECRET, { expiresIn: "2d" });
};

const generateRefreshToken = (userInfo) => {
  return jwt.sign({ userInfo }, process.env.SECRET, { expiresIn: "15d" });
};

const getUserAssets = (accessToken) => {
  console.log(accessToken)
  return jwt.decode(accessToken);
}

module.exports = { generateAccessToken, generateRefreshToken, getUserAssets };

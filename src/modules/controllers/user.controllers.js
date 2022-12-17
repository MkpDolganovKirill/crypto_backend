const bcrypt = require("bcrypt");
const { models } = require("../../../db/models");
const dotenv = require("dotenv");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
dotenv.config();

module.exports.createNewUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!(login && password)) {
      return res.status(422).send({ message: "Error! Params not found!" });
    }

    const isUserExist = await models.userModel.findOne({
      login,
    });

    if (isUserExist) {
      return res.status(422).send({ message: "User existing" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const accesstoken = generateAccessToken(login);
    const refreshtoken = generateRefreshToken(login);

    await models.userModel.create({
      login,
      password: hashedPassword,
    });

    return res.status(200).send({ accesstoken, refreshtoken, username: login });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Error!" });
  }
};

module.exports.authorizationUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!(login && password))
      return res.status(422).send({ message: "Error! Params not found!" });

    const isUserExist = await models.userModel.findOne({ login });
    if (!isUserExist) {
      return res.status(422).send({ message: "User not existing!" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (isPasswordValid) {
      const accesstoken = generateAccessToken(login);
      const refreshtoken = generateRefreshToken(login);
      return res
        .status(200)
        .send({ accesstoken, refreshtoken, username: isUserExist.login });
    }
    return res.status(422).send({ message: "Invalid username or password!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Error!" });
  }
};

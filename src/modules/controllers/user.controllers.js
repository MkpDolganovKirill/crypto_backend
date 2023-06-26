const bcrypt = require("bcrypt");
const { models } = require("../../../db/models");
const dotenv = require("dotenv");
const {
  generateAccessToken,
  generateRefreshToken, getUserAssets,
} = require("../utils/generateTokens");
const mongoose = require("mongoose");
dotenv.config();

module.exports.getAllFavorites = async (req, res) => {
  try {
    const { accesstoken } = req.headers;
    const { userInfo: login } = getUserAssets(accesstoken);

    const user = await models.userModel.findOne({ login: login }).populate('favoriteCrypto');
    return res.send({favorites: user.favoriteCrypto});

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Error!" });
  }
}

module.exports.addToFavorite = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(422).send({ message: "Unknown id!" });
    }

    const { accesstoken } = req.headers;
    console.log(req.headers);
    const { userInfo: login } = getUserAssets(accesstoken);
    console.log(login);

    const user = await models.userModel.findOne({ login: login });
    const updates = await models.userModel.updateOne(
      { login :login },
      { $addToSet: {favoriteCrypto: id} });
    return res.send(updates);

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Error!" });
  }
}

module.exports.removeFromFavorites = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(422).send({ message: "Unknown id!" });
    }

    const { accesstoken } = req.headers;
    console.log(req.headers);
    const { userInfo: login } = getUserAssets(accesstoken);
    console.log(login);

    const user = await models.userModel.findOne({ login: login });
    const updates = await models.userModel.updateOne(
      { login :login },
      { $pull: {favoriteCrypto: id} });
    return res.send(updates);

  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Error!" });
  }
}

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

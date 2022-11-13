const mongoose = require("mongoose");
const { userSchema } = require("./userModel");
const { cryptoSchema } = require("./cryptoModel");

module.exports.models = {
  userModel: mongoose.model('User', userSchema),
  cryptoModel: mongoose.model('Crypto', cryptoSchema),
}

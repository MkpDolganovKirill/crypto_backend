const mongoose = require("mongoose");
module.exports.userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.UUID,
    unique: true,
  },
  username: String,
  login: {
    type: String,
    unique: true,
  },
  password: String,
  favoriteCrypto: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Crypto',
  }
});

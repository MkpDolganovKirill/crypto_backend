const mongoose = require("mongoose");
module.exports.cryptoSchema = new mongoose.Schema({
  cap_id: {
    type: Number,
    unique: true,
  },
  name: String,
  symbol: String,
  slug: String,
  num_market_pairs: Number,
  date_added: Date,
  tags: [String],
  max_supply: Number,
  circulating_supply: Number,
  total_supply: Number,
  cmc_rank: Number,
  last_updated: Date,
  quote: {
    USD: {
      price: Number,
      volume_24h: Number,
      volume_change_24h: Number,
      percent_change_1h: Number,
      percent_change_24h: Number,
      percent_change_7d: Number,
      percent_change_30d: Number,
      percent_change_60d: Number,
      percent_change_90d: Number,
      market_cap: Number,
      market_cap_dominance: Number,
      fully_diluted_market_cap: Number,
      last_updated: Date,
    }
  }
}, { timestamps: true } );

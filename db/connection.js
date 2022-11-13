const { connect } = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

module.exports.dbConnect = async () => {
  await connect(
    `mongodb://${process.env.DB_CONNECTION_LINK}:${process.env.DB_CONNECTION_PORT}/${process.env.DATABASE}`
  );
}

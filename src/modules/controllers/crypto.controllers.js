const dotenv = require('dotenv');
const { models } = require("../../../db/models");
dotenv.config();

const getTopList = async (req, res) => {
  const { limit = 100 } = req.query;

  try {
    const info = await models.cryptoModel.find({}).limit(limit);

    return res.status(200).send(info);
  } catch (error) {
    console.error("Can't get info from DB");
  }

}

module.exports = {
  getTopList,
};

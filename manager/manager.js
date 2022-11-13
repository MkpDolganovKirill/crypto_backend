const axios = require("axios");
const { models } = require("../db/models");
const { dbConnect } = require("../db/connection");
const mongoose = require("mongoose");

const log = (message) => {
  const nowDate = new Date();
  console.log(
    `${nowDate.getDate()}/${nowDate.getMonth() + 1}/${nowDate.getFullYear()}`,
    `${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}:${nowDate.getMilliseconds()} |`,
    message
  )
};
const elog = (message) => {
  const nowDate = new Date();
  console.error(
    `${nowDate.getDate()}/${nowDate.getMonth() + 1}/${nowDate.getFullYear()}`,
    `${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}:${nowDate.getMilliseconds()} |`,
    message
  );
}

const connectAndCheckDB = async () => {
  try {
    await dbConnect();
    mongoose.connection.readyState
      ? log('Connection has been established successfully.')
      : elog('Connection failed');
  } catch (e) {
    elog(`Error with dbConnection: ${e}`);
  }
}

connectAndCheckDB().then(r => null);

const startTimer = () => {
  setTimeout(() => {
    saveCacheFromApi();
  },  60 * 60 * 1000);
}

const saveCacheFromApi = () => {
  axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
    headers: {
      'X-CMC_PRO_API_KEY': '30160fbe-0b66-40b1-89d6-c94b7d7d07f9'
    },
    params: {
      limit: 1000,
    }
  }).then(async (result) => {
    if (result?.data) {
      log("Data exist!");
    }

    const data = result.data.data;
    const preparedData = data.map(item => {
      return { cap_id: item.id, ...item };
    })

    await models.cryptoModel.deleteMany({});

    models.cryptoModel.insertMany(preparedData).then(res => {
      log('Crypto info was updated!');
      startTimer();
    }).catch(err => {
      elog(err);
      elog("Cant update crypto info");
      startTimer();
    });
  }).catch(error => {
    elog(error);
    startTimer();
  })
}

saveCacheFromApi();

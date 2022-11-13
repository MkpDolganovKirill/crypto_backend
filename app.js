const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const userRoutes = require("./src/modules/routes/user.routes");
const { dbConnect } = require("./db/connection");
const { registerModules } = require("./src/modules/routes");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

const connectAndCheckDB = async () => {
  try {
    await dbConnect();
    mongoose.connection.readyState
      ? console.log('Connection has been established successfully.')
      : console.error('Connection failed');
  } catch (e) {
    console.error(`Error with dbConnection: ${e}`);
  }
}

connectAndCheckDB().then(r => null);
registerModules(app);

app.listen(port, () => {
  console.log(`Crypto server app listening on port ${port}`);
});

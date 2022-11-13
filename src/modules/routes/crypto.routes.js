const express = require('express');
const router = express.Router();

const {
  getTopList,
} = require('../controllers/crypto.controllers');

router.get('/top', getTopList);

module.exports = router;

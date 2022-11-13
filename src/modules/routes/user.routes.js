const express = require('express');
const router = express.Router();

const {
  createNewUser,
  authorizationUser,
  deleteRefreshToken
} = require('../controllers/user.controllers');
const { authenticateToken } = require('../middleware/authenticateToken.middleware');

router.post('/createNewUser', createNewUser);
router.post('/authorizationUser', authorizationUser);
// router.post('/deleteRefreshToken', deleteRefreshToken);

module.exports = router;

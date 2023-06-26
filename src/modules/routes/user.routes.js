const express = require('express');
const router = express.Router();

const {
  createNewUser,
  authorizationUser,
  getAllFavorites,
  removeFromFavorites,
  deleteRefreshToken, addToFavorite
} = require('../controllers/user.controllers');
const { authenticateToken } = require('../middleware/authenticateToken.middleware');

router.post('/createNewUser', createNewUser);
router.post('/authorizationUser', authorizationUser);
router.get('/getAllFavorites', getAllFavorites);
router.get('/addToFavorite', addToFavorite);
router.get('/removeFromFavorite', removeFromFavorites);
// router.post('/deleteRefreshToken', deleteRefreshToken);

module.exports = router;

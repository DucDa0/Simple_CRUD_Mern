const express = require('express');
const router = express.Router();

const {
  getUserInfo,
  Login,
  Register,
  googleLogin,
  facebookLogin,
} = require('../controllers/authController');

const { validateLogin, validateRegister } = require('../valid');

const { auth } = require('../middlewares/auth');

router.get('/', auth, getUserInfo);

router.post('/login', validateLogin, Login);

router.post('/register', validateRegister, Register);

router.post('/googleLogin', googleLogin);

router.post('/facebookLogin', facebookLogin);

module.exports = router;

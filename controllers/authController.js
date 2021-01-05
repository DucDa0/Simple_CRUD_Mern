const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const config = require('config');
const axios = require('axios');
const client = new OAuth2Client(config.get('GOOGLE_CLIENT'));

const User = require('../models/User');

module.exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(['-password']);
    if (!user) {
      return res.status(404).json({
        errors: [{ msg: 'Người dùng không tồn tại' }],
      });
    }
    return res.json(user);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

module.exports.Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Email hoặc mật khẩu không hợp lệ!' }],
      });
    }

    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: 'Email hoặc mật khẩu không hợp lệ!' }],
      });
    }
    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(
      payload,
      config.get('JWT_LOGIN'),
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

module.exports.facebookLogin = async (req, res) => {
  const { userID, accessToken } = req.body;
  const URL = `https://graph.facebook.com/v9.0/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  if (!userID || !accessToken) {
    return;
  }
  try {
    const facebookRes = await axios.default.get(URL);
    const { email, name } = facebookRes.data;
    const user = await User.findOne({ email });
    if (user) {
      const payload = {
        user: {
          id: user._id,
        },
      };
      jwt.sign(
        payload,
        config.get('JWT_LOGIN'),
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
      return;
    }
    let newPassword = 'defaultpass';
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(newPassword, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const payload = {
      user: {
        id: newUser._id,
      },
    };
    jwt.sign(
      payload,
      config.get('JWT_LOGIN'),
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    return res.status(400).json({
      errors: [{ msg: 'Đăng nhập thất bại, vui lòng thử lại!' }],
    });
  }
};

module.exports.googleLogin = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return;
  }
  try {
    client
      .verifyIdToken({ idToken, audience: config.get('GOOGLE_CLIENT') })
      .then(async (response) => {
        const { email_verified, name, email } = response.payload;

        if (email_verified) {
          const user = await User.findOne({ email });
          if (user) {
            const payload = {
              user: {
                id: user._id,
              },
            };
            jwt.sign(
              payload,
              config.get('JWT_LOGIN'),
              { expiresIn: '7d' },
              (err, token) => {
                if (err) throw err;
                return res.json({ token });
              }
            );
            return;
          }
          let newPassword = 'defaultpass';
          const salt = await bcrypt.genSalt(10);
          let hashedPassword = await bcrypt.hash(newPassword, salt);
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
          });
          await newUser.save();
          const payload = {
            user: {
              id: newUser._id,
            },
          };
          jwt.sign(
            payload,
            config.get('JWT_LOGIN'),
            { expiresIn: '7d' },
            (err, token) => {
              if (err) throw err;
              return res.json({ token });
            }
          );
        } else {
          return res.status(400).json({
            errors: [
              {
                msg:
                  'Tài khoản google của bạn chưa được xác thực, vui lòng thử lại!',
              },
            ],
          });
        }
      });
  } catch (err) {
    return res.status(400).json({
      errors: [{ msg: 'Đăng nhập thất bại, vui lòng thử lại!' }],
    });
  }
};

module.exports.Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Địa chỉ email này đã được đăng ký' }] });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save((err, success) => {
      if (!err) {
        return res.json({ message: 'Đăng ký thành công!' });
      }
      return res.status(400).json({ errors: [{ msg: 'Đăng ký thất bại!' }] });
    });
  } catch (err) {
    return res.status(500).send('Server error');
  }
};

const { check } = require('express-validator');

module.exports.validAddProduct = [
  check('name', 'Vui lòng nhập từ')
    .notEmpty()
    .isLength({
      min: 1,
      max: 100,
    })
    .withMessage('Độ dài của từ chứa ít nhất 1 kí tự'),
  check('description', 'Vui lòng nhập mô tả')
    .notEmpty()
    .isLength({
      min: 1,
      max: 2000,
    })
    .withMessage('Độ dài của mô tả chứa ít nhất 1 kí tự'),
];

module.exports.validateLogin = [
  check('email', 'Vui lòng nhập email')
    .notEmpty()
    .isEmail()
    .withMessage('Vui lòng nhập email hợp lệ'),
  check('password', 'Vui lòng nhập mật khẩu').notEmpty(),
];

module.exports.validateRegister = [
  check('name', 'Vui lòng nhập họ tên')
    .notEmpty()
    .isLength({
      min: 2,
      max: 32,
    })
    .withMessage('Độ dài của tên phải nằm trong khoảng từ 2 đến 32 ký tự'),
  check('email', 'Vui lòng nhập email')
    .notEmpty()
    .isEmail()
    .withMessage('Vui lòng nhập email hợp lệ'),
  check('password', 'Vui lòng nhập mật khẩu')
    .notEmpty()
    .isLength({
      min: 6,
      max: 32,
    })
    .withMessage('Độ dài của mật khẩu phải nằm trong khoảng từ 6 đến 32 ký tự')
    .matches(/\d/)
    .withMessage('Mật khẩu phải bao gồm số'),
];

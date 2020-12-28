const { check } = require('express-validator');

module.exports.validAddProduct = [
  check('name', 'Vui lòng nhập tên sản phẩm')
    .notEmpty()
    .isLength({
      min: 2,
      max: 2000,
    })
    .withMessage('Độ dài của tên sản phẩm chứa ít nhất 2 kí tự'),
  check('description', 'Vui lòng nhập mô tả sản phẩm')
    .notEmpty()
    .isLength({
      min: 2,
      max: 2000,
    })
    .withMessage('Độ dài của mô tả sản phẩm chứa ít nhất 2 kí tự'),
  check('price', 'Vui lòng nhập giá sản phẩm')
    .notEmpty()
    .isNumeric()
    .withMessage('Gía tiền không hợp lệ'),
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

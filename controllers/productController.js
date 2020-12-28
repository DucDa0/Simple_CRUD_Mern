const { validationResult } = require('express-validator');
const Product = require('../models/Product');

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};

module.exports.addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description, price } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
    });
    await product.save((err, data) => {
      if (!err) {
        return res.json({ message: 'Thêm sản phẩm thành công!' });
      }
      return res
        .status(400)
        .json({ errors: [{ msg: 'Thêm sản phẩm thất bại!' }] });
    });
  } catch (err) {}
};

module.exports.editProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description, price, id } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Sản phẩm không tồn tại!' }] });
    }
    product.name = name;
    product.description = description;
    product.price = parseInt(price);
    await product.save((err, data) => {
      if (!err) {
        return res.json({ message: 'Sửa sản phẩm thành công!' });
      }
      return res
        .status(400)
        .json({ errors: [{ msg: 'Sửa sản phẩm thất bại!' }] });
    });
  } catch (err) {}
};

module.exports.removeProduct = async (req, res) => {
  const { id } = req.body;
  try {
    await Product.findByIdAndDelete(id).exec((err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Xóa sản phẩm thất bại!' }] });
      }
      return res.json({ message: 'Xóa sản phẩm thành công!' });
    });
  } catch (err) {}
};

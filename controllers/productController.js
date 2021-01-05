const { validationResult } = require('express-validator');
const config = require('config');
const Product = require('../models/Product');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: config.get('CLOUD_NAME'),
  api_key: config.get('API_KEY_IMAGE'),
  api_secret: config.get('API_SECRET'),
});

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ userId: req.user.id });
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
  const { name, description, content } = req.body;
  try {
    const product = new Product({
      userId: req.user.id,
      name,
      description,
      content,
    });
    // const imageUrl = await cloudinary.uploader.upload(req.file.path);
    // if (imageUrl) {
    //   product.image = imageUrl.url;
    // }
    product.image = req.body.url;
    await product.save((err, data) => {
      if (!err) {
        return res.json({ message: 'Thêm thành công!', product });
      }
      return res.status(400).json({ errors: [{ msg: 'Thêm thất bại!' }] });
    });
  } catch (err) {}
};

module.exports.editProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description, id } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Dữ liệu không tồn tại!' }] });
    }
    product.name = name;
    product.description = description;
    await product.save((err, data) => {
      if (!err) {
        return res.json({ message: 'Sửa thành công!', product });
      }
      return res.status(400).json({ errors: [{ msg: 'Sửa thất bại!' }] });
    });
  } catch (err) {}
};

module.exports.removeProduct = async (req, res) => {
  const { id } = req.body;
  try {
    await Product.findByIdAndDelete(id).exec((err, data) => {
      if (err) {
        return res.status(400).json({ errors: [{ msg: 'Xóa thất bại!' }] });
      }
      return res.json({ message: 'Xóa thành công!' });
    });
  } catch (err) {}
};

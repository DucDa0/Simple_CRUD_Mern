const express = require('express');
const router = express.Router();

const {
  getProducts,
  addProduct,
  editProduct,
  removeProduct,
} = require('../controllers/productController');

const { validAddProduct } = require('../valid');

const { auth } = require('../middlewares/auth');

router.get('/', auth, getProducts);

router.post('/', [auth, validAddProduct], addProduct);

router.put('/', [auth, validAddProduct], editProduct);

router.delete('/', auth, removeProduct);

module.exports = router;

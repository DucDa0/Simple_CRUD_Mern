const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const {
  getProducts,
  addProduct,
  editProduct,
  removeProduct,
} = require('../controllers/productController');

const { validAddProduct } = require('../valid');

const { auth } = require('../middlewares/auth');

router.get('/', auth, getProducts);

router.post(
  '/',
  [auth, validAddProduct],
  upload.single('productImg'),
  addProduct
);

router.put('/', [auth, validAddProduct], editProduct);

router.post('/remove', auth, removeProduct);

module.exports = router;

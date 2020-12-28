const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  image: { type: String, trim: true, default: 'https://picsum.photos/200/300' },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('product', ProductSchema);

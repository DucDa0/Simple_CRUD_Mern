const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true, default: '' },
  content: { type: String, trim: true },
  image: [{ type: String, trim: true }],
});

module.exports = mongoose.model('product', ProductSchema);

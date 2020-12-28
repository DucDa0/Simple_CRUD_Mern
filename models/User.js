const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
});

UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('user', UserSchema);

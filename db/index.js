const mongoose = require('mongoose');
const config = require('config');
const db_url = config.get('MONGO_URI');

const connectToDB = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = { connectToDB };

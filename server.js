const express = require('express');
const path = require('path');
const config = require('config');
const multiparty = require('connect-multiparty');
const MultipartyMiddleware = multiparty({ uploadDir: './public/uploads' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: config.get('CLOUD_NAME'),
  api_key: config.get('API_KEY_IMAGE'),
  api_secret: config.get('API_SECRET'),
});

const { connectToDB } = require('./db');
const { route } = require('./routes');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.post('/upload', MultipartyMiddleware, async (req, res) => {
  let tmpFile = req.files.upload;
  let pathFile = tmpFile.path;
  if (req.files.upload) {
    const imageUrl = await cloudinary.uploader.upload(pathFile);
    return res.status(200).json({
      uploaded: true,
      url: imageUrl.url,
    });
  }
});

connectToDB();

route(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

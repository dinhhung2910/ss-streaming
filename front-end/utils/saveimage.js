const fs = require('fs');
const {v4} = require('uuid');
const path = require('path');
const config = require('config');

const baseUrl = config.get('baseUrl');

const SaveImage = (base64) => {
  const m = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const b = Buffer.from(m[2], 'base64');
  const filename = v4() + '.png';

  fs.writeFileSync(path.resolve(__basedir, 'media', 'image', filename), b);
  return `${baseUrl}/media/image/${filename}`;
};

const SaveStoreImage = (base64) => {
  const m = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const b = Buffer.from(m[2], 'base64');
  const filename = v4() + '.png';

  fs.writeFileSync(path.resolve(__basedir, 'media', 'store', filename), b);
  return `${baseUrl}/media/image/store/${filename}`;
};

module.exports = {SaveImage, SaveStoreImage};

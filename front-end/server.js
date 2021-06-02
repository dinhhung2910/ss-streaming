const express = require('express');
const connectDB = require('./config/db');

const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const httpServer = require('http').createServer(app);
const cors = require('cors');
const {init} = require('./kafka/produces');

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT);

// const server = app.listen(PORT, () => {
//   console.log(`Server is listening at port ${PORT}`);
// });

// Init Middleware
app.use(express.json({
  extended: false,
  limit: '50mb',
}));
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(express.json({limit: '50mb'}));
app.use(cookieParser());


global.__basedir = __dirname;

// Connect database
connectDB();
// Init kafka
init();

// API ROUTES DEFINE HERE
// app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/event', require('./routes/api/event'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/category', require('./routes/api/category'));

// UPLOADED MEDIA
app.get('/media/image/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'media', 'image', req.params.filename));
});

// Serve static assets in production
// process.env.NODE_ENV == 'production'

// Check session

app.use(express.static('client/build'));

// public route

app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

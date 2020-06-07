//server.js
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const Products = require('./products');
const port = process.env.PORT || 8000;
const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/products', (req, res) => {
  console.log('get product request');

  try {
    //assuming this product data is comming from mongo db
    //TODO
    let products = Products;

    res.status(200).send({
      error: false,
      message: 'Products!!',
      errObj: null,
      products: products,
    });
  } catch (e) {
    res.status(404).send({
      error: true,
      message: 'Something went wrong!!',
      errObj: e,
    });
  }
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);

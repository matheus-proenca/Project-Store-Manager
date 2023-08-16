const express = require('express');
const { productController, salesController } = require('./controllers');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProductById);
app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.getSalesById);

module.exports = app;

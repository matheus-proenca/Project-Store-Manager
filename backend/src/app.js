const express = require('express');
const { productController, salesController } = require('./controllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productController.getProducts);
app.get('/products/:id', productController.getProductById);
app.get('/sales', salesController.getSales);
app.get('/sales/:id', salesController.getSalesById);
app.post('/products', productController.createProduct);

module.exports = app;

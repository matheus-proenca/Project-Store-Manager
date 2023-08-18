const express = require('express');
const { productController, salesController } = require('./controllers');
const { checkName } = require('./middlewares/product');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.get('/products', productController.getProducts);
app.get('/sales', salesController.getSales);
app.get('/products/:id', productController.getProductById);
app.get('/sales/:id', salesController.getSalesById);
app.post('/products', checkName, productController.createProduct);
app.put('/products/:id', checkName, productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

module.exports = app;

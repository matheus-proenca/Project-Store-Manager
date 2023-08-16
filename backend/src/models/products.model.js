const connection = require('./connection');

const findProductById = async (productId) => {
  const [[product]] = await connection
  .execute('SELECT * FROM products WHERE id = ?', [productId]);
  return product;
};

const getProduct = async () => {
  const [product] = await connection.execute('SELECT * FROM products');
  return product;
};

module.exports = {
  findProductById,
  getProduct,
};
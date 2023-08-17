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

const createProduct = async (nameProduct) => {
  await connection.execute(`insert into products (name)
value (?)`, [nameProduct]);
  const [[findProduct]] = await connection.execute(`SELECT * FROM products 
 where NAME = ?`, [nameProduct]);
  return findProduct;
};

module.exports = {
  findProductById,
  getProduct,
  createProduct,
};
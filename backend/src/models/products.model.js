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

const updateProduct = async (productId, nameProduct) => {
  await connection.execute(`UPDATE products SET id = ?, name = ?
 WHERE id = ?`, [productId, nameProduct, productId]);
  const [[findProduct]] = await connection.execute(`SELECT * FROM products 
 where NAME = ?`, [nameProduct]);
  return findProduct;
};

const deleteProduct = async (productId) => {
  await connection.execute(`DELETE FROM StoreManager.products
WHERE id = ?`, [productId]);
const [product] = await connection.execute('SELECT * FROM products');
  return product;
};

module.exports = {
  findProductById,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
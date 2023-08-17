const { productModel } = require('../models');

const requestProduct = async (productId) => {
  const product = await productModel.findProductById(productId);
  if (!product) return { status: 404, data: { message: 'Product not found' } };
  
  return { status: 200, data: product };
};

const getProduct = async () => {
  const productData = await productModel.getProduct();
  return productData;
};

const productCreate = async (nameProduct) => {
  const createData = await productModel.createProduct(nameProduct);
  return { status: 201, data: createData };
};

module.exports = { 
  requestProduct,
  getProduct,
  productCreate,
};
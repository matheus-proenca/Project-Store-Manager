const { productModel } = require('../models');

const requestProduct = async (productId) => {
  const product = await productModel.findProductById(productId);
  if (!product) return { status: 404, data: { message: 'Product not found' } };
  
  return { status: 200, data: product };
};

const getProduct = async () => {
  const productData = await productModel.getProduct();
  return { status: 200, data: productData };
};

const productCreate = async (nameProduct) => {
  const createData = await productModel.createProduct(nameProduct);
  return { status: 201, data: createData };
};

const productUpdate = async (id, name) => {
  const updateData = await productModel.updateProduct(id, name);
  if (!updateData) return { status: 404, data: { message: 'Product not found' } };

  return { status: 200, data: updateData };
};

const productDelete = async (id) => {
  const findId = await productModel.findProductById(id);
  if (!findId) return { status: 404, data: { message: 'Product not found' } };

  await productModel.deleteProduct(id);
  return { status: 204 };
};

module.exports = { 
  requestProduct,
  getProduct,
  productCreate,
  productUpdate,
  productDelete,
};
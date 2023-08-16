const { productService } = require('../services');

const getProducts = async (_req, res) => {
  const product = await productService.getProduct();
  return res.status(200).json(product);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.requestProduct(id);
  return res.status(status).json(data);
};

module.exports = {
  getProducts,
  getProductById,
};
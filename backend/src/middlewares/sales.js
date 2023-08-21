const { productModel } = require('../models');

const saleProduct = (req, res, next) => {
  const sale = req.body;

  const productError = sale.some(({ productId }) => productId === undefined);
  if (productError) return res.status(400).json({ message: '"productId" is required' });
  
  return next();
};

const saleQuantity = (req, res, next) => {
  const sales = req.body;

  const quantityError = sales.some(({ quantity }) => quantity === undefined);
  if (quantityError) return res.status(400).json({ message: '"quantity" is required' });

  const quantityCorrect = sales.some(({ quantity }) => quantity < 1);
  if (quantityCorrect) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const findId = async (productId) => {
  const findProductId = await productModel.findProductById(productId);
  return findProductId || null;
};

const saleProductId = async (req, res, next) => {
  const sales = req.body;

  const findProductId = sales.map(({ productId }) => findId(productId));
  const checkId = (await Promise.all(findProductId)).find((value) => value === null);
  if (checkId === null) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  saleProduct,
  saleQuantity,
  saleProductId,
};
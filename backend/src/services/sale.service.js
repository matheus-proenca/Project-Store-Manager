const { salesModel } = require('../models');

const getSales = async () => {
  const saleData = await salesModel.getSales();
  return { status: 200, data: saleData };
};

const requestSales = async (saleId) => {
  const sale = await salesModel.findSalesById(saleId);
  if (!sale[0]) return { status: 404, data: { message: 'Sale not found' } };
  
  return { status: 200, data: sale };
};

const createSale = async (itemsSold) => {
  const id = await salesModel.createSale(itemsSold);
  return { status: 201, data: { id, itemsSold } };
};

module.exports = {
  getSales,
  requestSales,
  createSale,
};
const { salesModel } = require('../models');

const getSales = async () => {
  const saleData = await salesModel.getSales();
  return saleData;
};

const requestSales = async (saleId) => {
  const sale = await salesModel.findSalesById(saleId);
  if (!sale[0]) return { status: 404, data: { message: 'Sale not found' } };
  
  return { status: 200, data: sale };
};

module.exports = {
  getSales,
  requestSales,
};
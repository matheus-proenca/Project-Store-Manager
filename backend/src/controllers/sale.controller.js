const { saleService } = require('../services');

const getSales = async (_req, res) => {
  const { status, data } = await saleService.getSales();
  return res.status(status).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.requestSales(id);
  return res.status(status).json(data);
};

module.exports = {
  getSales,
  getSalesById,
};
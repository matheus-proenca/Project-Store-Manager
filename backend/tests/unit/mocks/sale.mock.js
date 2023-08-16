const mockDate = '2023-08-17T00:16:35.000Z';

const mockSale = [
  {
    saleId: 1,
    date: mockDate,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: mockDate,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: mockDate,
    productId: 3,
    quantity: 15,
  },
];

const getSaleByid = [
  {
    date: mockDate,
    productId: 1,
    quantity: 5,
  },
  {
    date: mockDate,
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  mockSale,
  getSaleByid,
};
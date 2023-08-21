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

const createSaleMock = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const createReq = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const errorCreateReq = [
  {
    productId: 5,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const errorReq = [
  {
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const errorQuantityExiReq = [
  {
    productId: 5,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const errorQuantityZeroReq = [
  {
    productId: 5,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  mockSale,
  getSaleByid,
  createSaleMock,
  createReq,
  errorCreateReq,
  errorReq,
  errorQuantityExiReq,
  errorQuantityZeroReq,
};
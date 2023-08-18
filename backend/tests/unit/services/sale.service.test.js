const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');
const { getSaleByid, mockSale } = require('../mocks/sale.mock');

describe('Realizando teste na sale service', function () {
   it('Testa se encontra as venda', async function () {
    sinon.stub(salesModel, 'getSales').resolves(mockSale);

    const service = await saleService.getSales();
    expect(service.status).to.equal(200);
    expect(service.data).to.deep.equal(mockSale);
  });

  it('testa se encontra a venda com um id existente', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves(getSaleByid);

    const id = 1;

    const service = await saleService.requestSales(id);
    expect(service.status).to.equal(200);
    expect(service.data).to.deep.equal(getSaleByid);
  });
  it('testa se não encontra a venda com um id inexistente', async function () {
    sinon.stub(salesModel, 'findSalesById').resolves([]);
    const error = { message: 'Sale not found' };
    const idInex = 6;

    const service = await saleService.requestSales(idInex);
    expect(service.status).to.equal(404);
    expect(service.data).to.deep.equal(error);
  });

  afterEach(function () {
    sinon.restore();
  });
});
const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { getSaleByid, mockSale } = require('../mocks/sale.mock');

describe('Realizando teste na sale model', function () {
   it('Buscando o sale', async function () {
    sinon.stub(connection, 'execute').resolves([mockSale]);
    
    const sale = await salesModel.getSales();

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(mockSale);
  });

  it('Buscando o sale pelo', async function () {
    sinon.stub(connection, 'execute').resolves([getSaleByid]);
    
    const id = 1;
    const sale = await salesModel.findSalesById(id);

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(getSaleByid);
  });

  afterEach(function () {
    sinon.restore();
  });
});
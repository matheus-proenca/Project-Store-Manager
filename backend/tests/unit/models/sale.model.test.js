const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { getSaleByid } = require('../mocks/sale.mock');

describe('Realizando teste na sale model', function () {
  it('buscando o sale', async function () {
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
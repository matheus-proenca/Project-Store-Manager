const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { createReq } = require('../mocks/sale.mock');
const { saleProductId, saleQuantity, saleProduct } = require('../../../src/middlewares/sales');

chai.use(sinonChai);

describe('Realizando teste na sales middleware', function () {
  it('ProductId esta correto', async function () {
    const req = {
      body: createReq,
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await saleProduct(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  it('Quantity esta correto', async function () {
    const req = {
      body: createReq,
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await saleQuantity(req, res, next);
    expect(next).to.have.been.calledWith();
  });

   it('é um id existente', async function () {
    const req = {
      body: createReq,
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await saleProductId(req, res, next);
    expect(next).to.have.been.calledWith();
  });

   afterEach(function () {
    sinon.restore();
  });
});
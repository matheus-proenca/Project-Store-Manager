const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { getProductByid } = require('../mocks/product.mock');

chai.use(sinonChai);

describe('Realizando teste na product controller', function () {
  it('recebe o id', async function () {
    sinon.stub(productService, 'requestProduct').resolves({
      status: 200,
      data: getProductByid,
    });
    const req = {
      params: { productId: 1 },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getProductByid);
  });

  afterEach(function () {
    sinon.restore();
  });
});
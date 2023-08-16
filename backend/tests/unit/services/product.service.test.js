const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { getProductByid } = require('../mocks/product.mock');

describe('Realizando teste na product service', function () {
  it('testa se recebe o encontra com um id existente', async function () {
    sinon.stub(productModel, 'findProductById').resolves(getProductByid);

    const id = 1;

    const service = await productService.requestProduct(id);
    expect(service.status).to.equal(200);
    expect(service.data).to.deep.equal(getProductByid);
  });
  it('testa se não encontra o produto com um id inexistente', async function () {
    const error = { message: 'Product not found' };
    const idInex = 6;

    const service = await productService.requestProduct(idInex);
    expect(service.status).to.equal(404);
    expect(service.data).to.deep.equal(error);
  });

  afterEach(function () {
    sinon.restore();
  });
});
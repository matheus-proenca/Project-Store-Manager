const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { getProductByid } = require('../mocks/product.mock');

describe('Realizando teste na product model', function () {
  it('buscando o produto', async function () {
    sinon.stub(connection, 'execute').resolves([[getProductByid]]);
    
    const id = 1;
    const product = await productModel.findProductById(id);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(getProductByid);
  });

  afterEach(function () {
    sinon.restore();
  });
});
const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { getProductByid, createProductMock } = require('../mocks/product.mock');

describe('Realizando teste na product model', function () {
  it('buscando o produto', async function () {
    sinon.stub(connection, 'execute').resolves([[getProductByid]]);
    
    const id = 1;
    const product = await productModel.findProductById(id);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(getProductByid);
  });

   it('criando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([[createProductMock]]);
    
    const name = 'ProdutoX';
    const product = await productModel.createProduct(name);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(createProductMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});
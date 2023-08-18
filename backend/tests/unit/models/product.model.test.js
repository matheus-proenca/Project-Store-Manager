const sinon = require('sinon');
const { expect } = require('chai');
const { productModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { getProductByid, createProductMock, productUpdateMock, getProduct } = require('../mocks/product.mock');

describe('Realizando teste na product model', function () {
  it('Buscando o produto', async function () {
    sinon.stub(connection, 'execute').resolves([getProduct]);
    
    const product = await productModel.getProduct();

    expect(product).to.be.an('array');
    expect(product).to.be.deep.equal(getProduct);
  });

  it('Buscando o produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[getProductByid]]);
    
    const id = 1;
    const product = await productModel.findProductById(id);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(getProductByid);
  });

   it('Criando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([[createProductMock]]);
    
    const name = 'ProdutoX';
    const product = await productModel.createProduct(name);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(createProductMock);
  });

  it('Atualizando um produto', async function () {
    sinon.stub(connection, 'execute').resolves([[productUpdateMock]]);
    
    const name = 'Martelo do Batman';
    const id = 1;
    const product = await productModel.updateProduct(id, name);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productUpdateMock);
  });

  afterEach(function () {
    sinon.restore();
  });
});
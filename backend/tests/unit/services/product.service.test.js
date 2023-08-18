const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { getProductByid, createProductMock, productUpdateMock, getProduct } = require('../mocks/product.mock');

describe('Realizando teste na product service', function () {
   it('Testa se encontra os produtos', async function () {
    sinon.stub(productModel, 'getProduct').resolves(getProduct);

    const service = await productService.getProduct();
    expect(service.status).to.equal(200);
    expect(service.data).to.deep.equal(getProduct);
  });

  it('Testa se encontra um produto com um id existente', async function () {
    sinon.stub(productModel, 'findProductById').resolves(getProductByid);

    const id = 1;

    const service = await productService.requestProduct(id);
    expect(service.status).to.equal(200);
    expect(service.data).to.deep.equal(getProductByid);
  });
  it('Testa se não encontra o produto com um id inexistente', async function () {
    sinon.stub(productModel, 'findProductById').resolves(undefined);
    const error = { message: 'Product not found' };
    const idInex = 6;

    const service = await productService.requestProduct(idInex);
    expect(service.status).to.equal(404);
    expect(service.data).to.deep.equal(error);
  });
  it('Testa se o Produto é criado com sucesso', async function () {
    sinon.stub(productModel, 'createProduct').resolves(createProductMock);
    const name = 'ProdutoX';
    const service = await productService.productCreate(name);

    expect(service.status).to.equal(201);
    expect(service.data).to.deep.equal(createProductMock);
  });

  it('Testa se atualiza o Produto com sucesso', async function () {
    sinon.stub(productModel, 'updateProduct').resolves(productUpdateMock);
    const name = 'Martelo do Batman';
    const id = 1;
    const service = await productService.productUpdate(id, name);

    expect(service.status).to.equal(200);
    expect(service.data).to.deep.equal(productUpdateMock);
  });

   it('Testa se retorna erro quanto tenta atualizar com id inexistente', async function () {
    sinon.stub(productModel, 'updateProduct').resolves(undefined);
    const name = 'Martelo do Batman';
    const id = 6;
    const error = { message: 'Product not found' };
    const service = await productService.productUpdate(id, name);

    expect(service.status).to.equal(404);
    expect(service.data).to.deep.equal(error);
  });

  afterEach(function () {
    sinon.restore();
  });
});
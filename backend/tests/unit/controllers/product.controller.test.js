const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { getProductByid, createProductMock } = require('../mocks/product.mock');

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

  it('recebe o produto criado com sucesso', async function () {
    sinon.stub(productService, 'productCreate').resolves({
      status: 201,
      data: createProductMock,
    });
    const req = {
      body: { name: 'ProdutoX' },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(createProductMock);
  });

   it('recebe o produto criado com error se não possuir nome', async function () {
    const error = { message: '"name" is required' };
    sinon.stub(productService, 'productCreate').resolves({
      status: 400,
      data: error,
    });
    const req = {
      body: {},
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(error);
  });
   it('recebe o produto criado com error se o nome for invalido', async function () {
    const error = { message: '"name" length must be at least 5 characters long' };
    sinon.stub(productService, 'productCreate').resolves({
      status: 422,
      data: error,
    });
    const req = {
      body: { name: 'Prod' },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(error);
  });

  afterEach(function () {
    sinon.restore();
  });
});
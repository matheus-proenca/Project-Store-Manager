const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');
const { getProductByid, createProductMock, productUpdateMock, getProduct } = require('../mocks/product.mock');

chai.use(sinonChai);

describe('Realizando teste na product controller', function () {
  it('consegue obter o produto', async function () {
    sinon.stub(productService, 'getProduct').resolves({
      status: 200,
      data: getProduct,
    });
    const req = {
      body: {},
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.getProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getProduct);
  });

  it('Recebe o id', async function () {
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

  it('Recebe o produto criado com sucesso', async function () {
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

   it('Recebe o produto criado com error se não possuir nome', async function () {
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
   it('Recebe o produto criado com error se o nome for invalido', async function () {
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

  it('Recebe o produto atualizado com sucesso', async function () {
    sinon.stub(productService, 'productUpdate').resolves({
      status: 200,
      data: productUpdateMock,
    });
    const req = {
      body: { name: 'Martelo do Batman' },
      params: { id: 1 },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productUpdateMock);
  });

  it('Recebe o produto atualizando com error se não possuir nome', async function () {
    const error = { message: '"name" is required' };
    sinon.stub(productService, 'productUpdate').resolves({
      status: 400,
      data: error,
    });
    const req = {
      body: {},
      params: { id: 1 },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(error);
  });
  afterEach(function () {
    sinon.restore();
  });
});
const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { saleService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { getSaleByid, mockSale, createSaleMock, createReq, errorReq, errorCreateReq,
errorQuantityExiReq, errorQuantityZeroReq } = require('../mocks/sale.mock');

chai.use(sinonChai);

describe('Realizando teste na sales controller', function () {
   it('consegue obter as vendas', async function () {
    sinon.stub(saleService, 'getSales').resolves({
      status: 200,
      data: mockSale,
    });
    const req = {
      body: {},
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockSale);
  });

  it('recebe o id', async function () {
    sinon.stub(saleService, 'requestSales').resolves({
      status: 200,
      data: getSaleByid,
    });
    const req = {
      params: { saleId: 1 },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getSaleByid);
  });

  it('Venda é criada com sucesso', async function () {
    sinon.stub(saleService, 'createSale').resolves({
      status: 201,
      data: createSaleMock,
    });
    const req = {
      body: { createReq },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(createSaleMock);
  });

  it('Venda não é criada sem o campo do product id', async function () {
    const erro = { message: '"productId" is required' };
    sinon.stub(saleService, 'createSale').resolves({
      status: 400,
      data: erro,
    });
    const req = {
      body: { errorReq },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(erro);
  });

  it('Venda não é criada com o Product id inexistente', async function () {
    const erro = { message: 'Product not found' };
    sinon.stub(saleService, 'createSale').resolves({
      status: 404,
      data: erro,
    });
    const req = {
      body: { errorCreateReq },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(erro);
  });

  it('Venda não é criada sem o campo da quantity', async function () {
    const erro = { message: '"quantity" is required' };
    sinon.stub(saleService, 'createSale').resolves({
      status: 400,
      data: erro,
    });
    const req = {
      body: { errorQuantityExiReq },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(erro);
  });

   it('Venda não é criada se o quantity for igual a zero', async function () {
    const erro = { message: '"quantity" must be greater than or equal to 1' };
    sinon.stub(saleService, 'createSale').resolves({
      status: 400,
      data: erro,
    });
    const req = {
      body: { errorQuantityZeroReq },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createSale(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(erro);
  });

  afterEach(function () {
    sinon.restore();
  });
});
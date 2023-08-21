const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { checkName } = require('../../../src/middlewares/product');

chai.use(sinonChai);

describe('Realizando teste na product middleware', function () {
  it('o nome esta correto', function () {
    const req = {
      body: { name: 'albeto' },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    checkName(req, res, next);
    expect(next).to.have.been.calledWith();
  });

    it('esta faltando o nome', function () {
    const req = {
      body: { },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    checkName(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

   it('o nome possui menos de 5 caracteres', function () {
    const req = {
      body: { name: 'alb' },
    };
     const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    checkName(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

   afterEach(function () {
    sinon.restore();
  });
});
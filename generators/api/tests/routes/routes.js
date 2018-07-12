const chai = require('chai');
const sinon = require('sinon');
const routes = require('../../routes/routes');

const  expect  = chai.expect;

describe('routes', () => {
  describe('when called', () => {
    let app;
    before(() => {
      app = {
        post: sinon.fake(),
        get: sinon.fake(),
      };
    });

    it('when called should define a get, and a post routes', () => {
      const model = {
        create(callback) {
          return callback();
        },
        get(callback) {
          return callback();
        },
      };
      routes(app, model);
      expect(app.get.callCount).to.equal(1);
      expect(app.post.callCount).to.equal(1);
    });
  });
});

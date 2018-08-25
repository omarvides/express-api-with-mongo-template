const chai = require('chai');
const controllers = require('../../controllers/controllers');

const expect = chai.expect;

describe('controllers', () => {
  describe('#configure', () => {
    it('should return an object when called', () => {
      const model = {
        create(callback) {
          return callback();
        },
        get(callback) {
          return callback();
        }
      }
      const controllerObject  = controllers.configure(model);
      expect(controllerObject).to.be.an.instanceOf(Object);
    });
  });
});

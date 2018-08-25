const superTest = require('supertest');
const app = require('../../server/index');

describe('Items', () => {
  describe('POST /create', () => {
    it('should create an item in the database', (done) => {
      superTest(app)
        .post('/create')
        .expect(200, done);
    });
  });
});

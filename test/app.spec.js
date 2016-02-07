const app = require('../app/index');
const supertest = require('supertest');
const request = supertest.agent(app.listen())

describe('A basic request', function () {
    it('to root should return 200', function (done) {
        request.get('/')
            .expect(200, done);
    });
    it('to /something should return 404', function(done) {
        request.get('/something')
            .expect(404, done);
    });
})

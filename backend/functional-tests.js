const chai = require('chai');
const assert = chai.assert;

const server = require('./server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);


suite('Functional Tests', function () {


    test('Test GET /', function (done) {
        chai.request(server)
            .get('/')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.text);
                done();
            });
    });

    test('Test GET /:id', function (done) {
        chai.request(server)
            .get('/5f5285152eae6020b84d95db')
            .end(function (err, res) {


                assert.equal(res.status, 200);
                assert.equal(res.text);
                done();
            });
    });

    test('Test POST /add', function (done) {
        chai.request(server)
            .post('/add')
            .send({
                title: 'Test',
            })
            .end(function (err, res) {

                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.title, 'Test');
                done();
            });
    });

    test('Test POST /update/:id', function (done) {
        chai.request(server)
            .post('/update/5f5285152eae6020b84d95db')
            .send({
                comments: 'Test',
            })
            .end(function (err, res) {

                assert.equal(res.status, 200);
                assert.equal(res.type, 'application/json');
                assert.equal(res.body.comments, 'Test');
                done();
            });
    });

    test('Test DELETE /delete', function (done) {
        chai.request(server)
            .delete('/')
            .end(function (err, res) {

                assert.equal(res.status, 200);
                done();
            });
    });

    test('Test DELETE /delete/:id', function (done) {
        chai.request(server)
            .get('/delete/5f5285152eae6020b84d95db')
            .end(function (err, res) {

                assert.equal(res.status, 200);
                done();
            });
    });

})
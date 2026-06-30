'use strict';
const config = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../app');

chai.use(chaiHttp);

let server;

before((done) => {
    server = app.listen(config.port, () => {
        done();
    });
});

after((done) => {
    server.close(done);
});

describe('/GET', () => {
    it('returns the homepage', (done) => {
        chai.request(`http://localhost:${config.port}`)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.contain('Welcome to Contoso!');
                done();
            });
    });
});

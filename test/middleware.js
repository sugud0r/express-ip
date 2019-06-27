var { expect } = require('chai');
var sinon  = require('sinon');

describe('getIpInfo', function () {
    var getIpInfo = require('../lib/getIpInfo');

    describe('#getIpInfo', function () {
        it('should return result object on valid IPv4 with almost a country property', function (done) {
            var result = getIpInfo('86.3.182.58');

            expect(result).to.be.a("object");
            expect(result).to.be.have.property('country');
            done();
        });

        it('should return "N/A" on IPv4 localhost', function (done) {
            var result = getIpInfo('127.0.0.1');

            expect(result).to.be.a('string');
            expect(result).to.be.equal('N/A');
            done();
        });

        it('should return "N/A" on IPv6 localhost', function (done) {
            var result = getIpInfo('::1');

            expect(result).to.be.a('string');
            expect(result).to.be.equal('N/A');
            done();
        });

        it('should return "N/A" on invalid IPv4 Address', function (done) {
            var result = getIpInfo('1823.256.0.1');

            expect(result).to.be.a('string');
            expect(result).to.be.equal('N/A');
            done();
        });

        it('should return "N/A" on invalid IPv6 Address', function (done) {
            var result = getIpInfo('2001::25de::cade');

            expect(result).to.be.a('string');
            expect(result).to.be.equal('N/A');
            done();
        });

        it('should normalize IP with "::ffff:" to usable IP and get good result with valid IPv4', function (done) {
            var result = getIpInfo('::ffff:86.3.182.58');

            expect(result).to.be.a('object');
            expect(result).to.have.property('country');
            done();
        });

        it('should normalize IP with "::ffff:" to usable IP and get "N/A" result with invalid IPv4', function (done) {
            var result = getIpInfo('::ffff:2321.3.182.58');

            expect(result).to.be.a('string');
            expect(result).to.be.equal('N/A');
            done();
        });

        it('should normalize IP with "::ffff:" to usable IP and get "N/A" result with IPv4 localhost', function (done) {
            var result = getIpInfo('::ffff:127.0.0.1');

            expect(result).to.be.a('string');
            expect(result).to.be.equal('N/A');
            done();
        });
    });
});

describe('express-ip', function () {
    var expressIp = require('../index');

    describe('request handler creation', function () {
        var mw;
    
        beforeEach(function () {
          mw = expressIp();
        });
    
        it('should return a function()', function () {
          expect(mw).to.be.a('function');
        });
    
        it('should accept three arguments', function () {
          expect(mw.length).to.equal(3);
        });
    });

    describe('request handler calling', function() {
        var req = {
            ip: '127.0.0.1',
            headers: {},
            get: function() {},
        }

        var next = sinon.spy()
        var res = {}

        afterEach(function () {
            next.resetHistory()
        })
        
        it('should call next() once', function() {
            var mw = expressIp();

            mw(req, res, next);
            expect(next.calledOnce).to.be.true;
        });

        it('should parse "X-Forwarded-For" when present', function() {
            var mw = expressIp();

            var stub = sinon.stub(req, 'get');
            req.get.withArgs('X-Forwarded-For').returns('127.0.0.1');

            mw(req, res, next);
            expect(next.calledOnce).to.be.true;
            expect(stub.called).to.be.true;
            stub.restore();
        });
    });
});
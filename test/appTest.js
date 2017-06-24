const assert = require('chai').assert;
var app = require('../app');

var chai = require('chai');
var chaiHttp = require('chai-http');

var expect = chai.expect;

chai.use(chaiHttp);

//Results app
//sayHelloResult = app.sayHello();
//addNumbersResult = app.addNumbers(5,5);

describe('App', function(){
	/*
	describe('sayHello()', function(){		
		it('sayHello should return hello', function(){
			let result = app.sayHello();
			assert.equal(sayHelloResult, 'hello');
		});
		
		it('sayHello should return type string', function(){
			let result = app.sayHello();
			assert.typeOf(sayHelloResult, 'string');
		});
	});
	
	describe('addNumbers()', function(){
		it('addNumbers should be above 5', function(){
			let result = app.addNumbers(5,5);
			assert.isAbove(addNumbersResult, 5);
		});
	
		it('addNumbers should return type number', function(){
			let result = app.addNumbers(5,5);
			assert.typeOf(addNumbersResult, 'number');
		});
	});
	*/
	describe('/set?somekey=somevalue', function() {
		it('responds with status 200', function(done) {
		  chai.request(app)
			.post('/set?somekey=somevalue')
			.end(function(err, res) {
			  expect(res).to.have.status(200);
			  done();
			});
		});
	});
	
	
	describe('/get', function() {
		it('responds with status 200', function(done) {
		  chai.request(app)
			.post('/set?somekey=somevalue')
			.then(function() {
			  chai.request(app)
				.get('/get?key=somekey')
				.end(function(err, res) {
				  expect(res).to.have.status(200);
				  expect(res.text).to.equal('somevalue');
				  done();
				});
			});
		});
	});
	

});

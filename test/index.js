var chai = require("chai");

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var promise = require('chai').promise;


var should = require('chai').should();
var expect = require('chai').expect;

var z = require('../index');

var q = require('q');


var UNZIP_SUCCESS = 0;
var UNZIP_FAILED = -1;

var zipMock = {

  counter: 0,
  successAfter: 1,

  reset : function() {
    this.counter = 0;
    this.failAfter = -1;
    this.successAfter = -1;
  },

  unzip : function(src, dest, callback, progressCallback) {

    this.counter++;
    //console.dir("Callback called run " + this.counter + " with src: " + src);
    if (this.successAfter === this.counter) {
      callback(UNZIP_SUCCESS);
    } else {
      callback(UNZIP_FAILED);
    }
  }


}

var zip;

beforeEach(function(done){
  zipMock.reset();

  zip = z({
    Promise: q.Promise,
    Zip: zipMock
  });
  done();
});

var src = "source.zip";
var dst = "destinationDir";

describe('#unzip', function() {

  it('unzip success with no options', function() {
    zipMock.successAfter = 1;
    var p = zip.unzip(src, dst);
    return p.should.be.fulfilled;
  });

  it('unzip should fail', function() {
    zipMock.successAfter = -1;
    var p = zip.unzip(src, dst);
    return p.should.be.rejected;
  });

  it('unzip should fail after 5 retries', function() {
    zipMock.successAfter = -1;
    var p = zip.unzip(src, dst, {
      retryCount: 5
    });
    return p.should.be.rejected;
  });


  it('unzip success on 5th retry', function() {
    zipMock.successAfter = 5;
    var p = zip.unzip(src, dst, {
      retryCount: 5
    });

    return p.should.be.fulfilled;
  });

  it('unzip success on 5th retry using settings from lib initialization', function() {
    zip = z({
      Promise: q.Promise,
      Zip: zipMock,
      retryCount: 5
    });

    zipMock.successAfter = 5;
    var p = zip.unzip(src, dst);

    return p.should.be.fulfilled;
  });


  it('initialization should throw error when no Promise lib specified', function() {
    var fn = function() {
      z();
    }
    expect(fn).to.throw('No Promise library given in options.Promise');
  });

  it('initialization should throw error when no Zip lib specified', function() {
    var fn = function() {
      z({
        Promise: q
      });
    }
    expect(fn).to.throw('No Zip library given in options.Zip');
  });

});

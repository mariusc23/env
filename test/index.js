'use strict';

const expect = require('chai').expect;
const env = require('../');

describe('env', () => {

  it('should fail without options', done => {
    try {
      env();
    } catch(err) {
      expect(err.message).to.contain('required');
      done();
    }
  });

  it('should fail without name', done => {
    try {
      env({});
    } catch(err) {
      expect(err.message).to.match(/required.+name/);
      done();
    }
  });

  it('should fail when missing required value', done => {
    try {
      env({
        name: 'undefined',
        required: true,
      });
    } catch(err) {
      expect(err.message).to.match(/required.+value/);
      done();
    }
  });

  it('should return default value', () => {
    const result = env({
      name: 'undefined',
      defaultValue: 'default',
    });
    const requiredResult = env({
      name: 'undefined',
      required: true,
      defaultValue: 'default',
    });
    expect(result).to.equal('default', 'failed when required is undefined');
    expect(requiredResult).to.equal('default', 'failed when required is true');
  });

  it('should return global default value', () => {
    const result = env({
      name: 'NODE_ENV'
    });
    expect(result).to.equal('development');
  });

  it('should return value', () => {
    process.env.TEST_ENV_VAR = true;
    const result = env({
      name: 'TEST_ENV_VAR',
    });
    expect(result).to.equal('true');
    process.env.TEST_ENV_VAR = undefined;
  });

  it('should transform value', () => {
    const result = env({
      name: 'json',
      defaultValue: '{ "ssl": true }',
      transform: function(value) {
        return JSON.parse(value);
      }
    });
    expect(result).to.have.property('ssl', true);
  });

});

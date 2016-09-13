'use strict';

const globalDefaultValues = {
  NODE_ENV: 'development'
};

function identity(value) {
  return value;
}

function env(options) {
  if (typeof options === 'undefined') {
    throw new Error('Missing required options argument. Expected an object.');
  }

  var name = options.name;

  if (typeof name === 'undefined') {
    throw new Error('Missing required environment variable name.');
  }

  var envValue = process.env[name];
  var defaultValue = options.defaultValue;
  var required = options.required === true;

  if (required === true && typeof envValue === 'undefined' && typeof defaultValue === 'undefined') {
    throw new Error('Missing required environment value: ' + name);
  }

  var value = envValue || defaultValue || globalDefaultValues[name];
  var transform = options.transform || identity;

  return transform(value);
}

function setDefault(key, value) {
  globalDefaultValues[key] = value;
  return value;
}

module.exports = env;

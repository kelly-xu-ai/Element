'use strict';

exports.__esModule = true;

var _deepCopy = require('./deep-copy');

Object.defineProperty(exports, 'deepCopy', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_deepCopy).default;
  }
});

var _typeOf = require('./typeOf');

Object.defineProperty(exports, 'typeOf', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_typeOf).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
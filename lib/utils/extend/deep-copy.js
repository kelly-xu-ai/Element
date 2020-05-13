'use strict';

exports.__esModule = true;

var _typeOf = require('./typeOf');

var _typeOf2 = _interopRequireDefault(_typeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deepCopy(data) {
  var t = (0, _typeOf2.default)(data);
  var o = void 0;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (var i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (var _i in data) {
      o[_i] = deepCopy(data[_i]);
    }
  }
  return o;
}

exports.default = deepCopy;
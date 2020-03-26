/* eslint-disable max-len */
import DisplayData from './displayData.js';

import screenTexts from './screenTextSign.js';

let _data = '0';
let _previousData = '0';
let _previousSign = '';
let _text = '';
let _previousText = '';
let _previousOperation = '';
let _continuousNumber = false;
let _continuousOperation = false;
let _OnceOperation = false;
const _displayData = new DisplayData();
function dealImmediateOperation(text) {
  switch (text) {
    case screenTexts.percentSign:
      if (_text === '' || _text === '0') {
        _data = '0';
        _text = '0';
      } else {
        _data = (Number(_data) / 100).toString();
        _text += _data;
      }
      break;
    case screenTexts.rootSquare:
      _text += `rSqr(${_data})`;
      _data = (Number(_data) ** 0.5).toString();
      break;
    case screenTexts.square:
      _text += `sqr(${_data})`;
      _data = (Number(_data) ** 2).toString();
      break;
    case screenTexts.reciprocal:
      _text += `1/(${_data})`;
      _data = (1 / Number(_data)).toString();
      break;
    default:
      break;
  }
  _displayData.showBigScreen(_data);
  _displayData.showSmallScreen(_text);
}

function deal(numOne, sign, numTwo) {
  switch (sign) {
    case screenTexts.addition:
      return Number(numOne) + Number(numTwo);
    case screenTexts.subtraction:
      return Number(numOne) - Number(numTwo);
    case screenTexts.multiplication:
      return Number(numOne) * Number(numTwo);
    case screenTexts.division:
      return Number(numOne) / Number(numTwo);
    default:
      return null;
  }
}
function dealC() {
  _data = '0';
  _previousData = '0';
  _previousSign = '';
  _text = '';
  _previousText = '';
  _previousOperation = '';
  _continuousOperation = false;
  _continuousNumber = false;
  _OnceOperation = false;
  _displayData.showSmallScreen('');
  _displayData.showBigScreen('0');
}

function dealCE() {
  if (_text.includes('=')) {
    dealC();
    return;
  }
  if (_OnceOperation) {
    _text = _previousText;
    _displayData.showSmallScreen(_text);
  }
  _data = '0';
  _previousData = '0';
  _displayData.showBigScreen('0');
}

function dealDelete() {
  if (_continuousNumber) {
    _data = _data.substring(0, _data.length - 1);
    if (parseFloat(_data).toString() === 'NaN') {
      _displayData.showBigScreen('0');
    } else {
      _displayData.showBigScreen(_data);
    }
  } else {
    _data = '0';
    _previousSign = '';
    _text = '';
    _continuousOperation = false;
    _displayData.showSmallScreen('');
  }
}

function dealPreviousSign(text) {
  if (_continuousOperation) {
    _text += text;
    _data = deal(_previousData, _previousSign, _data).toString();
  } else {
    const splitTexts = _text.split(_previousSign);
    _data = deal(splitTexts[0], _previousSign, _data).toString();
    _text += text;
    _continuousOperation = true;
  }
  _previousData = _data;
}

export function dealOperation(text) {
  if (text === screenTexts.clearAllOperation) {
    dealC();
    return;
  }
  if (text === screenTexts.clearCurrentOperation) {
    dealCE();
    return;
  }
  _OnceOperation = false;
  if (text === screenTexts.deleteNumber) {
    dealDelete();
    return;
  }
  _continuousNumber = false;
  if (text === screenTexts.percentSign || text === screenTexts.rootSquare || text === screenTexts.square || text === screenTexts.reciprocal) {
    _previousText = _text;
    _OnceOperation = true;
    dealImmediateOperation(text);
    return;
  }
  // operation switch
  if (_previousOperation === 'operation') {
    _previousSign = text;
    _text = _text.substring(0, _text.length - 1) + text;
    _displayData.showSmallScreen(_text);
    return;
  }
  if (_text.includes('=')) {
    _text = _data;
    _previousSign = '';
  } else {
    _text += _data;
  }
  // continuous operation
  if (_previousSign !== '') {
    dealPreviousSign(text);
    _displayData.showBigScreen(_data);
    _displayData.showSmallScreen(_text);
    _previousSign = text;
    _previousOperation = 'operation';
    return;
  }
  _previousSign = text;
  if (text === screenTexts.addition || text === screenTexts.subtraction || text === screenTexts.multiplication || text === screenTexts.division) {
    _text += text;
    _displayData.showSmallScreen(_text);
    _previousOperation = 'operation';
  }
}

export function dealNumber(text) {
  _OnceOperation = false;
  if (text === screenTexts.zero && _data === '0') {
    return;
  }
  if (text === screenTexts.decimalPoint) {
    if (!_data.includes('.')) {
      _data += '.';
      if (_text === '') {
        _previousData = _data;
      }
      _continuousNumber = true;
    }
    _displayData.showBigScreen(_data);
    return;
  }
  if (text === screenTexts.sign) {
    if (_data === '0') {
      return;
    }
    _data = _data[0] === '-' ? _data.substring(1) : `-${_data}`;
    if (_text === '') {
      _previousData = _data;
    }
    _continuousNumber = true;
    _displayData.showBigScreen(_data);
    return;
  }
  _data = _continuousNumber ? _data + text : text;
  if (_text === '') {
    _previousData = _data;
  }
  _continuousNumber = true;
  _displayData.showBigScreen(_data);
  _previousOperation = 'number';
}

export function dealEqual() {
  _OnceOperation = false;
  _continuousNumber = false;
  if (_text.includes('=')) {
    _text = `${_data + _previousSign + _previousData}=`;
    _data = deal(_data, _previousSign, _previousData).toString();
    _displayData.showSmallScreen(_text);
    _displayData.showBigScreen(_data);
    return;
  }
  _text += `${_data}=`;
  _data = deal(_previousData, _previousSign, _data).toString();
  _displayData.showSmallScreen(_text);
  _continuousOperation = false;
  _displayData.showBigScreen(_data);
  _previousData = _data;
}

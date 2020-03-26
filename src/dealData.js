import DisplayData from './displayData.js';

import screenTexts from './screenTextSign.js';

export default class DealData {
  constructor() {
    this._data = '';
    this._templeData = '';
    this._dataSign = '';
    this._templeSign = '';
    this._text = '';
    this._continuousNumber = true;
    this._continuousOperation = false;
    this._displayData = new DisplayData();
  }

  dealOperation(text) {
    if (text === screenTexts.clearAllOperation) {
      this.dealC();
      return;
    }
    if (text === screenTexts.deleteNumber) {
      this.dealDelete();
      return;
    }
    if (text === screenTexts.percentSign || text === screenTexts.rootSquare || text === screenTexts.square || text === screenTexts.reciprocal) {
      this.dealImmediateOperation(text);
      return;
    }
    this._text += this._data;
    this._continuousNumber = false;
    if (this._templeSign !== '') {
      this.dealTempleSign(text);
      this._displayData.showBigScreen(this._data);
      this._displayData.showSmallScreen(this._text);
      this._templeSign = text;
      return;
    }
    this._templeSign = text;
    if (text === screenTexts.addition || text === screenTexts.subtraction || text === screenTexts.multiplication || text === screenTexts.division) {
      this._text += text;
      this._displayData.showSmallScreen(`${this._text}`);
    }
  }

  dealNumber(text) {
    if (text === screenTexts.sign) {
      if (this._dataSign === '-') {
        this._dataSign = '+';
        this._data = this._data.substring(1);
      } else {
        this._dataSign = '-';
        this._data = `-${this._data}`;
      }
      this._displayData.showBigScreen(this._data);
      return;
    }
    if (this._continuousOperation) {
      this._templeData = this._data;
    }
    this._data = this._continuousNumber ? this._data + text : text;
    this._continuousNumber = true;
    this._displayData.showBigScreen(this._data);
  }

  dealEqual() {
    if (this._dataSign === '+' && this._templeSign === '-') {

    } else {
      const splitTexts = this._text.split(this._templeSign);
      this._data = DealData.deal(splitTexts[0], this._templeSign, splitTexts[1]).toString();
      this._displayData.showSmallScreen(`${this._text}=`);
      this._text = this._data;
    }
    this._continuousOperation = false;
    this._displayData.showBigScreen(this._data);
  }

  dealC() {
    this._data = '';
    this._dataSign = '';
    this._templeSign = '';
    this._text = '';
    this._continuousOperation = false;
    this._continuousNumber = true;
    this._displayData.showSmallScreen('');
    this._displayData.showBigScreen('0');
  }

  dealDelete() {
    // two case todo
    this._data = this._data.substring(0, this._data.length - 1);
    if (Number.isNaN(this._data)) {
      this._displayData.showBigScreen('0');
    } else {
      this._displayData.showBigScreen(this._data);
    }
  }

  dealTempleSign(text) {
    if (this._continuousOperation) {
      this._text += text;
      this._data = DealData.deal(this._templeData, this._templeSign, this._data).toString();
    } else {
      const splitTexts = this._text.split(this._templeSign);
      this._data = DealData.deal(splitTexts[0], this._templeSign, this._data).toString();
      this._text += this._templeSign;
      this._continuousOperation = true;
    }
  }

  dealImmediateOperation(text) {
    switch (text) {
      case screenTexts.percentSign:
        break;
      case screenTexts.rootSquare:
        this._text += `rSqr(${this._data})`;
        this._data = (Number(this._data) ** 0.5).toString();
        break;
      case screenTexts.square:
        this._text += `sqr(${this._data})`;
        this._data = (Number(this._data) ** 2).toString();
        break;
      case screenTexts.reciprocal:
        this._text += `1/(${this._data})`;
        this._data = (1 / Number(this._data)).toString();
        break;
      default:
        break;
    }
    this._displayData.showBigScreen(this._data);
    this._displayData.showSmallScreen(this._text);
  }

  static deal(numOne, sign, numTwo) {
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
}

import DisplayData from './displayData.js';

export default class DealData {
  constructor() {
    this._data = '';
    this._dataSign = '';
    this._templeSign = '';
    this._text = '';
    this._displayData = new DisplayData();
  }

  dealOperation(text) {
    this._templeSign = text;
    if (text === '+' || text === '-' || text === '*' || text === '/') {
      this._text += text;
    } else {

    }
    this._displayData.showSmallScreen(`${this._text}`);
  }

  dealNumber(text) {
    if (this._templeSign === '') {
      if (text === '+/_') {
        if (this._dataSign === '-') {
          this._dataSign = '+';
          this._data = this._data.substring(1);
        } else {
          this._dataSign = '-';
          this._data = `-${this._data}`;
        }
      } else {
        this._data += text;
        this._text += text;
      }
    } else {
      this._data = text;
      this._text += text;
    }
    this._displayData.showBigScreen(this._data);
  }

  dealEqual() {
    if (this._dataSign === '+' && this._templeSign === '-') {

    } else {
      const splitTexts = this._text.split(this._templeSign);
      this._data = this.deal(splitTexts[0], this._templeSign, splitTexts[1]).toString();
      this._displayData.showSmallScreen(`${this._text}=`);
      this._text = this._data;
    }
    this._displayData.showBigScreen(this._data);
  }

  deal(numOne, sign, numTwo) {
    if (sign === '+') {
      return Number(numOne) + Number(numTwo);
    } else if (sign === '-') {
      return Number(numOne) - Number(numTwo);
    } else if (sign === '*') {
      return Number(numOne) * Number(numTwo);
    } else if (sign === '/') {
      return Number(numOne) / Number(numTwo);
    }
  }
}

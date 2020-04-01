import Button from './button.js';

import { dealNumber } from '../calculateService/newDealData.js';

export default class NumberButton extends Button {
  constructor(text, dealData) {
    super(text);
    this._text = text;
    this._dealData = dealData;
    this._className = `${super.className} numberButton`;
    this.clickHandler = this.clickHandler.bind(this);
  }

  get className() {
    return this._className;
  }

  clickHandler() {
    dealNumber(this._text);
  }
}

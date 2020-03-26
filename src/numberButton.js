import Button from './button.js';

import { dealNumber } from './dealData.js';

export default class NumberButton extends Button {
  constructor(text, dealData) {
    super(text);
    this._dealData = dealData;
    this._className = `${super.className} numberButton`;
  }

  get className() {
    return this._className;
  }

  clickHandler() {
    dealNumber(this._text);
  }
}

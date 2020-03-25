import Button from './button.js';

import DealData from './dealData.js';

export default class NumberButton extends Button {
  constructor(type, id, text) {
    super(type, id, text);
    this._dealData = new DealData();
    this._className = `${super.className} numberButton`;
  }

  get className() {
    return this._className;
  }

  clickHandler(e) {
    this._dealData.dealNumber(e);
  }
}

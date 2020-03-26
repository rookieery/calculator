import Button from './button.js';

export default class NumberButton extends Button {
  constructor(text, dealData) {
    super(text);
    this._dealData = dealData;
    this._className = `${super.className} numberButton`;
  }

  get className() {
    return this._className;
  }

  clickHandler(text) {
    this._dealData.dealNumber(text);
  }
}

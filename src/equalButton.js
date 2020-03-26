import Button from './button.js';

export default class EqualButton extends Button {
  constructor(text, dealData) {
    super(text);
    this._className = `${super.className} equalButton`;
    this._dealData = dealData;
  }

  get className() {
    return this._className;
  }

  clickHandler() {
    this._dealData.dealEqual();
  }
}

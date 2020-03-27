import Button from './button.js';

import { dealEqual } from '../calculateService/dealData.js';

export default class EqualButton extends Button {
  constructor(text) {
    super(text);
    this._className = `${super.className} equalButton`;
  }

  get className() {
    return this._className;
  }

  clickHandler() {
    dealEqual(this._text);
  }
}

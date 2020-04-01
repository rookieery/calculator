import Button from './button.js';

import { dealOperation } from '../calculateService/newDealData.js';

export default class OperationButton extends Button {
  constructor(text, dealData) {
    super(text);
    this._text = text;
    this._dealData = dealData;
    this._className = `${super.className} operationButton`;
    this.clickHandler = this.clickHandler.bind(this);
  }

  get className() {
    return this._className;
  }

  clickHandler() {
    dealOperation(this._text);
  }
}

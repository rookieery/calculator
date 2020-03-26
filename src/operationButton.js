import Button from './button.js';

export default class OperationButton extends Button {
  constructor(text, dealData) {
    super(text);
    this._text = text;
    this._dealData = dealData;
    this._className = `${super.className} operationButton`;
  }

  get className() {
    return this._className;
  }

  clickHandler(text) {
    this._dealData.dealOperation(text);
  }
}

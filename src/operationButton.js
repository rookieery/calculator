import Button from './button.js';

export default class OperationButton extends Button {
  constructor() {
    super();
    this._className = 'operationButton';
  }

  get className() {
    return this._className;
  }
}

import { Button } from './button.js'
export class OperationButton extends Button {
  constructor() {
    super();
    this._className = super._className + ' ' + 'operationButton';
  }
  get className() {
    return this._className;
  }
}

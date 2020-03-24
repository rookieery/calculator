import { Button } from './button.js'
export class NumberButton extends Button {
  constructor() {
    super();
    this._className = super._className + ' ' + 'numberButton';
  }
  get className() {
    return this._className;
  }
}

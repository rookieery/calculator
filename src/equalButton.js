import { Button } from './button.js'
export class EqualButton extends Button {
  constructor() {
    super();
    this._className = super._className + ' ' + 'equalButton';
  }
  get className() {
    return this._className;
  }
}

import Button from './button.js';

export default class NumberButton extends Button {
  constructor() {
    super();
    this._className = 'numberButton';
  }

  get className() {
    return this._className;
  }
}

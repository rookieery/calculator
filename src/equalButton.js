import Button from './button.js';

export default class EqualButton extends Button {
  constructor() {
    super();
    this._className = 'equalButton';
  }

  get className() {
    return this._className;
  }
}

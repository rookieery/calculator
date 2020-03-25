export default class Button {
  constructor() {
    this._className = 'button';
  }

  get className() {
    return this._className;
  }

  set className(value) {
    this._className = value;
  }
}

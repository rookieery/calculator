
export default class Button {
  constructor(text) {
    this._className = 'button';
    this._text = text;
  }

  get className() {
    return this._className;
  }

  set className(value) {
    this._className = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  createButton() {
    const button = document.createElement('div');
    button.className = this._className;
    button.innerText = this._text;
    this.addClickEvent(button);
    return button;
  }

  addClickEvent(button) {
    // Arrow function guarantees that this points to
    button.addEventListener('click', () => {
      this.clickHandler(this._text);
    }, false);
  }
}

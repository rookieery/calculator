
export default class Button {
  constructor(type, id, text) {
    this._className = 'button';
    this._id = id;
    this._text = text;
    this._type = type;
  }

  get className() {
    return this._className;
  }

  set className(value) {
    this._className = value;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  createButton() {
    const button = document.createElement(this._type);
    button.id = this._id;
    button.className = this._className;
    button.innerText = this._text;
    this.addClickEvent(button);
    return button;
  }

  addClickEvent(button) {
    // 箭头函数保证this指向
    button.addEventListener('click', (e) => {
      this.clickHandler(e);
    }, false);
  }
}

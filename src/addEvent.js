import NumberButton from './numberButton.js';

import OperationButton from './operationButton.js';

import EqualButton from './equalButton.js';

import DealData from './dealData.js';

export default class AddEvent {
  constructor() {
    this._numberButton = new NumberButton();
    this._operationButton = new OperationButton();
    this._equalButton = new EqualButton();
  }

  start() {
    const operationClassName = this._operationButton.className;
    const numberClassName = this._numberButton.className;
    const equalClassName = this._equalButton.className;
    const operationButtons = AddEvent.getDom(operationClassName);
    const numberButtons = AddEvent.getDom(numberClassName);
    const equalButton = AddEvent.getDom(equalClassName)[0];
    AddEvent.addOperationEvent(operationButtons);
    AddEvent.addNumberEvent(numberButtons);
    AddEvent.addEqualEvent(equalButton);
  }

  static getDom(className) {
    return document.getElementsByClassName(className);
  }

  static addOperationEvent(operationButtons) {
    Array.from(operationButtons).forEach((element) => {
      element.addEventListener('click', AddEvent.dealOperation, false);
    });
  }

  static addNumberEvent(numberButtons) {
    Array.from(numberButtons).forEach((element) => {
      element.addEventListener('click', AddEvent.dealNumber, false);
    });
  }

  static addEqualEvent(equalButton) {
    equalButton.addEventListener('click', AddEvent.dealEqual, false);
  }

  static dealOperation(e) {
    DealData.dealOperation(e);
  }

  static dealNumber(e) {
    DealData.dealNumber(e);
  }

  static dealEqual(e) {
    DealData.dealEqual(e);
  }
}

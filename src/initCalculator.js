import NumberButton from './numberButton.js';

import OperationButton from './operationButton.js';

import EqualButton from './equalButton.js';

export default class InitCalculator {
  constructor() {
    this._numberButton = new NumberButton();
    this._operationButton = new OperationButton();
    this._equalButton = new EqualButton();
  }

  createCalculator() {
    const body = document.getElementsByTagName('body')[0];
    const calculator = document.createElement('div');
    const operationClassName = this._operationButton.className;
    const numberClassName = this._numberButton.className;
    const equalClassName = this._equalButton.className;
    calculator.classList.add('calculator');
    calculator.appendChild(InitCalculator.createScreen('smallScreen', ''));
    calculator.appendChild(InitCalculator.createScreen('bigScreen', 0));
    calculator.appendChild(InitCalculator.createRowDiv([
      [operationClassName, '%'], [operationClassName, 'CE'], [operationClassName, 'C'], [operationClassName, 'DEL']]));
    calculator.appendChild(InitCalculator.createRowDiv([
      [operationClassName, '1/x'], [operationClassName, 'x^2'], [operationClassName, 'sqrX'], [operationClassName, '/']]));
    calculator.appendChild(InitCalculator.createRowDiv([
      [numberClassName, '7'], [numberClassName, '8'], [numberClassName, '9'], [operationClassName, '*']]));
    calculator.appendChild(InitCalculator.createRowDiv([
      [numberClassName, '4'], [numberClassName, '5'], [numberClassName, '6'], [operationClassName, '-']]));
    calculator.appendChild(InitCalculator.createRowDiv([
      [numberClassName, '1'], [numberClassName, '2'], [numberClassName, '3'], [operationClassName, '+']]));
    calculator.appendChild(InitCalculator.createRowDiv([
      [numberClassName, '+/_'], [numberClassName, '0'], [numberClassName, '.'], [equalClassName, '=']]));
    body.appendChild(calculator);
  }

  static createScreen(className, text) {
    const screen = document.createElement('div');
    screen.classList.add(className);
    screen.appendChild(InitCalculator.createScreenText(text));
    return screen;
  }

  static createScreenText(text) {
    const span = document.createElement('span');
    span.innerText = text;
    return span;
  }

  static createRowDiv(classNames) {
    const rowDiv = document.createElement('div');
    for (let i = 0; i < classNames.length; i++) {
      const className = classNames[i][0];
      const text = classNames[i][1];
      const button = document.createElement('div');
      button.classList.add('button');
      button.classList.add(className);
      button.innerText = text;
      rowDiv.appendChild(button);
    }
    return rowDiv;
  }
}

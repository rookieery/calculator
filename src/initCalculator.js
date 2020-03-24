import { NumberButton } from './numberButton.js'
import { OperationButton } from './operationButton.js'
import { EqualButton } from './equalButton.js'
class InitCalculator {
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
    calculator.appendChild(this.createScreen('smallScreen', ''));
    calculator.appendChild(this.createScreen('bigScreen', 0));
    calculator.appendChild(this.createRowDiv([
      [operationClassName, '%'],[operationClassName, 'CE'],[operationClassName, 'C'],[operationClassName, 'DEL']
    ]));
    calculator.appendChild(this.createRowDiv([
      [operationClassName, '1/x'],[operationClassName, 'x^2'],[operationClassName, 'sqrX'],[operationClassName, '/']
    ]));
    calculator.appendChild(this.createRowDiv([
      [numberClassName, '7'],[numberClassName, '8'],[numberClassName, '9'],[operationClassName, '*']
    ]));
    calculator.appendChild(this.createRowDiv([
      [numberClassName, '4'],[numberClassName, '5'],[numberClassName, '6'],[operationClassName, '-']
    ]));
    calculator.appendChild(this.createRowDiv([
      [numberClassName, '1'],[numberClassName, '2'],[numberClassName, '3'],[operationClassName, '+']
    ]));
    calculator.appendChild(this.createRowDiv([
      [numberClassName, '+/_'],[numberClassName, '0'],[numberClassName, '.'],[equalClassName, '=']
    ]));
    body.appendChild(calculator);
  }
  createScreen(className, text) {
    const screen = document.createElement('div');
    screen.classList.add(className);
    screen.appendChild(this.createScreenText(text))
    return screen;
  }
  createScreenText(text) {
    const span = document.createElement('span');
    span.innerText = text;
    return span
  }
  createRowDiv(classNames) {
    const rowDiv = document.createElement('div');
    for (let i = 0; i < classNames.length; i++) {
      const length = classNames[i].length;
      const className = classNames[i][0];
      const text = classNames[i][1];
      for (let j = 0; j < length; j++) {
        const button = document.createElement('div');
        button.classList.add(className);
        button.innerText = text;
        rowDiv.appendChild(button);
      }
    }
    return rowDiv;
  }
}

window.onload = function() {
  let initCalculator = new InitCalculator();
  initCalculator.createCalculator();
}   


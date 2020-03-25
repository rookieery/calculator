import NumberButton from './numberButton.js';

import OperationButton from './operationButton.js';

import EqualButton from './equalButton.js';

export default class InitCalculator {
  static createCalculator() {
    const body = document.getElementsByTagName('body')[0];
    const calculator = document.createElement('div');
    calculator.classList.add('calculator');
    calculator.appendChild(InitCalculator.createScreen('smallScreen', ''));
    calculator.appendChild(InitCalculator.createScreen('bigScreen', 0));
    calculator.appendChild(InitCalculator.appendButtons([new OperationButton('div', '%', '%').createButton(), new OperationButton('div', 'CE', 'CE').createButton(),
      new OperationButton('div', 'C', 'C').createButton(), new OperationButton('div', 'DEL', 'DEL').createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new OperationButton('div', '1/x', '1/x').createButton(), new OperationButton('div', 'x^2', 'x^2').createButton(),
      new OperationButton('div', 'sqrX', 'sqrX').createButton(), new OperationButton('div', '/', '/').createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new NumberButton('div', '7', '7').createButton(), new NumberButton('div', '8', '8').createButton(),
      new NumberButton('div', '9', '9').createButton(), new OperationButton('div', '*', '*').createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new NumberButton('div', '4', '4').createButton(), new NumberButton('div', '5', '5').createButton(),
      new NumberButton('div', '6', '6').createButton(), new OperationButton('div', '-', '-').createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new NumberButton('div', '1', '1').createButton(), new NumberButton('div', '2', '2').createButton(),
      new NumberButton('div', '3', '3').createButton(), new OperationButton('div', '+', '+').createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new NumberButton('div', '+/_', '+/_').createButton(), new NumberButton('div', '0', '0').createButton(),
      new NumberButton('div', '.', '.').createButton(), new EqualButton('div', '=', '=').createButton()]));
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

  static appendButtons(buttons) {
    const rowDiv = document.createElement('div');
    for (let i = 0; i < buttons.length; i++) {
      rowDiv.appendChild(buttons[i]);
    }
    return rowDiv;
  }
}

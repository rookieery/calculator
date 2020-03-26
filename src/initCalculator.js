/* eslint-disable max-len */
import NumberButton from './numberButton.js';

import OperationButton from './operationButton.js';

import EqualButton from './equalButton.js';

import screenTexts from './screenTextSign.js';

export default class InitCalculator {
  static createCalculator() {
    const body = document.getElementsByTagName('body')[0];
    const calculator = document.createElement('div');
    calculator.classList.add('calculator');
    calculator.appendChild(InitCalculator.createScreen('smallScreen', ''));
    calculator.appendChild(InitCalculator.createScreen('bigScreen', 0));
    calculator.appendChild(InitCalculator.appendButtons([
      new OperationButton(screenTexts.percentSign).createButton(), new OperationButton(screenTexts.clearCurrentOperation).createButton(),
      new OperationButton(screenTexts.clearAllOperation).createButton(), new OperationButton(screenTexts.deleteNumber).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new OperationButton(screenTexts.reciprocal).createButton(), new OperationButton(screenTexts.square).createButton(),
      new OperationButton(screenTexts.rootSquare).createButton(), new OperationButton(screenTexts.division).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new NumberButton(screenTexts.seven).createButton(), new NumberButton(screenTexts.eight).createButton(),
      new NumberButton(screenTexts.nine).createButton(), new OperationButton(screenTexts.multiplication).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new NumberButton(screenTexts.four).createButton(), new NumberButton(screenTexts.five).createButton(),
      new NumberButton(screenTexts.six).createButton(), new OperationButton(screenTexts.subtraction).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new NumberButton(screenTexts.one).createButton(), new NumberButton(screenTexts.two).createButton(),
      new NumberButton(screenTexts.three).createButton(), new OperationButton(screenTexts.addition).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new NumberButton(screenTexts.sign).createButton(), new NumberButton(screenTexts.zero).createButton(),
      new NumberButton(screenTexts.decimalPoint).createButton(), new EqualButton(screenTexts.equal).createButton()]));
    body.appendChild(calculator);
  }

  static createScreen(className, text) {
    const screen = document.createElement('div');
    screen.classList.add(className);
    screen.innerText = text;
    return screen;
  }

  static appendButtons(buttons) {
    const rowDiv = document.createElement('div');
    for (let i = 0; i < buttons.length; i++) {
      rowDiv.appendChild(buttons[i]);
    }
    return rowDiv;
  }
}

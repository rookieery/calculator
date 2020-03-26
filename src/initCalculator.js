/* eslint-disable max-len */
import NumberButton from './numberButton.js';

import OperationButton from './operationButton.js';

import EqualButton from './equalButton.js';

import DealData from './dealData.js';

import screenTexts from './screenTextSign.js';

export default class InitCalculator {
  static createCalculator() {
    const body = document.getElementsByTagName('body')[0];
    const calculator = document.createElement('div');
    const dealData = new DealData();
    calculator.classList.add('calculator');
    calculator.appendChild(InitCalculator.createScreen('smallScreen', ''));
    calculator.appendChild(InitCalculator.createScreen('bigScreen', 0));
    calculator.appendChild(InitCalculator.appendButtons([
      new OperationButton(screenTexts.percentSign, dealData).createButton(), new OperationButton(screenTexts.clearCurrentOperation, dealData).createButton(),
      new OperationButton(screenTexts.clearAllOperation, dealData).createButton(), new OperationButton(screenTexts.deleteNumber, dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new OperationButton(screenTexts.reciprocal, dealData).createButton(), new OperationButton(screenTexts.square, dealData).createButton(),
      new OperationButton(screenTexts.rootSquare, dealData).createButton(), new OperationButton(screenTexts.division, dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new NumberButton(screenTexts.seven, dealData).createButton(), new NumberButton(screenTexts.eight, dealData).createButton(),
      new NumberButton(screenTexts.nine, dealData).createButton(), new OperationButton(screenTexts.multiplication, dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new NumberButton(screenTexts.four, dealData).createButton(), new NumberButton(screenTexts.five, dealData).createButton(),
      new NumberButton(screenTexts.six, dealData).createButton(), new OperationButton(screenTexts.subtraction, dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new NumberButton(screenTexts.one, dealData).createButton(), new NumberButton(screenTexts.two, dealData).createButton(),
      new NumberButton(screenTexts.three, dealData).createButton(), new OperationButton(screenTexts.addition, dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([
      new NumberButton(screenTexts.sign, dealData).createButton(), new NumberButton(screenTexts.zero, dealData).createButton(),
      new NumberButton(screenTexts.decimalPoint, dealData).createButton(), new EqualButton(screenTexts.equal, dealData).createButton()]));
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

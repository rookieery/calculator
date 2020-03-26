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
    calculator.appendChild(InitCalculator.appendButtons([new OperationButton(screenTexts[0], dealData).createButton(), new OperationButton(screenTexts[1], dealData).createButton(),
      new OperationButton(screenTexts[2], dealData).createButton(), new OperationButton(screenTexts[3], dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new OperationButton(screenTexts[4], dealData).createButton(), new OperationButton(screenTexts[5], dealData).createButton(),
      new OperationButton(screenTexts[6], dealData).createButton(), new OperationButton(screenTexts[7], dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new NumberButton(screenTexts[8], dealData).createButton(), new NumberButton(screenTexts[9], dealData).createButton(),
      new NumberButton(screenTexts[10], dealData).createButton(), new OperationButton(screenTexts[11], dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new NumberButton(screenTexts[12], dealData).createButton(), new NumberButton(screenTexts[13], dealData).createButton(),
      new NumberButton(screenTexts[14], dealData).createButton(), new OperationButton(screenTexts[15], dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new NumberButton(screenTexts[16], dealData).createButton(), new NumberButton(screenTexts[17], dealData).createButton(),
      new NumberButton(screenTexts[18], dealData).createButton(), new OperationButton(screenTexts[19], dealData).createButton()]));
    calculator.appendChild(InitCalculator.appendButtons([new NumberButton(screenTexts[20], dealData).createButton(), new NumberButton(screenTexts[21], dealData).createButton(),
      new NumberButton(screenTexts[22], dealData).createButton(), new EqualButton(screenTexts[23], dealData).createButton()]));
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

/* eslint-disable max-len */
import screenTexts from '../calculateService/screenTextSign.js';

const numberButtons = document.getElementsByClassName('button numberButton');
const operationButtons = document.getElementsByClassName('button operationButton');

export function removeButtonsEvent() {
  for (let i = 0; i < numberButtons.length; i++) {
    const text = numberButtons[i].innerText;
    if (text === screenTexts.decimalPoint || text === screenTexts.sign) {
      numberButtons[i].classList.add('removeButton');
    }
  }
  for (let i = 0; i < operationButtons.length; i++) {
    const text = operationButtons[i].innerText;
    if (text === screenTexts.addition || text === screenTexts.subtraction || text === screenTexts.multiplication || text === screenTexts.division
      || text === screenTexts.rootSquare || text === screenTexts.square || text === screenTexts.reciprocal || text === screenTexts.percentSign) {
      operationButtons[i].classList.add('removeButton');
    }
  }
}

export function recoverButtonsEvent() {
  for (let i = 0; i < numberButtons.length; i++) {
    const text = numberButtons[i].innerText;
    if (text === screenTexts.decimalPoint || text === screenTexts.sign) {
      numberButtons[i].classList.remove('removeButton');
    }
  }
  for (let i = 0; i < operationButtons.length; i++) {
    const text = operationButtons[i].innerText;
    if (text === screenTexts.addition || text === screenTexts.subtraction || text === screenTexts.multiplication || text === screenTexts.division
      || text === screenTexts.rootSquare || text === screenTexts.square || text === screenTexts.reciprocal || text === screenTexts.percentSign) {
      operationButtons[i].classList.remove('removeButton');
    }
  }
}

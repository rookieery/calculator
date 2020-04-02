/* eslint-disable max-len */
import DisplayData from '../views/displayData.js';

import screenTexts from './screenTextSign.js';

import { removeButtonsEvent, recoverButtonsEvent } from '../buttons/dealButton.js';

let bigScreenData = '0';
let smallScreenData = '';
let lastArithmeticSymbol = '';
let previousOperationType = '';
let previousBigScreenData = '0';// Record the result of the expression before the last four operations
let smallLastScreenData = '';
let equalPreviousData = '';
let isHaveDecimalPoint = false;
let isHaveNegative = false;
let isClearEqual = true;
let isHaveArithmetic = false;
let isRecover = false;
const displayData = new DisplayData();
const previousOperationTypes = {
  singleOperation: 'SingleOperation',
  number: 'Number',
  equal: 'Equal',
  arithmetic: 'Arithmetic',
};
export const getBigScreenStr = () => bigScreenData;
export const getSmallScreenStr = () => smallScreenData;

function resetAll() {
  bigScreenData = '0';
  smallScreenData = '';
  lastArithmeticSymbol = '';
  previousOperationType = previousOperationTypes.number;
  previousBigScreenData = '0';
  smallLastScreenData = '';
  equalPreviousData = '';
  isHaveDecimalPoint = false;
  isHaveNegative = false;
  isClearEqual = true;
  isHaveArithmetic = false;
}

function recover() {
  recoverButtonsEvent();
  resetAll();
}
function ceHandler() {
  bigScreenData = '0';
  if (!isClearEqual) {
    resetAll();
  } else if (isHaveArithmetic && previousOperationType === previousOperationTypes.singleOperation) {
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    smallLastScreenData = '';
    isHaveDecimalPoint = false;
    isHaveNegative = false;
  }
}
function delHandler() {
  if (!isClearEqual) {
    smallScreenData = '';
  } else if (previousOperationType === previousOperationTypes.number) {
    const dataLength = isHaveNegative ? bigScreenData.length - 1 : bigScreenData.length;
    if (dataLength === 1) {
      bigScreenData = '0';
      isHaveNegative = false;
    } else {
      if (bigScreenData[bigScreenData.length - 1] === '.') {
        isHaveDecimalPoint = false;
      }
      bigScreenData = bigScreenData.substring(0, bigScreenData.length - 1);
    }
  }
}
function numberSignHandler() {
  // Change small screen data
  if (previousOperationType === previousOperationTypes.number) {
    if (bigScreenData === '0') {
      return;
    }
    previousOperationType = previousOperationTypes.number;
  } else if (previousOperationType === previousOperationTypes.equal) {
    delHandler();
    smallLastScreenData = `negate(${bigScreenData})`;
    smallScreenData += smallLastScreenData;
    previousOperationType = previousOperationTypes.singleOperation;
  } else if (previousOperationType === previousOperationTypes.arithmetic) {
    smallLastScreenData = `negate(${bigScreenData})`;
    smallScreenData += smallLastScreenData;
    previousOperationType = previousOperationTypes.singleOperation;
  } else {
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    smallLastScreenData = `negate(${smallLastScreenData})`;
    smallScreenData += smallLastScreenData;
    previousOperationType = previousOperationTypes.singleOperation;
  }
  // Change big screen data
  if (isHaveNegative) {
    isHaveNegative = false;
    bigScreenData = bigScreenData.substring(1);
  } else {
    bigScreenData = `-${bigScreenData}`;
    isHaveNegative = true;
  }
}
function decimalPointHandler() {
  if (previousOperationType === previousOperationTypes.number) {
    if (isHaveDecimalPoint) {
      return;
    }
    bigScreenData += '.';
    isHaveDecimalPoint = true;
    return;
  }
  if (!isClearEqual || (isHaveArithmetic && previousOperationType === previousOperationTypes.singleOperation)) {
    ceHandler();
  }
  bigScreenData = '0.';
  isHaveDecimalPoint = true;
}
function numberHandler(text) {
  if (previousOperationType === previousOperationTypes.number) {
    bigScreenData = bigScreenData === '0' ? text : bigScreenData + text;
  } else if (!isClearEqual) {
    delHandler();
    bigScreenData = text;
    previousBigScreenData = bigScreenData;
  } else if (isHaveArithmetic && previousOperationType === previousOperationTypes.singleOperation) {
    ceHandler();
    bigScreenData = text;
  } else {
    bigScreenData = text;
  }
}
function getPointLength(number) {
  return number.length - number.indexOf('.') - 1;
}
function checkResultNumber(result) {
  if (!result.includes('.')) {
    return result;
  }
  let index = result.length - 1;
  while (result[index] === '0') {
    index--;
  }
  return result.substring(0, index + 1);
}
function arithmetic(numOne, sign, numTwo) {
  let countNumOne = 0;
  let countNumTwo = 0;
  let result = 0;
  if (numOne.includes('.')) {
    countNumOne = getPointLength(numOne);
  }
  if (numTwo.includes('.')) {
    countNumTwo = getPointLength(numTwo);
  }
  const index = Math.max(countNumOne, countNumTwo);
  switch (sign) {
    case screenTexts.addition:
      result = (Number(numOne) + Number(numTwo)).toFixed(index);
      return checkResultNumber(result);
    case screenTexts.subtraction:
      result = (Number(numOne) - Number(numTwo)).toFixed(index);
      return checkResultNumber(result);
    case screenTexts.multiplication:
      result = Number((Number(numOne) * Number(numTwo)).toFixed(countNumOne + countNumTwo));
      return Number.isInteger(Number(result)) ? result.toString() : result.toFixed(Math.min(countNumOne + countNumTwo, 10));
    case screenTexts.division:
      if (numTwo === '0' || numTwo === '') {
        throw new Error('Cannot divide by zero');
      }
      result = Number(numOne) / Number(numTwo);
      return Number.isInteger(result) ? result.toString() : result.toFixed(Math.min(getPointLength(result.toString()), 10));
    default:
      return null;
  }
}
function calculate() {
  equalPreviousData = bigScreenData;
  smallLastScreenData = bigScreenData;
  smallScreenData = `${smallScreenData + bigScreenData}=`;
  bigScreenData = arithmetic(previousBigScreenData, lastArithmeticSymbol, bigScreenData);
  previousBigScreenData = bigScreenData;
  isHaveNegative = Number(bigScreenData) < 0;
}
function checkBigData() {
  if (!bigScreenData.includes('.')) {
    return;
  }
  let index = bigScreenData.length - 1;
  while (bigScreenData[index] === '0') {
    index--;
  }
  if (bigScreenData[index] === '.') {
    index--;
  }
  bigScreenData = bigScreenData.substring(0, index + 1);
}

function equalHandler() {
  checkBigData();
  if (!isClearEqual) {
    if (isHaveArithmetic) {
      smallScreenData = `${bigScreenData + lastArithmeticSymbol + equalPreviousData}=`;
      bigScreenData = arithmetic(bigScreenData, lastArithmeticSymbol, equalPreviousData);
      previousBigScreenData = bigScreenData;
      isHaveNegative = Number(bigScreenData) < 0;
    } else {
      smallScreenData = `${bigScreenData}=`;
      previousBigScreenData = bigScreenData;
      smallLastScreenData = bigScreenData;
    }
  } else if (previousOperationType === previousOperationTypes.number) {
    if (isHaveArithmetic) {
      calculate();
    } else {
      smallScreenData = `${bigScreenData}=`;
      previousBigScreenData = bigScreenData;
      smallLastScreenData = bigScreenData;
    }
  } else if (previousOperationType === previousOperationTypes.arithmetic) {
    calculate();
  } else if (previousOperationType === previousOperationTypes.singleOperation) {
    equalPreviousData = bigScreenData;
    smallScreenData = `${smallScreenData}=`;
    bigScreenData = arithmetic(previousBigScreenData, lastArithmeticSymbol, bigScreenData);
    previousBigScreenData = bigScreenData;
    isHaveNegative = Number(bigScreenData) < 0;
  }
}

function ArithmeticHandler(text) {
  checkBigData();
  if (!isClearEqual) {
    delHandler();
    smallScreenData = bigScreenData + text;
    isHaveArithmetic = true;
  } else if (previousOperationType === previousOperationTypes.number) {
    if (isHaveArithmetic) {
      smallLastScreenData = bigScreenData;
      smallScreenData = smallScreenData + bigScreenData + text;
      bigScreenData = arithmetic(previousBigScreenData, lastArithmeticSymbol, bigScreenData);
      isHaveNegative = Number(bigScreenData) < 0;
    } else {
      smallScreenData = bigScreenData + text;
      smallLastScreenData = bigScreenData;
      isHaveArithmetic = true;
    }
    previousBigScreenData = bigScreenData;
  } else if (previousOperationType === previousOperationTypes.arithmetic) {
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - 1) + text;
  } else if (previousOperationType === previousOperationTypes.singleOperation) {
    smallScreenData += text;
    if (isHaveArithmetic) {
      bigScreenData = arithmetic(previousBigScreenData, lastArithmeticSymbol, bigScreenData);
      isHaveNegative = Number(bigScreenData) < 0;
    } else {
      isHaveArithmetic = true;
    }
    previousBigScreenData = bigScreenData;
  }
}
function reciprocalChange(type) {
  if (type === 'equal') {
    smallScreenData = `1/(${bigScreenData})`;
  } else if (type === 'single') {
    smallLastScreenData = `1/(${smallLastScreenData})`;
  } else if (type === 'other') {
    smallLastScreenData = `1/(${bigScreenData})`;
  }
}
function squareChange(type) {
  if (type === 'equal') {
    smallScreenData = `sqr(${bigScreenData})`;
  } else if (type === 'single') {
    smallLastScreenData = `sqr(${smallLastScreenData})`;
  } else if (type === 'other') {
    smallLastScreenData = `sqr(${bigScreenData})`;
  }
}
function rootSquareChange(type) {
  if (type === 'equal') {
    smallScreenData = `rSqr(${bigScreenData})`;
  } else if (type === 'single') {
    smallLastScreenData = `rSqr(${smallLastScreenData})`;
  } else if (type === 'other') {
    smallLastScreenData = `rSqr(${bigScreenData})`;
  }
}
function singleOperation(text, type) {
  let result = 0;
  switch (text) {
    case screenTexts.reciprocal:
      reciprocalChange(type);
      bigScreenData = arithmetic('1', screenTexts.division, bigScreenData);
      break;
    case screenTexts.square:
      squareChange(type);
      bigScreenData = arithmetic(bigScreenData, screenTexts.multiplication, bigScreenData);
      break;
    case screenTexts.rootSquare:
      rootSquareChange(type);
      if (bigScreenData[0] === '-') {
        throw new Error('Invalid input');
      }
      result = Number(bigScreenData) ** 0.5;
      bigScreenData = Number.isInteger(result) ? result.toString() : result.toFixed(Math.min(getPointLength(result.toString()), 10));
      break;
    default:
      break;
  }
}
function singleOperationHandler(text) {
  if (previousOperationType === previousOperationTypes.equal) {
    singleOperation(text, 'equal');
    smallLastScreenData = smallScreenData;
  } else if (previousOperationType === previousOperationTypes.singleOperation) {
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    singleOperation(text, 'single');
    smallScreenData += smallLastScreenData;
  } else {
    singleOperation(text, 'other');
    smallScreenData += smallLastScreenData;
  }
  isHaveNegative = Number(bigScreenData) < 0;
}
function percentSign() {
  if (lastArithmeticSymbol === '+' || lastArithmeticSymbol === '-') {
    bigScreenData = (Number(previousBigScreenData) * Number(bigScreenData) * 0.01).toString();
  } else {
    bigScreenData = (Number(bigScreenData) * 0.01).toString();
  }
}
function percentSignHandler() {
  if (!isHaveArithmetic) {
    resetAll();
    smallScreenData = '0';
    smallLastScreenData = '0';
  } else if (!isClearEqual) {
    percentSign();
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    smallLastScreenData = bigScreenData;
    smallScreenData = bigScreenData;
  } else if (previousOperationType === previousOperationTypes.singleOperation) {
    percentSign();
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    smallLastScreenData = bigScreenData;
    smallScreenData += bigScreenData;
  } else {
    percentSign();
    smallLastScreenData = bigScreenData;
    smallScreenData += bigScreenData;
  }
}
function checkNumberOverFlow() {
  let index = 0;
  while (index < bigScreenData.length && (bigScreenData[index] === '0' || bigScreenData[index] === '.' || bigScreenData[index] === '-')) {
    index++;
  }
  if (index === bigScreenData.length - 1 && (index === 11 || index === 12)) {
    return true;
  }
  if (index === bigScreenData.length && index > 3) {
    return true;
  }
  if (bigScreenData.length >= 13) {
    return true;
  }
  return false;
}
function overflowHandler() {
  removeButtonsEvent();
  bigScreenData = 'Overflow';
  isRecover = true;
}
function divisionZeroHandler() {
  removeButtonsEvent();
  bigScreenData = '除数不能为0';
  isRecover = true;
}
function invalidHandler() {
  removeButtonsEvent();
  bigScreenData = 'Invalid input';
  isRecover = true;
}
function display() {
  displayData.showBigScreen(bigScreenData);
  displayData.showSmallScreen(smallScreenData);
}
export function dealOperation(text) {
  if (isRecover) {
    recover();
    isRecover = false;
  }
  if (text === screenTexts.clearAllOperation) {
    resetAll();
  } else if (text === screenTexts.clearCurrentOperation) {
    ceHandler();
    previousOperationType = previousOperationTypes.number;
  } else if (text === screenTexts.deleteNumber) {
    delHandler();
  } else if (text === screenTexts.addition || text === screenTexts.subtraction || text === screenTexts.multiplication || text === screenTexts.division) {
    try {
      ArithmeticHandler(text);
    } catch (e) {
      divisionZeroHandler();
      display();
      return;
    }
    lastArithmeticSymbol = text;
    isClearEqual = true;
    isHaveDecimalPoint = false;
    previousOperationType = previousOperationTypes.arithmetic;
  } else if (text === screenTexts.percentSign) {
    percentSignHandler();
    previousOperationType = previousOperationTypes.singleOperation;
  } else if (text === screenTexts.rootSquare || text === screenTexts.square || text === screenTexts.reciprocal) {
    try {
      singleOperationHandler(text);
    } catch (e) {
      if (e.message === 'Invalid input') {
        invalidHandler();
      } else if (e.message === 'Cannot divide by zero') {
        divisionZeroHandler();
      }
      display();
      return;
    }
    previousOperationType = previousOperationTypes.singleOperation;
  }
  if (checkNumberOverFlow()) {
    overflowHandler();
  }
  display();
}

export function dealNumber(text) {
  if (isRecover) {
    recover();
    isRecover = false;
  }
  if (bigScreenData.length === 11 && previousOperationType === previousOperationTypes.number) {
    return;
  }
  if (text === screenTexts.sign) {
    numberSignHandler();
  } else if (text === screenTexts.decimalPoint) {
    decimalPointHandler();
    previousOperationType = previousOperationTypes.number;
  } else {
    numberHandler(text);
    previousOperationType = previousOperationTypes.number;
  }
  display();
}

export function dealEqual() {
  if (isRecover) {
    recover();
    isRecover = false;
    display();
    return;
  }
  try {
    equalHandler();
  } catch (e) {
    divisionZeroHandler();
    display();
    return;
  }
  isClearEqual = false;
  previousOperationType = previousOperationTypes.equal;
  if (checkNumberOverFlow()) {
    overflowHandler();
  }
  display();
}

/* eslint-disable max-len */
import DisplayData from '../views/displayData.js';

import screenTexts from './screenTextSign.js';

import { removeButtonsEvent, recoverButtonsEvent } from '../buttons/dealButton.js';

let bigScreenData = '0';
let smallScreenData = '';
let lastArithmeticSymbol = ''; // 最后一个四则运算的符号（小屏幕）
let previousOperationType = ''; // 上一次操作类型
let previousBigScreenData = '0';// 上一次大屏幕更新数据（大屏幕）
let smallLastScreenData = ''; // 小屏幕最后一个数据（小屏幕）
let equalPreviousData = ''; // =前的操作数（小屏幕）(四则运算激活时才会改变)(连等的时候使用)
let isHaveDecimalPoint = false; // 大屏幕是否含有小数点（大屏幕）（手动添加小数点才会变成true）
let isHaveNegative = false; // 大屏幕是否含有负号（大屏幕）
let isClearEqual = true; // =是否被清除（小屏幕）
let isHaveArithmetic = false; // 小屏幕是否含有四则运算（小屏幕）
let isRecover = false;
const displayData = new DisplayData();

export const getBigScreenStr = () => bigScreenData;
export const getSmallScreenStr = () => smallScreenData;

function resetAll() {
  bigScreenData = '0';
  smallScreenData = '';
  lastArithmeticSymbol = '';
  previousOperationType = 'Number';
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
  } else if (isHaveArithmetic && previousOperationType === 'SingleOperation') {
    // 回到前一步操作
    // 改回上一步单点操作改动的属性 TODO
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    smallLastScreenData = ''; // 保留
    isHaveDecimalPoint = false;
    isHaveNegative = false;
  }
}
function delHandler() {
  if (!isClearEqual) {
    smallScreenData = '';
  } else if (previousOperationType === 'Number') {
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
  // 改变小屏幕数据
  if (previousOperationType === 'Number') {
    if (bigScreenData === '0') {
      return;
    }
    previousOperationType = 'Number';
  } else if (previousOperationType === 'Equal') {
    delHandler();
    smallLastScreenData = `negate(${bigScreenData})`;
    smallScreenData += smallLastScreenData;
    previousOperationType = 'SingleOperation';
  } else if (smallScreenData[smallScreenData.length - 1] === lastArithmeticSymbol) {
    smallLastScreenData = `negate(${bigScreenData})`;
    smallScreenData += smallLastScreenData;
    previousOperationType = 'SingleOperation';
  } else {
    // 默认是替换所有，但是由于下一步直接替换掉了，所有野就是最后一个
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    smallLastScreenData = `negate(${smallLastScreenData})`;
    smallScreenData += smallLastScreenData;
    previousOperationType = 'SingleOperation';
  }
  // 改变大屏幕数据
  if (isHaveNegative) {
    isHaveNegative = false;
    bigScreenData = bigScreenData.substring(1);
  } else {
    bigScreenData = `-${bigScreenData}`;
    isHaveNegative = true;
  }
}
function decimalPointHandler() {
  if (previousOperationType === 'Number') {
    if (isHaveDecimalPoint) {
      return;
    }
    bigScreenData += '.';
    isHaveDecimalPoint = true;
    return;
  }
  if (!isClearEqual || (isHaveArithmetic && previousOperationType === 'SingleOperation')) {
    // 相当于CE.
    ceHandler();
  }
  bigScreenData = '0.';
  isHaveDecimalPoint = true;
}
function numberHandler(text) {
  if (previousOperationType === 'Number') {
    bigScreenData = bigScreenData === '0' ? text : bigScreenData + text;
  } else if (!isClearEqual) {
    delHandler();
    bigScreenData = text;
    previousBigScreenData = bigScreenData;
  } else if (isHaveArithmetic && previousOperationType === 'SingleOperation') {
    ceHandler();
    bigScreenData = text;
  } else {
    bigScreenData = text;
  }
}
function checkNumber(number) {
  let count = 0;
  while (number[number.length - count - 1] !== '.') {
    count++;
  }
  return count;
}
function arithmetic(numOne, sign, numTwo) {
  let countNumOne = 0;
  let countNumTwo = 0;
  let result = 0;
  if (numOne.includes('.')) {
    countNumOne = checkNumber(numOne);
  }
  if (numTwo.includes('.')) {
    countNumTwo = checkNumber(numTwo);
  }
  const index = Math.max(countNumOne, countNumTwo);
  switch (sign) {
    case screenTexts.addition:
      return (Number(numOne) + Number(numTwo)).toFixed(index);
    case screenTexts.subtraction:
      return (Number(numOne) - Number(numTwo)).toFixed(index);
    case screenTexts.multiplication:
      result = Number((Number(numOne) * Number(numTwo)).toFixed(countNumOne + countNumTwo));
      return Number.isInteger(Number(result)) ? result.toString() : result.toFixed(Math.min(countNumOne + countNumTwo, 10));
    case screenTexts.division:
      if (numTwo === '0' || numTwo === '') {
        throw new Error('Cannot divide by zero');
      }
      result = Number(numOne) / Number(numTwo);
      return Number.isInteger(result) ? result.toString() : result.toFixed(Math.min(checkNumber(result.toString()), 10));
    default:
      return null;
  }
}
function calculate() {
  equalPreviousData = bigScreenData;
  smallLastScreenData = bigScreenData;
  smallScreenData = `${smallScreenData + bigScreenData}=`;
  bigScreenData = arithmetic(previousBigScreenData, lastArithmeticSymbol, bigScreenData).toString();
  previousBigScreenData = bigScreenData;
  isHaveNegative = !(Number(bigScreenData) > 0);
}
function checkBigData() {
  let index = bigScreenData.length - 1;
  while (bigScreenData[index] === '0') {
    index--;
  }
  if (bigScreenData[index] === '.') {
    index--;
  }
  bigScreenData = bigScreenData.substring(0, index + 1);
}
// 回头再抽取一下
function equalHandler() {
  checkBigData();
  if (!isClearEqual) {
    if (isHaveArithmetic) {
      smallScreenData = `${bigScreenData + lastArithmeticSymbol + equalPreviousData}=`;
      bigScreenData = arithmetic(bigScreenData, lastArithmeticSymbol, equalPreviousData).toString();
      previousBigScreenData = bigScreenData;
      isHaveNegative = !(Number(bigScreenData) > 0);
    } else {
      smallScreenData = `${bigScreenData}=`;
      previousBigScreenData = bigScreenData;
      smallLastScreenData = bigScreenData;
    }
  } else if (previousOperationType === 'Number') {
    if (isHaveArithmetic) {
      calculate();
    } else {
      smallScreenData = `${bigScreenData}=`;
      previousBigScreenData = bigScreenData;
      smallLastScreenData = bigScreenData;
    }
  } else if (previousOperationType === 'Arithmetic') {
    calculate();
  } else if (previousOperationType === 'SingleOperation') {
    equalPreviousData = bigScreenData;
    smallScreenData = `${smallScreenData}=`;
    bigScreenData = arithmetic(previousBigScreenData, lastArithmeticSymbol, bigScreenData).toString();
    previousBigScreenData = bigScreenData;
    isHaveNegative = !(Number(bigScreenData) > 0);
  }
}
// 回头再抽取一下
function ArithmeticHandler(text) {
  checkBigData();
  if (!isClearEqual) {
    delHandler();
    smallScreenData = bigScreenData + text;
    isHaveArithmetic = true;
  } else if (previousOperationType === 'Number') {
    if (isHaveArithmetic) {
      smallLastScreenData = bigScreenData;
      smallScreenData = smallScreenData + bigScreenData + text;
      bigScreenData = arithmetic(previousBigScreenData, lastArithmeticSymbol, bigScreenData).toString();
      isHaveNegative = !(Number(bigScreenData) > 0);
    } else {
      smallScreenData = bigScreenData + text;
      smallLastScreenData = bigScreenData;
      isHaveArithmetic = true;
    }
    previousBigScreenData = bigScreenData;
  } else if (previousOperationType === 'Arithmetic') {
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - 1) + text;
  } else if (previousOperationType === 'SingleOperation') {
    if (isHaveArithmetic) {
      smallScreenData += text;
      bigScreenData = arithmetic(previousBigScreenData, lastArithmeticSymbol, bigScreenData).toString();
      isHaveNegative = !(Number(bigScreenData) > 0);
    } else {
      //
      smallScreenData += text;
      isHaveArithmetic = true;
    }
    previousBigScreenData = bigScreenData;
  }
}
function SingleOperationOne(text) {
  let result = 0;
  switch (text) {
    case screenTexts.reciprocal:
      smallScreenData = `1/(${bigScreenData})`;
      bigScreenData = arithmetic('1', screenTexts.division, bigScreenData);
      break;
    case screenTexts.square:
      smallScreenData = `sqr(${bigScreenData})`;
      bigScreenData = arithmetic(bigScreenData, screenTexts.multiplication, bigScreenData);
      break;
    case screenTexts.rootSquare:
      smallScreenData = `rSqr(${bigScreenData})`;
      if (bigScreenData[0] === '-') {
        throw new Error('Invalid input');
      }
      result = Number(bigScreenData) ** 0.5;
      bigScreenData = Number.isInteger(result) ? result.toString() : result.toFixed(Math.min(checkNumber(result.toString()), 10));
      break;
    default:
      break;
  }
}
function SingleOperationTwo(text) {
  let result = 0;
  switch (text) {
    case screenTexts.reciprocal:
      smallLastScreenData = `1/(${smallLastScreenData})`;
      bigScreenData = arithmetic('1', screenTexts.division, bigScreenData);
      break;
    case screenTexts.square:
      smallLastScreenData = `sqr(${smallLastScreenData})`;
      bigScreenData = arithmetic(bigScreenData, screenTexts.multiplication, bigScreenData);
      break;
    case screenTexts.rootSquare:
      smallLastScreenData = `rSqr(${smallLastScreenData})`;
      if (bigScreenData[0] === '-') {
        throw new Error('Invalid input');
      }
      result = Number(bigScreenData) ** 0.5;
      bigScreenData = Number.isInteger(result) ? result.toString() : result.toFixed(Math.min(checkNumber(result.toString()), 10));
      break;
    default:
      break;
  }
}
function SingleOperationThree(text) {
  let result = 0;
  switch (text) {
    case screenTexts.reciprocal:
      smallLastScreenData = `1/(${bigScreenData})`;
      bigScreenData = arithmetic('1', screenTexts.division, bigScreenData);
      break;
    case screenTexts.square:
      smallLastScreenData = `sqr(${bigScreenData})`;
      bigScreenData = arithmetic(bigScreenData, screenTexts.multiplication, bigScreenData);
      break;
    case screenTexts.rootSquare:
      smallLastScreenData = `rSqr(${bigScreenData})`;
      if (bigScreenData[0] === '-') {
        throw new Error('Invalid input');
      }
      result = Number(bigScreenData) ** 0.5;
      bigScreenData = Number.isInteger(result) ? result.toString() : result.toFixed(Math.min(checkNumber(result.toString()), 10));
      break;
    default:
      break;
  }
}
function SingleOperationHandler(text) {
  if (previousOperationType === 'Equal') {
    SingleOperationOne(text);
    smallLastScreenData = smallScreenData;
  } else if (previousOperationType === 'SingleOperation') {
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    SingleOperationTwo(text);
    smallScreenData += smallLastScreenData;
  } else {
    SingleOperationThree(text);
    smallScreenData += smallLastScreenData;
  }
  isHaveNegative = !(Number(bigScreenData) > 0);
}
function percentSignHandler() {
  if (!isHaveArithmetic) {
    resetAll();
    smallScreenData = '0';
    smallLastScreenData = '0';
  } else if (!isClearEqual) {
    if (lastArithmeticSymbol === '+' || lastArithmeticSymbol === '-') {
      bigScreenData = (Number(previousBigScreenData) * Number(bigScreenData) * 0.01).toString();
    } else {
      bigScreenData = (Number(bigScreenData) * 0.01).toString();
    }
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    smallLastScreenData = bigScreenData;
    smallScreenData = bigScreenData;
  } else if (previousOperationType === 'SingleOperation') {
    if (lastArithmeticSymbol === '+' || lastArithmeticSymbol === '-') {
      bigScreenData = (Number(previousBigScreenData) * Number(bigScreenData) * 0.01).toString();
    } else {
      bigScreenData = (Number(bigScreenData) * 0.01).toString();
    }
    smallScreenData = smallScreenData.substring(0, smallScreenData.length - smallLastScreenData.length);
    smallLastScreenData = bigScreenData;
    smallScreenData += bigScreenData;
  } else {
    if (lastArithmeticSymbol === '+' || lastArithmeticSymbol === '-') {
      bigScreenData = (Number(previousBigScreenData) * Number(bigScreenData) * 0.01).toString();
    } else {
      bigScreenData = (Number(bigScreenData) * 0.01).toString();
    }
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
export function dealOperation(text) {
  if (isRecover) {
    recover();
    isRecover = false;
  }
  if (text === screenTexts.clearAllOperation) {
    resetAll();
  } else if (text === screenTexts.clearCurrentOperation) {
    ceHandler();
    previousOperationType = 'Number';
  } else if (text === screenTexts.deleteNumber) {
    // previousOperationType 全部不改变
    delHandler();
  } else if (text === screenTexts.addition || text === screenTexts.subtraction || text === screenTexts.multiplication || text === screenTexts.division) {
    try {
      ArithmeticHandler(text);
    } catch (e) {
      divisionZeroHandler();
      displayData.showBigScreen(bigScreenData);
      displayData.showSmallScreen(smallScreenData);
      return;
    }
    lastArithmeticSymbol = text;
    isClearEqual = true;
    isHaveDecimalPoint = false;
    previousOperationType = 'Arithmetic';
  } else if (text === screenTexts.percentSign) {
    percentSignHandler();
    previousOperationType = 'SingleOperation';
  } else if (text === screenTexts.rootSquare || text === screenTexts.square || text === screenTexts.reciprocal) {
    try {
      SingleOperationHandler(text);
    } catch (e) {
      if (e.message === 'Invalid input') {
        invalidHandler();
      } else if (e.message === 'Cannot divide by zero') {
        divisionZeroHandler();
      }
      displayData.showBigScreen(bigScreenData);
      displayData.showSmallScreen(smallScreenData);
      return;
    }
    previousOperationType = 'SingleOperation';
  }
  if (checkNumberOverFlow()) {
    overflowHandler();
  }
  displayData.showBigScreen(bigScreenData);
  displayData.showSmallScreen(smallScreenData);
}

export function dealNumber(text) {
  if (isRecover) {
    recover();
    isRecover = false;
  }
  if (bigScreenData.length === 11 && previousOperationType === 'Number') {
    return;
  }
  if (text === screenTexts.sign) {
    numberSignHandler();
  } else if (text === screenTexts.decimalPoint) {
    decimalPointHandler();
    previousOperationType = 'Number';
  } else {
    numberHandler(text);
    previousOperationType = 'Number';
  }
  displayData.showBigScreen(bigScreenData);
  displayData.showSmallScreen(smallScreenData);
}

export function dealEqual() {
  if (isRecover) {
    recover();
    isRecover = false;
    displayData.showBigScreen(bigScreenData);
    displayData.showSmallScreen(smallScreenData);
    return;
  }
  try {
    equalHandler();
  } catch (e) {
    divisionZeroHandler();
    displayData.showBigScreen(bigScreenData);
    displayData.showSmallScreen(smallScreenData);
    return;
  }
  isClearEqual = false;
  previousOperationType = 'Equal';
  if (checkNumberOverFlow()) {
    overflowHandler();
  }
  displayData.showBigScreen(bigScreenData);
  displayData.showSmallScreen(smallScreenData);
}

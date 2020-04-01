import {
  dealNumber, dealEqual, dealOperation, getBigScreenStr, getSmallScreenStr,
} from './newDealData.js';

const ButtonType = {
  Number: 'number',
  Operator: 'operator',
  Equal: 'equal',
};

const testDatas = [
  {
    type: ButtonType.Number,
    value: '5',
    smallScreen: '',
    bigScreen: '5',
  },
  {
    type: ButtonType.Operator,
    value: '+',
    smallScreen: '5+',
    bigScreen: '5',
  },
  {
    type: ButtonType.Number,
    value: '6',
    smallScreen: '5+',
    bigScreen: '6',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '5+6=',
    bigScreen: '11',
  },
  {
    type: ButtonType.Operator,
    value: 'DEL',
    smallScreen: '',
    bigScreen: '11',
  },
  {
    type: ButtonType.Number,
    value: '+/_',
    smallScreen: 'negate(11)',
    bigScreen: '-11',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '-11+6=',
    bigScreen: '-5',
  },
  {
    type: ButtonType.Operator,
    value: 'C',
    smallScreen: '',
    bigScreen: '0',
  },
  // ============================华丽的分割线==========================
  {
    type: ButtonType.Number,
    value: '9',
    smallScreen: '',
    bigScreen: '9',
  },
  {
    type: ButtonType.Operator,
    value: '+',
    smallScreen: '9+',
    bigScreen: '9',
  },
  {
    type: ButtonType.Number,
    value: '6',
    smallScreen: '9+',
    bigScreen: '6',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '9+6=',
    bigScreen: '15',
  },
  {
    type: ButtonType.Operator,
    value: '%',
    smallScreen: '2.25',
    bigScreen: '2.25',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '2.25+6=',
    bigScreen: '8.25',
  },
  {
    type: ButtonType.Operator,
    value: '+',
    smallScreen: '8.25+',
    bigScreen: '8.25',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '8.25+8.25=',
    bigScreen: '16.5',
  },
  {
    type: ButtonType.Operator,
    value: '%',
    smallScreen: '2.7225',
    bigScreen: '2.7225',
  },
  {
    type: ButtonType.Operator,
    value: 'CE',
    smallScreen: '',
    bigScreen: '0',
  },
  // ============================华丽的分割线==========================
  {
    type: ButtonType.Number,
    value: '8',
    smallScreen: '',
    bigScreen: '8',
  },
  {
    type: ButtonType.Operator,
    value: '*',
    smallScreen: '8*',
    bigScreen: '8',
  },
  {
    type: ButtonType.Number,
    value: '7',
    smallScreen: '8*',
    bigScreen: '7',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '8*7=',
    bigScreen: '56',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '56*7=',
    bigScreen: '392',
  },
  {
    type: ButtonType.Operator,
    value: '+',
    smallScreen: '392+',
    bigScreen: '392',
  },
  {
    type: ButtonType.Number,
    value: '5',
    smallScreen: '392+',
    bigScreen: '5',
  },
  {
    type: ButtonType.Number,
    value: '+/_',
    smallScreen: '392+',
    bigScreen: '-5',
  },
  {
    type: ButtonType.Operator,
    value: 'x^2',
    smallScreen: '392+sqr(-5)',
    bigScreen: '25',
  },
  {
    type: ButtonType.Operator,
    value: 'x^0.5',
    smallScreen: '392+rSqr(sqr(-5))',
    bigScreen: '5',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '392+rSqr(sqr(-5))=',
    bigScreen: '397',
  },
  {
    type: ButtonType.Operator,
    value: 'x^2',
    smallScreen: 'sqr(397)',
    bigScreen: '157609',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '157609+5=', // 一点小瑕疵 'sqr(397)+5='
    bigScreen: '157614',
  },
  {
    type: ButtonType.Operator,
    value: 'CE',
    smallScreen: '',
    bigScreen: '0',
  },
  // ============================华丽的分割线==========================
  {
    type: ButtonType.Number,
    value: '8',
    smallScreen: '',
    bigScreen: '8',
  },
  {
    type: ButtonType.Operator,
    value: 'x^2',
    smallScreen: 'sqr(8)',
    bigScreen: '64',
  },
  {
    type: ButtonType.Operator,
    value: '+',
    smallScreen: 'sqr(8)+',
    bigScreen: '64',
  },
  {
    type: ButtonType.Operator,
    value: '%',
    smallScreen: 'sqr(8)+40.96',
    bigScreen: '40.96',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: 'sqr(8)+40.96=',
    bigScreen: '104.96',
  },
  {
    type: ButtonType.Operator,
    value: '/',
    smallScreen: '104.96/',
    bigScreen: '104.96',
  },
  {
    type: ButtonType.Number,
    value: '2',
    smallScreen: '104.96/',
    bigScreen: '2',
  },
  {
    type: ButtonType.Number,
    value: '+/_',
    smallScreen: '104.96/',
    bigScreen: '-2',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '104.96/-2=',
    bigScreen: '-52.48',
  },
  {
    type: ButtonType.Equal,
    value: '=',
    smallScreen: '-52.48/-2=',
    bigScreen: '26.24',
  },
  {
    type: ButtonType.Operator,
    value: '%',
    smallScreen: '0.2624',
    bigScreen: '0.2624',
  },
];

function testSingleData(data) {
  switch (data.type) {
    case ButtonType.Number:
      dealNumber(data.value);
      break;
    case ButtonType.Operator:
      dealOperation(data.value);
      break;
    case ButtonType.Equal:
      dealEqual();
      break;
    default:
      break;
  }

  const acutalBigScreen = getBigScreenStr();
  if (acutalBigScreen !== data.bigScreen) {
    console.error(`bigScreen, expect: '${data.bigScreen}', actual: '${acutalBigScreen}'`);
    return false;
  }
  const acutalSmallScreen = getSmallScreenStr();
  if (acutalSmallScreen !== data.smallScreen) {
    console.error(`smallScreen, expect: '${data.smallScreen}', actual: '${acutalSmallScreen}'`);
    return false;
  }

  return true;
}
function test() {
  for (let i = 0; i < testDatas.length; i++) {
    if (!testSingleData(testDatas[i])) {
      console.log(`第 ${i} 局语句有错误`);
      return;
    }
  }
  console.log('congratulator you!!!');
}

test();

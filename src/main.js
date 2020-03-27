import InitCalculator from './calculateService/initCalculator.js';

class Main {
  static start() {
    InitCalculator.createCalculator();
  }
}

window.onload = function () {
  Main.start();
};

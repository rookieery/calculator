import InitCalculator from './initCalculator.js';

import AddEvent from './addEvent.js';

class Main {
  static start() {
    InitCalculator.createCalculator();
  }
}

window.onload = function () {
  Main.start();
};

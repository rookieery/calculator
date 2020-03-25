import InitCalculator from './initCalculator.js';

import AddEvent from './addEvent.js';

class Main {
  constructor() {
    this._initCalculator = new InitCalculator();
    this._addEvent = new AddEvent();
  }

  start() {
    this._initCalculator.createCalculator();
    this._addEvent.start();
  }
}

window.onload = function () {
  const main = new Main();
  main.start();
};

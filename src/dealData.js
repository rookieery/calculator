export default class DealData {
  constructor() {
    this._data = '';
  }

  dealOperation(e) {
    console.log(e.target.innerText);
  }

  dealNumber(e) {
    console.log(e.target.innerText);
  }

  dealEqual(e) {
    console.log(e.target.innerText);
  }
}

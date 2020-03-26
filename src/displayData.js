export default class DisplayData {
  constructor() {
    this._bigScreen = document.getElementsByClassName('bigScreen');
    this._smallScreen = document.getElementsByClassName('smallScreen');
  }

  showBigScreen(data) {
    this._bigScreen[0].innerText = data;
  }

  showSmallScreen(data) {
    this._smallScreen[0].innerText = data;
  }
}

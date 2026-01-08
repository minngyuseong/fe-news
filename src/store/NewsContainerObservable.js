import Observable from "./Observable.js";
export class NewsContainerObservable extends Observable {
  constructor({ pressMode, viewMode, pageIdx }) {
    super();
    this.pressMode = pressMode;
    this.viewMode = viewMode;
    this.pageIdx = pageIdx;
  }

  setPressMode(mode) {
    this.pressMode = mode;
    this.notify({
      pressMode: this.pressMode,
      viewMode: this.viewMode,
    });
  }

  setViewMode(mode) {
    this.viewMode = mode;
    this.notify({
      pressMode: this.pressMode,
      viewMode: this.viewMode,
    });
  }
}

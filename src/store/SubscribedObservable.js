import Observable from "./Observable.js";
export class SubscribedObservable extends Observable {
  constructor({ pressIds = [] }) {
    super();
    this.pressIds = pressIds;
  }

  addPressId(id) {
    this.pressIds = [...this.pressIds, id];
    this.notify(this.pressIds); // Observer들에게 업데이트된 pressIds 전달
  }

  removePressId(id) {
    this.pressIds = this.pressIds.filter((subId) => subId !== id);
    this.notify(this.pressIds); // Observer들에게 업데이트된 pressIds 전달
  }
}

// src/components/GridTab.js
export default class GridTab {
  constructor(subscribedCount = 8) {
    this.subscribedCount = subscribedCount;
    this.selectedTab = "all"; // 'all' or 'subscribed'
  }

  handleTabClick(tab) {
    this.selectedTab = tab;
    // 이벤트 발생시켜서 부모에게 알림
    const event = new CustomEvent("tabChange", {
      detail: { tab },
    });
    document.dispatchEvent(event);
  }

  render() {
    return `
      <nav class="grid-tab">
        <button 
          class="grid-tab-item ${
            this.selectedTab === "all"
              ? "selected-bold16 selected"
              : "available-medium16 available"
          }"
          data-tab="all"
        >
          전체 언론사
        </button>
        <button 
          class="grid-tab-item ${
            this.selectedTab === "subscribed"
              ? "selected-bold16 selected"
              : "available-medium16 available"
          }"
          data-tab="subscribed"
        >
          내가 구독한 언론사 <span class="badge">${this.subscribedCount}</span>
        </button>
      </nav>
    `;
  }

  attachEventListeners() {
    const buttons = document.querySelectorAll(".grid-tab-item");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const tab = button.getAttribute("data-tab");
        this.handleTabClick(tab);
      });
    });
  }
}

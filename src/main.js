// src/main.js
import Header from "./components/Header.js";
import RollingNews from "./components/RollingNews.js";
import GridTab from "./components/GridTab.js";
import NewsGrid from "./components/NewsGrid.js";

class App {
  constructor() {
    this.app = document.getElementById("app");

    // 컴포넌트 초기화
    this.header = new Header();
    this.rollingNews = new RollingNews();
    this.gridTab = new GridTab(8);

    // 뉴스 데이터 (임시)
    this.allNewsItems = Array(24)
      .fill(null)
      .map((_, i) => ({
        name: "서울경제",
        logo: "...",
      }));

    this.newsGrid = new NewsGrid(this.allNewsItems);

    this.render();
    this.attachEventListeners();
  }

  render() {
    const template = `
      ${this.header.render()}
      ${this.rollingNews.render()}
      <main>
        <section class="grid-group">
          <div></div>
          ${this.gridTab.render()}
          <div></div>
          <div></div>
          ${this.newsGrid.render()}
          <div></div>
        </section>
      </main>
    `;

    this.app.innerHTML = template;
  }

  attachEventListeners() {
    this.gridTab.attachEventListeners();

    // 탭 변경 이벤트 리스닝
    document.addEventListener("tabChange", (e) => {
      const { tab } = e.detail;
      console.log(`Tab changed to: ${tab}`);
      // 여기서 뉴스 필터링 로직 추가 가능
      this.render();
    });
  }
}

// 앱 초기화
new App();

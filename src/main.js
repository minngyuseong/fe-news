// src/main.js
import { Header } from "./components/Header.js";
import { RollingNews } from "./components/RollingNews.js";
import { NewsContainer } from "./components/NewsContainer.js";
import { NEWS_LISTS, PRESS_LIST } from "./dummy.js";
import { Store } from "./store/Store.js";

// 앱 상태
// const state = {
//   isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
// };

const appStore = new Store({
  subscribedPressIds: [],
  pressModeTab: "all",
  isListView: false,
});

// 렌더링
const render = () => {
  const app = document.getElementById("app");

  const header = Header({ title: "뉴스스탠드" });
  const rollingNews = RollingNews({
    newsLists: NEWS_LISTS,
  });
  const newsContainer = NewsContainer({ pressList: PRESS_LIST });

  const template = `
    ${header}
    ${rollingNews}
    ${newsContainer}
  `;

  app.innerHTML = template;
};

// 다크모드 변경 감지
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    state.isDarkMode = e.matches;
    render();
  });

// 앱 초기화
render();

// 전체 탭 클릭 이벤트 처리
document.getElementById("app").addEventListener("click", (e) => {
  const target = e.target.closest("[data-tab]");
  if (!target) return;

  const { tab, group } = target.dataset;

  if (group === "press-mode") {
    appStore.setState({ pressModeTab: tab });
  }
  // else if (group === "category") {
  //   appStore.setState({ currentCategory: tab });
  // }
});

// 상태 변경 구독 및 UI 업데이트
appStore.subscribe((state) => {
  const tabs = document.querySelectorAll("[data-tab]");

  tabs.forEach((tab) => {
    const { tab: tabName, group } = tab.dataset;
    const isActive = group === "press-mode" && tabName === state.pressModeTab;
    // || (group === "view-mode" && tabName === state.viewModeTab);

    // 여러 클래스를 한꺼번에 제어
    tab.classList.toggle("text-strong", isActive);
    tab.classList.toggle("selected-bold16", isActive);
    tab.classList.toggle("text-weak", !isActive);
    tab.classList.toggle("available-medium16", !isActive);
  });
});

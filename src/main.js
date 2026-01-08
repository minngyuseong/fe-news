import { Header } from "./components/Header.js";
import { RollingNews } from "./components/RollingNews.js";
import { NewsContainer } from "./components/NewsContainer.js";
import { NEWS_LISTS, SUBSCRIBED_PRESS_IDS } from "./dummy.js";
import { PRESS_MODE_TABS, VIEW_MODE_TABS } from "./constants.js";
import {
  updateSubscribedPressCount,
  updateSubscribedPressCards,
} from "./subscribers/subscribedSubscriber.js";
import { createNewsContainerSubscribers } from "./subscribers/newsContainerSubscriber.js";
import { SubscribedObservable } from "./store/SubscribedObservable.js";
import { NewsContainerObservable } from "./store/NewsContainerObservable.js";
import { setupEventListeners } from "./events/appClickHandler.js";

// 렌더링
const render = () => {
  const app = document.getElementById("app");
  const header = Header({ title: "뉴스스탠드" });
  const rollingNews = RollingNews({
    newsLists: NEWS_LISTS,
  });
  const newsContainer = NewsContainer();

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
const subscribedObservable = new SubscribedObservable({
  pressIds: SUBSCRIBED_PRESS_IDS,
});
const newsContainerObservable = new NewsContainerObservable({
  pressMode: PRESS_MODE_TABS[0],
  viewMode: VIEW_MODE_TABS[1],
  pageIdx: 0,
});

// newsContainer subscriber 생성 (Observable 주입)
const {
  updateViewMode,
  updatePressMode,
  updateSubscribedPress,
  renderNewsContainer,
} = createNewsContainerSubscribers({
  newsContainerObservable,
  subscribedObservable,
});

subscribedObservable.subscribe(updateSubscribedPressCount);
subscribedObservable.subscribe(updateSubscribedPressCards);
subscribedObservable.subscribe(updateSubscribedPress);

newsContainerObservable.subscribe(updateViewMode);
newsContainerObservable.subscribe(updatePressMode);

// 이벤트 리스너 설정
setupEventListeners({ newsContainerObservable, subscribedObservable });

// 초기 콘텐츠 렌더링
renderNewsContainer();

import { STORE_KEY } from "../constants.js";

/**
 * 앱의 이벤트 리스너를 설정하는 함수
 * @param {Object} params
 * @param {NewsContainerObservable} params.newsContainerObservable
 * @param {SubscribedObservable} params.subscribedObservable
 */
export const setupEventListeners = ({
  newsContainerObservable,
  subscribedObservable,
}) => {
  document.getElementById("app").addEventListener("click", (e) => {
    // 탭 클릭 처리
    const tabTarget = e.target.closest("[data-tab-group]");
    if (tabTarget) {
      const { tabItem, tabGroup } = tabTarget.dataset;

      // press mode 탭
      if (tabGroup === STORE_KEY.PRESS_MODE) {
        newsContainerObservable.setPressMode(tabItem);
      }
      // view mode 탭
      else if (tabGroup === STORE_KEY.VIEW_MODE) {
        newsContainerObservable.setViewMode(tabItem);
      }
    }

    // 언론사 클릭 처리
    const pressTarget = e.target.closest("[data-press-id]");
    if (pressTarget) {
      const { pressId } = pressTarget.dataset;
      const id = Number(pressId);
      subscribedObservable.addPressId(id);
    }
  });
};

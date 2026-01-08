import { PRESS_LIST } from "../dummy.js";
import { STORE_KEY, TAB_VALUE } from "../constants.js";
import { NewsGrid } from "../components/NewsGrid.js";
import { NewsList } from "../components/NewsList.js";

/**
 * press-mode, view-mode 변화에 따라 뉴스 컨텐츠를 업데이트하는 구독자
 * @param {Object} state - 앱의 상태
 */
export const contentSubscriber = (state) => {
  const contentArea = document.getElementById("news-content-area");
  if (!contentArea) return;

  // 1. 데이터 필터링 (전체 vs 구독)
  const displayList =
    state[STORE_KEY.PRESS_MODE] === TAB_VALUE.ALL
      ? PRESS_LIST
      : PRESS_LIST.filter((press) =>
          state.subscribedPressIds.includes(press.id)
        );

  // 2. 뷰 모드 결정 (그리드 vs 리스트)
  const contentHtml =
    state[STORE_KEY.VIEW_MODE] === TAB_VALUE.GRID
      ? NewsGrid({ pressList: displayList })
      : NewsList({ pressList: displayList });

  // 3. 바뀐 부분만 주입
  contentArea.innerHTML = contentHtml;
};

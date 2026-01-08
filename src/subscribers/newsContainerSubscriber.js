import { PRESS_LIST } from "../dummy.js";
import { TAB_VALUE, STORE_KEY, PRESS_MODE_TABS } from "../constants.js";
import { updateTextTabStyles, updateIconTabStyles } from "../utils/tabUtils.js";
import { Badge } from "../components/Badge.js";

/**
 * subscriber 함수들을 생성하는 팩토리 함수
 * Observable 인스턴스들을 클로저로 주입받음
 */
export const createNewsContainerSubscribers = ({
  newsContainerObservable,
  subscribedObservable,
}) => {
  /**
   * 개별 언론사 카드 DOM을 생성
   */
  const createPressCard = (press, isDarkMode = false) => {
    const div = document.createElement("div");
    div.className = "press-card flex items-center justify-center";
    div.dataset.pressId = press.id;

    const img = document.createElement("img");
    img.src = isDarkMode ? press.darkLogo : press.lightLogo;
    img.alt = press.name;

    div.appendChild(img);
    return div;
  };

  /**
   * 그리드/리스트에 맞게 컨테이너와 카드 스타일 설정
   */
  const applyViewModeStyles = (container, viewMode) => {
    // 컨테이너 스타일
    container.className = "grid gap-0 grid-cols-6 grid-rows-4 mt-6 w-930 h-97";

    if (viewMode === TAB_VALUE.GRID) {
      container.classList.add("border-t-l");
    }

    // 카드 스타일
    const cards = container.querySelectorAll(".press-card");
    cards.forEach((card) => {
      if (viewMode === TAB_VALUE.GRID) {
        card.className =
          "press-card flex items-center justify-center border-b-r";
      } else {
        card.className = "press-card flex items-center justify-center border";
      }
    });
  };

  /**
   * 콘텐츠 영역 전체 렌더링 (초기화용)
   */
  const renderTab = ({ selectedPressMode, selectedViewMode }) => {
    updateTextTabStyles(STORE_KEY.PRESS_MODE, selectedPressMode);
    updateIconTabStyles(STORE_KEY.VIEW_MODE, selectedViewMode);
    updateSubscribedPressCount(
      subscribedObservable.pressIds.length,
      selectedPressMode
    );
  };

  const updateSubscribedPressCount = ({ count, selectedPressMode }) => {
    const tabElement = document.querySelector(
      `[data-tab-item="${PRESS_MODE_TABS[1]}"]`
    );
    if (!tabElement) return;

    // 기존 배지 제거
    const existingBadge = tabElement.querySelector("span");
    if (existingBadge) {
      existingBadge.remove();
    }

    // Badge HTML을 직접 삽입
    tabElement.insertAdjacentHTML("beforeend", Badge({ count, isSelec }));
  };

  const renderContainer = () => {
    const contentArea = document.getElementById("news-content-area");
    if (!contentArea) return;

    // Observable에서 현재 상태 가져오기
    const pressMode = newsContainerObservable.pressMode;
    const viewMode = newsContainerObservable.viewMode;
    const subscribedPressIds = subscribedObservable.pressIds;

    // 데이터 필터링
    const displayList =
      pressMode === TAB_VALUE.ALL
        ? PRESS_LIST
        : PRESS_LIST.filter((press) => subscribedPressIds.includes(press.id));

    // 컨테이너 생성
    const container = document.createElement("div");
    container.id = "press-container";

    // 카드 생성
    displayList.forEach((press) => {
      const card = createPressCard(press);
      container.appendChild(card);
    });

    // 스타일 적용
    applyViewModeStyles(container, viewMode);

    // DOM 교체
    contentArea.innerHTML = "";
    contentArea.appendChild(container);
  };
  const renderNewsContainer = () => {
    const selectedPressMode = newsContainerObservable.pressMode;
    const selectedViewMode = newsContainerObservable.viewMode;
    const subscribedPressIds = subscribedObservable.pressIds;
    renderTab({
      selectedPressMode,
      selectedViewMode,
    });
    renderContainer();
  };

  /**
   * 뷰 모드 변경 시 - CSS만 변경 (DOM 재생성 없음)
   */
  const updateViewMode = (data) => {
    const container = document.getElementById("press-container");
    if (!container) {
      renderNewsContainer();
      return;
    }

    const viewMode = newsContainerObservable.viewMode;
    applyViewModeStyles(container, viewMode);
  };

  /**
   * 프레스 모드 변경 시 - 필요한 카드만 추가/제거
   */
  const updatePressMode = (data) => {
    const container = document.getElementById("press-container");
    if (!container) {
      renderNewsContainer();
      return;
    }

    const pressMode = newsContainerObservable.pressMode;
    const viewMode = newsContainerObservable.viewMode;
    const subscribedPressIds = subscribedObservable.pressIds;

    // 새로운 표시 목록
    const displayList =
      pressMode === TAB_VALUE.ALL
        ? PRESS_LIST
        : PRESS_LIST.filter((press) => subscribedPressIds.includes(press.id));

    // 현재 DOM에 있는 카드 ID 목록
    const currentCards = Array.from(container.querySelectorAll(".press-card"));
    const currentIds = currentCards.map((card) => Number(card.dataset.pressId));

    // 새로운 목록의 ID
    const newIds = displayList.map((press) => press.id);

    // 제거할 카드
    currentCards.forEach((card) => {
      const id = Number(card.dataset.pressId);
      if (!newIds.includes(id)) {
        card.remove();
      }
    });

    // 추가할 카드
    displayList.forEach((press) => {
      if (!currentIds.includes(press.id)) {
        const card = createPressCard(press);
        container.appendChild(card);
      }
    });

    // 스타일 재적용
    applyViewModeStyles(container, viewMode);
  };

  /**
   * 구독 상태 변경 시 - 프레스 모드가 '구독'일 때만 업데이트
   */
  const updateSubscribedPress = (pressIds) => {
    const pressMode = newsContainerObservable.pressMode;

    // '구독' 모드일 때만 업데이트
    if (pressMode === TAB_VALUE.SUBSCRIBED) {
      updatePressMode();
    }
  };

  return {
    renderNewsContainer,
    updateViewMode,
    updatePressMode,
    updateSubscribedPress,
  };
};

// src/composables/useScroll.ts
import { ref, onMounted, onUnmounted } from 'vue';

// 스크롤 이벤트에 대한 여러 콜백을 옵션으로 받을 수 있는 인터페이스 정의
interface ScrollOptions {
  onScrollDown?: (scrollTop: number) => void; // 스크롤 다운 시 호출할 함수
  onScrollUp?: (scrollTop: number) => void; // 스크롤 업 시 호출할 함수
  handleScroll?: (scrollTop: number) => void; // 스크롤 이벤트가 발생할 때마다 호출할 함수
  onScrollBtnShow?: () => void; // 특정 위치에 도달 시 버튼을 보여주는 함수
  onScrollBtnHide?: () => void; // 특정 위치에서 버튼을 숨기는 함수
}

// useScroll 함수는 위의 옵션들을 받아서 스크롤 이벤트를 처리
export function useScroll(options: ScrollOptions = {}) {
  const lastScrollTop = ref(0); // 마지막 스크롤 위치 저장

  // 내부적으로 스크롤 이벤트를 처리하는 함수
  const internalHandleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop; // 현재 스크롤 위치 계산

    // 스크롤 방향에 따라 적절한 콜백 호출
    if (scrollTop > lastScrollTop.value && options.onScrollDown) {
      options.onScrollDown(scrollTop); // 스크롤 다운 시 호출
    } else if (options.onScrollUp) {
      options.onScrollUp(scrollTop); // 스크롤 업 시 호출
    }

    // 특정 스크롤 위치에 따라 버튼을 보여주거나 숨기는 로직
    if (scrollTop >= 450 && options.onScrollBtnShow) {
      options.onScrollBtnShow(); // 버튼을 보여줌
    } else if (scrollTop < 450 && options.onScrollBtnHide) {
      options.onScrollBtnHide(); // 버튼을 숨김
    }

    // 마지막 스크롤 위치를 현재 위치로 업데이트
    lastScrollTop.value = scrollTop <= 0 ? 0 : scrollTop;

    // handleScroll 콜백 호출 (옵션으로 제공된 경우)
    if (options.handleScroll) {
      options.handleScroll(scrollTop);
    }
  };

  // 컴포넌트가 마운트되었을 때 스크롤 이벤트 리스너를 추가
  onMounted(() => {
    window.addEventListener('scroll', internalHandleScroll);
  });

  // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너를 제거
  onUnmounted(() => {
    window.removeEventListener('scroll', internalHandleScroll);
  });

  // 마지막 스크롤 위치를 반환하여 추후 필요 시 사용할 수 있게 함
  return { lastScrollTop };
}

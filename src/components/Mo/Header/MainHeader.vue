<template>
  <!-- 탑배너 컴포넌트를 불러오고, 높이와 가시성 상태 변화를 수신 -->
  <TopBanner ref="topBannerRef" :tabSlides="tabSlides" @updateHeight="handleBannerHeight"
    :showSearchButton="showSearchButton" :showShareButton="showShareButton" :showCartButton="showCartButton"
    :showHomeButton="showHomeButton" @openSearch="showSearchLayer" @updateVisibility="handleBannerVisibility" />
  <!-- 헤더 부분, 탑배너 가시성 상태에 따라 클래스 추가 및 배경색 설정 -->
  <header class="header-wrap" :class="{ 'is-topbanner2': topBannerRefVisible }"
    :style="{ backgroundColor: headerBgColor }" ref="headerElement" v-if="!isSearchLayerVisible">
    <h1 class="logo">
      <router-link to="/main" class="ico-logo"><span class="hidden">WConcept</span></router-link>
    </h1>
    <div class="util-box">
      <!--alarm Button-->
      <button type="button" class="btn-alarm active" v-if="showAlarmButton">
        <i class="ico-alarm"><span class="hidden">alarm</span></i>
      </button>
      <!-- Search Button -->
      <button type="button" class="btn-search" v-if="showSearchButton" @click="handleSearchClick">
        <i class="ico-search"><span class="hidden">search</span></i>
      </button>

      <!-- Share Button -->
      <button type="button" class="btn-share " v-if="showShareButton">
        <!--ico-share v2클래스 추가시 하얀색 아이콘-->
        <i class="ico-share v2"><span class="hidden">share</span></i>
      </button>

      <!-- Cart Button -->
      <router-link to="/" class="btn-cart" v-if="showCartButton">
        <i class="ico-cart"><span class="hidden">cart</span></i>
        <em class="count">50</em>
      </router-link>

      <!-- Home Button -->
      <router-link to="/main" class="btn-home" v-if="showHomeButton">
        <i class="ico-home v2"><span class="hidden">home</span></i>
      </router-link>
    </div>
  </header>
  <!-- 검색 레이어, 검색 상태가 참일 때만 표시 -->
  <SearchLayer v-if="isSearchLayerVisible" @close="hideSearchLayer" />
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue';
import { useScroll } from '../../../utils/useScroll';
import SearchLayer from "../../Mo/Header/SearchLayerPopup.vue";
import TopBanner from "./TopBanner.vue";
import DemoImg from '../../../assets/mo/images/temp/@temp_topbanner2.png';

// 컴포넌트의 props 정의
const props = defineProps<{
  headerBgColor: string;
  showAlarmButton?: boolean;
  showSearchButton?: boolean;
  showShareButton?: boolean;
  showCartButton?: boolean;
  showHomeButton?: boolean;
}>();

// 컴포넌트의 emit 정의
const emit = defineEmits<{
  (e: 'openSearch'): void;
}>();

// 탭 슬라이드 데이터 배열 정의
const tabSlides = [
  {
    imgSrc: DemoImg,
    alt: 'Slide 1',
    text: '',
    link: '#',
    bgColor: '#fa0404'
  },
  {
    imgSrc: DemoImg,
    alt: 'Slide 2',
    text: '',
    link: '#',
    bgColor: '#999'
  },
  {
    imgSrc: DemoImg,
    alt: 'Slide 3',
    text: '',
    link: '#',
    bgColor: '#111'
  }
];

// `TopBanner` 컴포넌트의 ref 참조 (타입 명시)
const topBannerRef = ref<InstanceType<typeof TopBanner> | null>(null);

// `TopBanner` 컴포넌트의 존재 여부를 관리하는 상태
const topBannerRefVisible = ref(true);  // `computed` 대신 `ref`로 변경하여 값을 수정할 수 있게 함


// DOM 요소에 대한 참조
const headerElement = ref<HTMLElement | null>(null);
const navGnbElement = ref<HTMLElement | null>(null);

// 버튼 가시성 제어 플래그 설정
const showAlarmButton = ref(true); //알람 버튼 표시
const showSearchButton = ref(true); //검색 버튼 표시
const showShareButton = ref(false);  // 공유 버튼 표시
const showCartButton = ref(true);  // 장바구니 버튼 표시
const showHomeButton = ref(false);  // 홈 버튼 미표시



// props에서 headerBgColor 가져오기
const headerBgColor = computed(() => props.headerBgColor || '');

// 탑배너 높이값을 저장하는 변수
const topBannerHeight = ref<number | null>(null);

// 탑배너 높이값을 업데이트하는 함수
const handleBannerHeight = (height: number) => {
  topBannerHeight.value = height;
};

// 탑배너 가시성 상태를 업데이트하는 함수
const handleBannerVisibility = (isVisible: boolean) => {
  topBannerRefVisible.value = isVisible;
};



// 스크롤 다운 이벤트 핸들러
const onScrollDown = (scrollTop: number) => {
  // `navGnbElement`가 존재하면
  if (navGnbElement.value) {
    navGnbElement.value.classList.remove("up"); // GNB를 보이게 함
    if (headerElement.value) {
      headerElement.value.classList.remove("down"); // 헤더를 위로 이동
      headerElement.value.classList.add("sticky"); // 헤더를 고정
    }
  } else { // `navGnbElement`가 존재하지 않으면
    if (headerElement.value) {
      headerElement.value.classList.remove("up"); // 헤더를 위로 이동
      headerElement.value.classList.add("down"); // 헤더를 아래로 이동
    }
  }

  // 스크롤이 400 이상 내려갔을 때
  if (headerElement.value) {
    headerElement.value.classList.remove('up'); // 헤더를 위로 이동
    if (scrollTop >= 400) {
      headerElement.value.classList.remove('transparent'); // 헤더 투명 효과 제거
      headerElement.value.classList.add('dark'); // 헤더를 어둡게 설정
    } else {
      headerElement.value.classList.remove('dark'); // 어두운 헤더 효과 제거
    }
  }


  if (scrollTop > 0 && topBannerRef.value && topBannerHeight.value !== null && topBannerHeight.value > 0) {
    const bannerElement = topBannerRef.value.$el as HTMLElement;
    // topBannerRef의 margin-top을 -offsetHeight로 설정
    bannerElement.style.marginTop = `-${bannerElement.offsetHeight}px`;
  }

};

// 스크롤 업 이벤트 핸들러
const onScrollUp = (scrollTop: number) => {
  // 스크롤이 최상단에 있을 때
  if (scrollTop <= 0 && headerElement.value) {
    headerElement.value.classList.remove('up'); // 헤더 위로 이동 제거
    headerElement.value.classList.remove('down'); // 헤더 아래로 이동 제거

    // topBannerRef에 'up' 클래스 제거
    if (topBannerRef.value && topBannerHeight.value !== null && topBannerHeight.value > 0) {
      const bannerElement = topBannerRef.value.$el as HTMLElement;
      // topBannerRef의 margin-top을 0으로 설정
      if (bannerElement) {
        bannerElement.style.marginTop = '0';
      }
    }
  }

  // `navGnbElement`가 존재하면
  if (navGnbElement.value) {
    navGnbElement.value.classList.add("up"); // GNB를 위로 이동
    if (headerElement.value) {
      headerElement.value.classList.remove("down"); // 헤더 아래로 이동 제거
      headerElement.value.classList.add("sticky"); // 헤더 고정

      // 탑배너가 보이고, 탑배너의 높이 - 스크롤 값이 0보다 크면
      if (topBannerRefVisible.value && topBannerHeight.value !== null && (topBannerHeight.value - scrollTop > 0)) {
        headerElement.value.classList.remove("sticky"); // 헤더 고정 해제
      }
    }
  } else { // `navGnbElement`가 존재하지 않으면
    if (headerElement.value) {
      headerElement.value.classList.remove("up"); // 헤더 위로 이동 제거
      headerElement.value.classList.add("up"); // 헤더를 위로 이동
    }
  }

  // 스크롤이 400 이상 내려갔을 때
  if (headerElement.value) {
    headerElement.value.classList.remove('down'); // 헤더 아래로 이동 제거

    if (scrollTop >= 400) {
      headerElement.value.classList.remove('transparent'); // 헤더 투명 효과 제거
      headerElement.value.classList.add('dark'); // 헤더를 어둡게 설정
    } else {
      headerElement.value.classList.remove('dark'); // 어두운 헤더 효과 제거
    }
  }
};

// SearchLayer 상태 관리
const isSearchLayerVisible = ref(false);
const handleSearchClick = () => {
  emit('openSearch');
  showSearchLayer();
};

const showSearchLayer = () => {
  isSearchLayerVisible.value = true;

  // TopBanner에 클래스 추가 탑배너가 있을경우 
  if (topBannerRefVisible.value && topBannerRef.value?.$el) {
    // 배너를 숨기는 로직
    topBannerRef.value.$el.style.display = 'none';  // 배너를 숨김
  }


  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.style.overflow = 'hidden';
    appElement.style.height = '100vh';
    appElement.style.height = '100dvh';
  }
};

const hideSearchLayer = () => {
  isSearchLayerVisible.value = false;

  // TopBanner에 클래스 제거 
  if (topBannerRefVisible.value && topBannerRef.value?.$el) {
    if (topBannerRef.value?.$el) {
        topBannerRef.value.$el.style.display = 'block';  // 배너를 다시 보이게 함
    }
  }

  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.style.overflow = '';
    appElement.style.height = '';
  }
};



// 컴포넌트가 마운트될 때 실행되는 로직
onMounted(() => {
  const appElement = document.getElementById('app');
  navGnbElement.value = document.querySelector('.gnb-wrap ');
  if (appElement) {
    appElement.style.overflow = isSearchLayerVisible.value ? 'hidden' : '';
    appElement.style.height = isSearchLayerVisible.value ? '100vh' : '';
    appElement.style.height = isSearchLayerVisible.value ? '100dvh' : '';
  }

  //헤더 초기 스타일 설정
  if (headerElement.value) {
    headerElement.value.style.transition = 'none';
    headerElement.value.classList.add('transparent');
  }
});

// 컴포넌트가 언마운트될 때 실행되는 로직
onBeforeUnmount(() => {
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.style.overflow = '';
    appElement.style.height = '';
  }
});

// 스크롤 이벤트 핸들러 설정
useScroll({
  onScrollDown,
  onScrollUp,
});


</script>

<style lang="scss" scoped>
@import '../../../assets/mo/css/common/variable';
@import '../../../assets/mo/css/common/mixin';

.header-wrap {
  position: fixed;
  top: 0;
  padding-left: toRem(20px);
  background-color: transparent;

  &.dark {
    background-color: #000;
  }

  &.down {
    top: 0 !important;
    background-color: $CTmain;
  }

  &.sticky {
    top: 0;
  }

  &.up {
    top: 0 !important;
    background-color: #000;
  }
}
</style>

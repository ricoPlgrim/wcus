<template>
  <!-- 헤더 부분: 검색 레이어가 보이지 않을 때만 표시 -->
  <header :class="['header-wrap', headerClass]" :style="{ backgroundColor: headerBgColor }" ref="headerElement"
    v-if="!isSearchLayerVisible">
    <div class="page-title">
      <button type="button" class="btn-back" @click="goBack">
        <i class="ico-arr"><span class="hidden">back</span></i>
      </button>
      <!-- title이 있을 때만 h2 태그를 렌더링 -->
      <h2 class="cate-name" v-if="title">{{ title }}</h2>
    </div>
    <div class="util-box">
      <!-- Search Button -->
      <button type="button" class="btn-search" v-if="showSearchButton" @click="handleSearchClick">
        <i :class="['ico-search', isV2Active ? 'v2' : '']"><span class="hidden">search</span></i>
      </button>

      <!-- Share Button -->
      <button type="button" class="btn-share" v-if="showShareButton" @click="shareOpen">
        <i :class="['ico-share', isV2Active ? 'v2' : '']"><span class="hidden">share</span></i>
      </button>

      <!-- Cart Button -->
      <router-link to="/" class="btn-cart" v-if="showCartButton">
        <i :class="['ico-cart', isV2Active ? 'v2' : '']"><span class="hidden">cart</span></i>
        <em class="count show">50</em> <!--show 클래스 있을경우 숫자 노출-->
      </router-link>

      <!-- Home Button -->
      <router-link to="/main" class="btn-home" v-if="showHomeButton">
        <i :class="['ico-home', isV2Active ? 'v2' : '']"><span class="hidden">home</span></i>
      </router-link>
    </div>
  </header>
  <SearchLayer v-show="isSearchLayerVisible" @close="hideSearchLayer" />
  <sharePopupLayer ref="sharePopup"  title="Share This Page" shareUrl="https://www.wconcept.com/"
    :showFacebook="true" :showGoogle="true" :showPinterest="true" :showUrl="true" />
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import sharePopupLayer from '../Popup/SharePopup.vue'

import { useScroll } from '../../../utils/useScroll';
import SearchLayer from "../../Mo/Header/SearchLayerPopup.vue";


const sharePopup = ref<InstanceType<typeof sharePopupLayer> | null>(null);

// 전역 scrollTop 변수 선언
let scrollTop = 0;

// props 정의
const props = defineProps<{
  headerBgColor?: string;
  title?: string; // title은 선택적(props)
  headerClass?: string; // headerClass는 선택적
  showSearchButton?: boolean;
  showShareButton?: boolean;
  showCartButton?: boolean;
  showHomeButton?: boolean;
  handleScrollStateChange?: boolean;
  tabChangeExecuted?: boolean; // 부모 컴포넌트에서 전달받을 tabChangeExecuted 값
  modelValue?: number,
  isV2Active?: boolean, //  v2아이콘 활성화

}>();
 

// emit 정의
const emit = defineEmits<{
  (e: 'openSearch'): void;
  (e: 'headerHeight', height: number): void; // header 높이 전달을 위한 emit 정의
}>();

//공유버튼 클릭 시 공유 팝업 호출
const shareOpen = () => {
  if (sharePopup.value) {
    sharePopup.value.openPopup();
  }

}

// 헤더 요소에 대한 참조
const headerElement = ref<HTMLElement | null>(null);

// Vue Router 사용을 위한 참조
const router = useRouter();

// 헤더 배경색을 계산하는 computed 속성
const headerBgColor = computed(() => props.headerBgColor || '#000');

// 뒤로 가기 함수
const goBack = () => {
  router.back();
};

// isV2Active는 현재 라우트 경로에 따라 동적으로 계산됨
const isV2Active = computed(() => {
  return props.isV2Active !== undefined ? props.isV2Active : router.currentRoute.value.path  === '/main'; 
});

// 검색 레이어 가시성을 관리하는 상태 변수
const isSearchLayerVisible = ref(false);

// 검색 버튼 클릭 시 호출되는 함수
const handleSearchClick = () => {
  emit('openSearch'); // openSearch 이벤트 발생
  showSearchLayer(); // 검색 레이어를 표시
};

// 검색 레이어를 표시하는 함수
const showSearchLayer = () => {
  isSearchLayerVisible.value = true;
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.style.overflow = 'hidden';
    appElement.style.height = '100vh';
  }
};

// 검색 레이어를 숨기는 함수
const hideSearchLayer = () => {
  isSearchLayerVisible.value = false;
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.style.overflow = '';
    appElement.style.height = '';
  }
};


// handleScroll 함수 정의
const handleScroll = () => {
  scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (headerElement.value && headerElement.value.classList.contains('v2') && scrollTop === 0) {
    headerElement.value.classList.remove('up');
  }
};

// 스크롤 다운 이벤트 핸들러: 스크롤을 내릴 때 호출됨
const onScrollDown = (currentScrollTop: number) => {
  const tabComponentElement = document.querySelector('.tab-type');
  scrollTop = currentScrollTop; // 전역 변수에 업데이트 
  if (scrollTop > 0 && headerElement.value) {
    headerElement.value.classList.add("down");
    if (tabComponentElement) {
      tabComponentElement.classList.remove("up");
    }
  }

  // tabComponentElement에 'up' 클래스가 있는 경우 제거
  if (headerElement.value && headerElement.value.classList.contains("up")) {
    headerElement.value.classList.remove("up");
  }
};


// 스크롤 업 이벤트 핸들러: 스크롤을 올릴 때 호출됨
const onScrollUp = () => {
  if (props.handleScrollStateChange === true) return;
  // '.tab-type' 클래스를 가진 요소를 선택합니다.
  const tabComponentElement = document.querySelector('.tab-type');
  // headerElement가 존재하는지 확인한 후 클래스 목록에 접근합니다.
  if (headerElement.value) {
    // headerElement에서 'down' 클래스를 제거합니다.
    headerElement.value.classList.remove("down");
    // tabComponentElement가 존재하는 경우 'up' 클래스를 추가합니다.
    if (tabComponentElement) {
      tabComponentElement.classList.add("up");
    }
    // // headerElement에 'v2' 클래스가 있는 경우 'up' 클래스를 추가합니다.
    if (headerElement.value.classList.contains('v2')) {
      headerElement.value.classList.add("up");
    }
  }
};




// tabChangeExecuted가 변경될 때마다 콘솔에 로그를 출력하는 watch 설정
//이부분은 헤더를 내리고 탭버튼을 클릭했을떄 제어하는 로직
watch(() => props.tabChangeExecuted, (newVal) => {

  // props.tabChangeExecuted가 true일 때만 아래 로직을 실행
  if (newVal && headerElement.value) {
    const hasUpClass = headerElement.value.classList.contains('up');

    if (hasUpClass) {
      const tabComponentElement = document.querySelector('.tab-type');
      headerElement.value.classList.remove("up");
      headerElement.value.classList.add("down");
      if (tabComponentElement) {
        tabComponentElement.classList.remove("up");
      }
    }
  }


});



// 컴포넌트가 마운트될 때 실행되는 로직
onMounted(() => {
  nextTick(() => {

    if (headerElement.value) {
      // 헤더 높이를 부모 컴포넌트에 전달
      const headerHeight = headerElement.value.getBoundingClientRect().height;
      emit('headerHeight', headerHeight);
    }
  });
});

// 컴포넌트가 언마운트될 때 실행되는 로직
onBeforeUnmount(() => {
  const appElement = document.getElementById('app');
  if (appElement) {
    appElement.style.overflow = '';
    appElement.style.height = '';
  }
});



// 스크롤 이벤트 핸들러 설정: 스크롤 방향에 따라 onScrollUp 또는 onScrollDown 또는 handleScroll 호출
useScroll({
  onScrollDown,
  onScrollUp,
  handleScroll,
});

</script>

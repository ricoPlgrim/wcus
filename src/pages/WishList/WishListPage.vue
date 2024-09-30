<template>
  <component :is="dynamicComponent" :headerBgColor="headerBgColor" :title="pageTitle"
    @openSearch="showSearchLayer"  :showSearchButton="showSearchButton" :showShareButton="showShareButton" :showCartButton="showCartButton"
        :showHomeButton="showHomeButton"  v-if="!isSearchLayerVisible" />

  <div class="sub" id="container">
    <div class="content-wrap wish-wrap">
      <div class="tab-wrap">
        <ul class="tab-type2 v2 js_tab">
          <li class="active"><a href="#item" data-text="ITEM">ITEM</a></li>
          <li><a href="#brand" data-text="BRAND">BRAND</a></li>
          <li><a href="#style" data-text="STYLE">STYLE</a></li>
          <li><a href="#feed" data-text="FEED">FEED</a></li>
        </ul>
      </div>
      <section class="tab-content active" id="item">
        <div class="swiper menu-swiper v2 menu-swiper0 swiper-initialized swiper-horizontal swiper-ios swiper-backface-hidden">
          <div class="swiper-wrapper" id="swiper-wrapper-3a1533c0c4648e103" aria-live="polite"
            style="transition-duration: 0ms; transform: translate3d(8px, 0px, 0px);">
            <div class="swiper-slide active swiper-slide-active" role="group" aria-label="1 / 5"><a
                data-text="ALL">ALL</a></div>
            <div class="swiper-slide swiper-slide-next" role="group" aria-label="2 / 5"><a data-text="WOMEN"
                value="WUSA01">WOMEN</a></div>
            <div class="swiper-slide" role="group" aria-label="3 / 5"><a data-text="MEN" value="WUSA02">MEN</a></div>
            <div class="swiper-slide" role="group" aria-label="4 / 5"><a data-text="K-BEAUTY" value="WUSA03">K-BEAUTY</a>
            </div>
            <div class="swiper-slide" role="group" aria-label="5 / 5"><a data-text="LIFE" value="WUSA04">LIFE</a></div>
          </div><span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>
        <div class="inner-box">
          <div class="nodata-wrap2">
            <p>Nothing Saved<br>Start shopping, Save items you love.</p>
            <div class="btn-wrap"><a class="btn-type2 btn-full">START SHOPPING</a></div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <Quick />
  <Navigation :NaviBgColor="NaviBgColor"/>
  <Footer />
  <SearchLayer v-if="isSearchLayerVisible" @close="hideSearchLayer" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import SubHeader from "../../components/Mo/Header/SubHeader.vue";
import MainHeader from "../../components/Mo/Header/MainHeader.vue";
import Navigation from "../../components/Mo/Navigation/NavigationComponent.vue";
import Quick from "../../components/Mo/Quick/QuickComponent.vue";
import Footer from "../../components/Mo/Footer/FooterComponent.vue";
import SearchLayer from "../../components/Mo/Header/SearchLayerPopup.vue"; 

// router
const route = useRoute();

// 메인header 체크
const isMain = computed(() => route.path === '/main');

// 동적 컴포넌트 설정
const dynamicComponent = computed(() => isMain.value ? MainHeader : SubHeader);

// 헤더 배경값
const headerBgColor = '';

// 버튼 가시성 제어 플래그 설정
const showSearchButton = ref(true); //검색 버튼 표시
const showShareButton = ref(false);  // 공유 버튼 미표시
const showCartButton = ref(true);  // 장바구니 버튼 표시
const showHomeButton = ref(false);  // 홈 버튼 미표시



// 네비게이션 배경값
const NaviBgColor = '';
// 페이지 타이틀
const pageTitle = "Favorites";
// 검색 레이어 표시 상태
const isSearchLayerVisible = ref(false);
// 검색 레이어 표시 함수
const showSearchLayer = () => {
  isSearchLayerVisible.value = true;
};

// 검색 레이어 숨김 함수 (필요시)
const hideSearchLayer = () => {
  isSearchLayerVisible.value = false;
};
</script>
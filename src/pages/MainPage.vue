<template>
  <component :is="dynamicComponent" :headerBgColor="headerBgColor" />
  <div class="main" id="container">
    <div class="content-wrap">
      <div class="visual-wrap main-visual" >
        <VisualSwiper :slides="visualItem"  :isInnerBox="true" customClass="visual-swiper" :navigationHeight="navigationHeight" @updateHeight="updateTextBoxHeight" />
      </div>
      <NavGnb :menuItems="menuItems" />
      <NewSection />
      <TailoredSection />
      <EventSection />
      <BrandSection />
      <HighlightsSection />
      <WmuseSection />
      <EventBannerSection />
      <BrandTabSwiperSection />
      <!-- 메뉴 스와이퍼가 있는 ProductSection -->
      <ProductSection title="5Pening SS’23" :useMenuSwiper="true" />
      <!-- 메뉴 스와이퍼가 없는 ProductSection -->
      <ProductSection title="5Pening Accessories" :useMenuSwiper="false" />
      <RankingSection :RankingData="RankingData" />
      <BrandCricleSwiperSection />
      <StyleSection />
      <!-- CardList 컴포넌트 -->
      <CardList :items="imageItems" />
    </div>
  </div>
  <Quick />
  <Navigation ref="navigationComponent" :NaviBgColor="NaviBgColor" />
  <Footer />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

// Component Imports
import MainHeader from "../components/Mo/Header/MainHeader.vue";
import SubHeader from "../components/Mo/Header/SubHeader.vue";
import Navigation from "../components/Mo/Navigation/NavigationComponent.vue";
import Quick from "../components/Mo/Quick/QuickComponent.vue";
import Footer from "../components/Mo/Footer/FooterComponent.vue";
import VisualSwiper from '../components/Mo/Swiper/VisualSwiper.vue';
import NavGnb from '../components/Mo/Buttons/NavBtn.vue';
import NewSection from '../components/Mo/Component/Main/NewSection.vue';
import TailoredSection from '../components/Mo/Component/Main/TailoredSection.vue';
import EventSection from '../components/Mo/Component/Main/EventSection.vue';
import BrandSection from '../components/Mo/Component/Main/BrandSection.vue';
import HighlightsSection from '../components/Mo/Component/Main/HighlightsSection.vue';
import WmuseSection from '../components/Mo/Component/Main/WmuseSection.vue';
import EventBannerSection from '../components/Mo/Component/Main/EventBannerSection.vue';
import BrandTabSwiperSection from '../components/Mo/Component/Main/BrandTabSwiperSection.vue';
import ProductSection from '../components/Mo/Component/Main/ProductSection.vue';
import RankingSection from '../components/Mo/Component/Main/RankingSection.vue';
import BrandCricleSwiperSection from '../components/Mo/Component/Main/BrandCricleSwiperSection.vue';
import StyleSection from '../components/Mo/Component/Main/StyleSection.vue';


import CardList from '../components/Mo/List/CardList.vue';

// Image Imports
import visualImg1 from '@/assets/mo/images/temp/@temp_visual2.png';
import CardListImg1 from '@/assets/mo/images/temp/@temp_shop1.png';
import CardListImg2 from '@/assets/mo/images/temp/@temp_shop2.png';
import CardListImg3 from '@/assets/mo/images/temp/@temp_shop3.png';
import CardListImg4 from '@/assets/mo/images/temp/@temp_shop4.png';


// Visual Item 인터페이스 정의
interface VisualItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  title: string;
  subtitle: string;
  link: string;
}

// Visual Items 데이터
const visualItem = ref<VisualItem[]>([
  {
    type: 'image',
    src: visualImg1,
    alt: 'visual',
    title: 'SPRING BIG SALE<br />2023 EVENT',
    subtitle: 'SS Products at Weekly Special Price',
    link: '/'
  },
  {
    type: 'video',
    // src: 'https://player.vimeo.com/video/249908774&muted=1&controls=0',
    src: 'https://player.vimeo.com/video/249908774',
    title: 'SPRING BIG SALE<br />2023 EVENT',
    subtitle: 'SS Products at Weekly Special Price',
    link: '#',
    alt: '' // Optional, but should be included to match the type
  },
  {
    type: 'image',
    src: visualImg1,
    alt: 'visual',
    title: 'SPRING BIG SALE<br />2023 EVENT',
    subtitle: 'SS Products at Weekly Special Price',
    link: '#'
  },

  {
    type: 'image',
    src: visualImg1,
    alt: 'visual',
    title: 'SPRING BIG SALE<br />2023 EVENT',
    subtitle: 'SS Products at Weekly Special Price',
    link: '#'
  }
]);


// GNB 메뉴 아이템
const menuItems = ref([
  { name: 'WOMEN', link: '#' },
  { name: 'MEN', link: '#' },
  { name: 'K-BEAUTY', link: '#' },
  { name: 'LIFE', link: '#' },
]);


// Card List Items 데이터
const imageItems = [
  { url: '/', src: CardListImg1, alt: '이미지1' },
  { url: '/', src: CardListImg2, alt: '이미지2' },
  { url: '/', src: CardListImg3, alt: '이미지3' },
  { url: '/', src: CardListImg4, alt: '이미지4' }
];

// 라우트 핸들링
const route = useRoute();
const isMain = computed(() => route.path === '/main');
const dynamicComponent = computed(() => isMain.value ? MainHeader : SubHeader);

// 스타일 관련 변수
const headerBgColor = '';
const NaviBgColor = '';

// 네비게이션 높이와 텍스트 박스 높이를 저장하는 변수
const navigationHeight = ref<number>(0);
const textBoxHeight = ref<number>(0);
const navigationComponent = ref();

// 텍스트 박스 높이 업데이트 함수
const updateTextBoxHeight = (height: number) => {
  textBoxHeight.value = height;
};

// RankingSection 데이터
const RankingData = ref([
  {
    id: 'top-brand',
    title: 'TOP BRANDS',
    items: [
      { name: 'The Row', link: '#' },
      { name: 'Bye Bye Bad Man', link: '#' },
      { name: 'Lowew', link: '#' },
      { name: 'Andersson Bell For Man', link: '#' },
      { name: 'ByUR', link: '#' },
      { name: 'FFROI', link: '#' },
      { name: 'Je Ne SAIS QUOI ENSEMBLE', link: '#' },
      { name: 'ORANGESWIMMINGPOOL', link: '#' },
      { name: 'Brendabrenden Seoul', link: '#' },
      { name: 'Spring Camp', link: '#' }
    ]
  },
  {
    id: 'top-keyword',
    title: 'TOP KEYWORD',
    items: [
      { name: 'Cardigan', link: '#' },
      { name: 'Dress', link: '#' },
      { name: 'Tweed Jacket', link: '#' },
      { name: 'Bag', link: '#' },
      { name: 'Buckle Wide Denim Pants', link: '#' },
      { name: 'SUMMER', link: '#' },
      { name: 'maltese archive', link: '#' },
      { name: 'EIFFELCASSIC', link: '#' },
      { name: 'ADIDAS X BAD BUNNY RESPONSE CL', link: '#' },
      { name: 'Leather Jacket', link: '#' }
    ]
  }
]);

// 컴포넌트가 마운트될 때 실행되는 로직
onMounted(() => {
  nextTick(() => {
    const navigation = navigationComponent.value?.$el.nextSibling;
    if (navigation) {
      navigationHeight.value = navigation.clientHeight;
    }
  });
});
</script>

<style lang="scss">
@import '../assets/mo/css/common/variable';
@import '../assets/mo/css/common/mixin';
@import '../assets/mo/css/main';
</style>

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import GuidePage from '@/pages/Guide.vue'; // 라우트에 사용될 컴포넌트.
import UiGuide from '@/pages/mo/guide/GuideIndex.vue';
import ColorGuide from '@/pages/mo/guide/Color/ColorGuide.vue';
import FontGuide from '@/pages/mo/guide/Fonts/FontGuide.vue';
import TextGuide from '@/pages/mo/guide/Text/TextGuide.vue';
import ButtonGuide from '@/pages/mo/guide/Buttons/ButtonGuide.vue';
import FormGuide from '@/pages/mo/guide/Form/FormGuide.vue';
import ComponentGuide from '@/pages/mo/guide/Component/ComponentGuide.vue';
import IconsGuide from '@/pages/mo/guide/Icons/Index.vue';
import TableGuide from '@/pages/mo/guide/Table/TableGuide.vue';
import SwiperGuide from '@/pages/mo/guide/Swiper/SwiperGuide.vue';
import PopupGuide from '@/pages/mo/guide/Popup/PopupGuide.vue';
import VimeoGuide from '@/pages/mo/guide/Vimeo/VimeoGuide.vue';
import MainPage from '@/pages/MainPage.vue'; // 메인 페이지 컴포넌트
import WishListPage from '@/pages/WishList/WishListPage.vue'; // 위시리스트 페이지 컴포넌트
import MyInfoPage from '@/pages/MyInfo/MyInfoPage.vue'; // 마이 정보 페이지 컴포넌트
import BrandPage from '@/pages/Brand/BrandPage.vue'; // 브랜드 페이지 컴포넌트
import CancelPage from '@/pages/Mypage/RequestCancel.vue'; // 주문 클레임 컴포넌트
import ReturnPage from '@/pages/Mypage/RequestReturn.vue'; // 주문 클레임 컴포넌트
import MyaddRessPage from '@/pages/Mypage/MyAddress.vue'; // 나의 정보 페이지 
import ProductViewPage from '@/pages/Product/ProductView.vue'; // 상품상세
import ProductlistPage from '@/pages/Product/list_seller.vue'; // 상품상세
import ErrorPage from '@/pages/Error/ErrorPage.vue'; // 404페이지
import DisplayTypeA from '@/pages/Display/detail_display_A.vue'; 
import DisplayTypeAscroll from '@/pages/Display/detail_display_A_scroll.vue'; 
import DisplayTypeB from '@/pages/Display/detail_display_B.vue'; 
import DisplayTypeBscroll from '@/pages/Display/detail_display_B_scroll.vue'; 
import DetailBrandPage from '@/pages/Brand/DetailBrands.vue'; 

// 라우트 설정을 위한 배열을 정의
const routes: Array<RouteRecordRaw> = [
  {
    path: '/', // URL 경로
    name: 'Guide', // 라우트 이름
    component: GuidePage // 라우트에 연결된 컴포넌트
  },
  { 
    path: '/ui-guide',
    name: 'UiGuide',
    component: UiGuide
  },
  {
    path: '/color-guide',
    name: 'ColorGuide',
    component: ColorGuide
  },
  {
    path: '/font-guide',
    name: 'FontGuide',
    component: FontGuide
  },
  {
    path: '/text-guide',
    name: 'TextGuide',
    component: TextGuide
  },
  {
    path: '/button-guide',
    name: 'ButtonGuide',
    component: ButtonGuide
  },
  {
    path: '/form-guide',
    name: 'FormGuide',
    component: FormGuide
  },
  {
    path: '/component-guide',
    name: 'ComponentGuide',
    component: ComponentGuide
  },

  {
    path: '/icons-guide',
    name: 'IconsGuide',
    component: IconsGuide
  },
  {
    path: '/table-guide',
    name: 'TableGuide',
    component: TableGuide
  },
  {
    path: '/swiper-guide',
    name: 'SwiperGuide',
    component: SwiperGuide
  },
  {
    path: '/popup-guide',
    name: 'PopupGuide',
    component: PopupGuide
  },
  {
    path: '/vimeo-guide',
    name: 'VimeoGuide',
    component: VimeoGuide
  },

  {
    path: '/main',
    name: 'Home',
    component: MainPage, // 메인 페이지를 연결합니다.
  },

  {
    path: '/favorites',
    name: 'WishList',
    component: WishListPage, // 위시리스트 페이지를 연결합니다.
  },

  {
    path: '/me',
    name: 'MyInfo',
    component: MyInfoPage, // 마이 정보 페이지를 연결합니다.
  },

  {
    path: '/brands',
    name: 'Brand',
    component: BrandPage, // 브랜드 페이지를 연결합니다.
  },
  {
    path: '/cancle',
    name: 'Cancle',
    component: CancelPage, // 주문취소 페이지를 연결합니다.
  },
  {
    path: '/return',
    name: 'Return',
    component: ReturnPage, // 주문반품 페이지를 연결합니다.
  },
  {
    path: '/myaddress',
    name: 'myaddress',
    component: MyaddRessPage, // 나의 정보 주소지 페이지 연결.
  },
  {
    path: '/productView',
    name: 'productView',
    component: ProductViewPage, // 상품 상세 페이지 연결
  },
  {
    path: '/productList',
    name: 'productList',
    component: ProductlistPage, // 상품 2단 리스트 페이지 연경
  },
  {
    path: '/:catchAll(.*)', // 이 경로는 위의 모든 경로에 매칭되지 않는 경우에 사용됩니다.
    name: 'Error',
    component: ErrorPage,
  },
  {
    path: '/displaya',
    name: 'DisplayA',
    component: DisplayTypeA
  },
  {
    path: '/displayascroll',
    name: 'DisplayAscroll',
    component: DisplayTypeAscroll
  },
  {
    path: '/displayb',
    name: 'displayb',
    component: DisplayTypeB
  },
  {
    path: '/displaybscroll',
    name: 'DisplayBscroll',
    component: DisplayTypeBscroll
  },
  {
    path: '/DetailBrand',
    name: 'DetailBrand',
    component: DetailBrandPage
  },

  
  
];

// Vue Router 인스턴스를 생성.
const router = createRouter({
  history: createWebHashHistory(), // Hash 모드를 사용하여 브라우저의 URL을 관리
  routes, // 정의한 라우트 배열을 사용.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

export default router; // 생성된 라우터를 내보내어 앱에서 사용 가능.
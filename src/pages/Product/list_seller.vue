<template>
    <component :is="dynamicComponent" :title="pageTitle" :showSearchButton="showSearchButton"
        :showShareButton="showShareButton" :showCartButton="showCartButton" :showHomeButton="showHomeButton" />
    <div class="sub" id="container">
        <div class="content-wrap product-wrap">
            <div class="list-wrap">
                <SubTopSwiper :slides="eventSlides" className="topbanner-swiper" />
                <TabComponent :tabs="itemTabs" tabClass="tab-type2 v2" />
                <menuSwiperComponent ref="menuSwiper" type="v2" :menus="menus" :initialIndex="activeTab"  @menuClick="handleMenuClick" />
                <div ref="productTop" class="product-top sticky-box">
                    <div class="prd-mode">
                        <div :class="['chk-box', { selected: isSaleOnly }]">
                            <input type="checkbox" id="saleChk" :checked="isSaleOnly" @change="toggleSaleOnly">
                            <label class="checkbox" for="saleChk"></label>
                            <label for="saleChk">Sale Only</label>
                        </div>
                        <span class="count"><em>99</em> items</span>
                    </div>
                </div>
                <ProductList :products="products" customClass="top-ranking" :showRanking="true" />
            </div>
        </div>

    </div>
    <Quick /> <!-- detail 클래스 추가시 업다운 기능 작동 안함 -->
    <Navigation />
    <Footer /><!-- detail 클래스 추가시 하단 여백 발생 -->
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useScroll } from '../../utils/useScroll';
import SubHeader from "../../components/Mo/Header/SubHeader.vue";
import MainHeader from "../../components/Mo/Header/MainHeader.vue";
import Quick from "../../components/Mo/Quick/QuickComponent.vue";
import Navigation from "../../components/Mo/Navigation/NavigationComponent.vue";
import Footer from "../../components/Mo/Footer/FooterComponent.vue";

/*컴포넌트 */

import SubTopSwiper from "../../components/Mo/Swiper/CountSwiper.vue";
import TabComponent from "../../components/Mo/Buttons/TabBtn.vue"
import menuSwiperComponent from "../../components/Mo/Swiper/MenuIndex.vue"
import ProductList from '../../components/Mo/Component/Product/ProductList.vue';
import { Product } from '../../components/Mo/Component/Product/ProductTypes';

import DemoImage from '@/assets/mo/images/temp/@temp_prd_image.png';
import slideImage from '@/assets/mo/images/temp/@temp_topbanner.png'


interface VisualItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    link: string;
}

const eventSlides = ref<VisualItem[]>([
    {
        type: 'image',
        src: slideImage,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'image',
        src: slideImage,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'video',
        src: 'https://player.vimeo.com/video/744484163',
        link: '/',
    },
    {
        type: 'image',
        src: slideImage,
        alt: 'visual',
        link: '/'
    }
]);



// 탭 인터페이스 정의
interface Tab {
    href: string;
    text: string;
    dataText?: string;
    count?: number;
}

// Sale Only 체크박스 상태를 관리하는 ref 변수
const isSaleOnly = ref(false);

// 상태를 토글하는 함수
const toggleSaleOnly = () => {
    isSaleOnly.value = !isSaleOnly.value;
};


//메뉴 아이템
const itemTabs = ref<Tab[]>([
    { href: '#all', text: 'All', dataText: 'All' },
    { href: '#women', text: 'WOMEN', dataText: 'WOMEN' },
    { href: '#men', text: 'MEN', dataText: 'MEN' },
    { href: '#kbeauty', text: 'K-BEAUTY', dataText: 'K-BEAUTY' },
    { href: '#life', text: 'LIFE', dataText: 'LIFE' },
]);


//product 인터페이스 정의
const products = ref<Product[]>([
    {
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjacketsjacketsjackets',
        image: DemoImage,
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
        tags: ['Priority Shipping', 'exclusive'],
        likes: 237,
        colors: '12 Colors',
        wished: false,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: 'High Collar Blouson',
        image: DemoImage,
        specialPrice: '$245.00',
        sale: '10%',
        likes: 1,
        colors: '5 Colors',
        wished: false,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: '',
        image: DemoImage,
        originalPrice: 'IDR100,487,999.72',
        specialPrice: 'IDR100,279,999.76',
        sale: '10%',
        tags: ['Priority Shipping'],
        likes: 0,
        colors: '2 Colors',
        wished: false,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: 'Top Top toptoptoptotp',
        image: DemoImage,
        originalPrice: 'IDR100,487,999.72',
        specialPrice: 'IDR20,279',
        sale: '80%',
        tags: ['Priority Shipping'],
        likes: 0,
        colors: '',
        wished: false,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: '',
        image: DemoImage,
        specialPrice: 'IDR100,279,999.76',
        sale: '',
        tags: ['Priority Shipping'],
        likes: 127,
        colors: '7 Colors',
        wished: true,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjacketsjacketsjackets',
        image: DemoImage,
        originalPrice: '$10.100.245.00',
        specialPrice: '$10.100.245.00',
        sale: '90%',
        likes: 8,
        colors: '',
        wished: false,
        soldout: true
    },
    {
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjacketsjacketsjackets',
        image: DemoImage,
        originalPrice: '$10.100.245.00',
        specialPrice: '$10.100.245.00',
        sale: '90%',
        likes: 8,
        colors: '',
        wished: false,
        soldout: true
    }
]);


// 현재 활성화된 탭 인덱스를 관리하는 변수
const activeTab = ref(0);

// 탭 버튼 클릭 시 호출되는 함수로, 활성화된 탭 인덱스를 업데이트함
const handleMenuClick = (index: number) => {
    activeTab.value = index;
};

// 메뉴 목록 정의
const menus = ['All', 'Coats', 'Jackets', 'Knitwear', 'Tops', 'Dresses', 'Pants', 'Skirts', 'Sale'];


// 버튼 가시성 제어 플래그 설정
const showSearchButton = ref(true); //검색 버튼 표시
const showShareButton = ref(false);  // 공유 버튼 표시
const showCartButton = ref(true);  // 장바구니 버튼 표시
const showHomeButton = ref(false);  // 홈 버튼 미표시


//router
const route = useRoute();
// 메인header 체크
const isMain = computed(() => route.path === '/main');
// 페이지 타이틀
const pageTitle = "Sub Title";
// 동적 컴포넌트 설정
const dynamicComponent = computed(() => isMain.value ? MainHeader : SubHeader);



//탭 ele 타겟
const productTop = ref<HTMLElement | null>(null);

// 스크롤 방향 추적 변수
let lastScrollTop = 0;
// 전역 scrollTop 변수 선언
let scrollTop = 0;

// 스크롤 이벤트 핸들러
const handleScroll = () => {
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    const productTopElement = productTop.value;

    if (productTopElement) {
        const stickyThreshold = productTopElement.offsetTop;
        // 스크롤 방향 계산
        if (scrollTop > lastScrollTop) {
            // 스크롤 다운
            if (scrollTop >= stickyThreshold) {
                productTopElement.classList.add('down');
                productTopElement.classList.remove('up');
            }
        } else {
            // 스크롤 업
            if (productTopElement.classList.contains('down')) {
                productTopElement.classList.remove('down');
                productTopElement.classList.add('up');
            }
        }
        lastScrollTop = scrollTop;
    }
};

// 스크롤 방향 함수 밑으로 내릴때
const onScrollDown = () => {
    const productTopElement = productTop.value;
    if (productTopElement && !productTopElement.classList.contains('down')) {
        productTopElement.classList.add('down');
        productTopElement.classList.remove('up');
    }
};

// 스크롤 방향 함수 밑으로 올릴때
const onScrollUp = () => {
    const productTopElement = productTop.value;
    if (productTopElement && productTopElement.classList.contains('down')) {
        productTopElement.classList.remove('down');
        productTopElement.classList.add('up');
    }
};



onMounted(() => {
    console.log("onMounted");
});

useScroll({
    onScrollDown,
    onScrollUp,
    handleScroll,    // 스크롤 시 항상 호출되는 함수
});

</script>
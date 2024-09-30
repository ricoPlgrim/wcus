<template>
    <component :is="dynamicComponent" :headerBgColor="headerBgColor" :title="pageTitle" :showSearchButton="showSearchButton"
        :showShareButton="showShareButton" :showCartButton="showCartButton" :showHomeButton="showHomeButton" />

    <div class="sub" id="container">
        <div class="content-wrap brands-wrap">
            <div class="list-wrap">
                <VideoSwiper :slides="eventSlides" :modules="true" className="brands-swiper" />
                <div class="search-form form-item">
                    <div class="input-text">
                        <input type="text" name="search" id="sch" v-model="searchTerm" placeholder="Search"
                            @focus="focusOnSearch" />
                        <div class="form-btns">
                            <button type="button" class="btn-clear" :style="{ display: searchTerm.length > 0 ? 'block' : 'none' }" @click="clearSearch">
                                <span class="hidden">Clear</span>
                            </button>
                            <button type="button" class="btn-search">
                                <span class="hidden">Search</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="sticky-box" ref="productTop">
                    <div class="swiper-contents">
                        <menuSwiperComponent ref="menuSwiper" type="v2" :menus="menus" @menuClick="handleMenuClick" />
                    </div>
                    <div class="swiper-contents word">
                        <!-- WordSwiper 컴포넌트는 showWordSwiper 값에 따라 표시/비표시 -->
                        <menuSwiperComponent ref="wordSwiper" type="v7" customClass="word-swiper" :menus="alphabet"
                            v-if="showWordSwiper" @menuClick="menuFindClick" />
                    </div>
                </div>
                <!-- 검색 시 없을 경우 -->
                <NodataText v-if="!showTopBrandList && filteredBrands.length === 0" />
                <!-- 브랜드 리스트 컴포넌트 -->
                <BrandList
                    v-if="!showTopBrandList && !showExclusiveBrandList && !showMyBrandList && filteredBrands.length > 0"
                    :brands="filteredBrands" :selectedAlphabet="selectedAlphabet" @update-wish="handleWishUpdate" />
                <!-- Top 브랜드 리스트 컴포넌트 -->
                <TopBrandList v-if="showTopBrandList" :brands="topBrandData" @update-wish="handleWishTopBrandUpdate" />
                <!-- Exclusive 브랜드 리스트 컴포넌트 -->
                <SpecialBrandList v-if="showExclusiveBrandList" :brands="specialBrands"
                    @update-wish="handleSpecialBrandWishUpdate" />
                <!-- My 브랜드 리스트 컴포넌트 -->
                <MybrandInfo v-if="showMyBrandList" :isLoggedIn="isLoggedIn" :brands="filteredWishBrands"
                    @update-wish="handleWishUpdate" @sign-in="handleSignIn" />
            </div>
        </div>
    </div>
    <Quick />
    <Navigation :NaviBgColor="NaviBgColor" />
    <Footer />
</template>
<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useScroll } from '../../utils/useScroll';


import SubHeader from "../../components/Mo/Header/SubHeader.vue";
import MainHeader from "../../components/Mo/Header/MainHeader.vue";
import Navigation from "../../components/Mo/Navigation/NavigationComponent.vue";
import Quick from "../../components/Mo/Quick/QuickComponent.vue";
import Footer from "../../components/Mo/Footer/FooterComponent.vue";
import VideoSwiper from '../../components/Mo/Swiper/VideoSwiper.vue';
import menuSwiperComponent from '../../components/Mo/Swiper/MenuIndex.vue';
import NodataText from './NodataText.vue';

import BrandList from './BrandList.vue';
import TopBrandList from './TopBrandList.vue';
import SpecialBrandList from './SpecialBrandList.vue';
import MybrandInfo from './MybrandList.vue';


import slideImage from '@/assets/mo/images/temp/@temp_brand_banner01.png';
import topBrandImg1 from '@/assets/mo/images/temp/@temp_brand_01.png';
import topBrandImg2 from '@/assets/mo/images/temp/@temp_brand_02.png';
import topBrandImg3 from '@/assets/mo/images/temp/@temp_brand_03.png';
import topBrandImg4 from '@/assets/mo/images/temp/@temp_brand_04.png';

import specialBrandImg4 from '@/assets/mo/images/temp/@temp_special_brand.png';



// 로그인 여부를 저장하는 상태
const isLoggedIn = ref(false);

// 로그인 처리 함수
const handleSignIn = () => {
    isLoggedIn.value = true;
};

// 이벤트 슬라이드 데이터 정의
interface VisualItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    link: string;
}

const eventSlides = ref<VisualItem[]>([
    { type: 'image', src: slideImage, alt: 'visual', link: '/' },
    { type: 'image', src: slideImage, alt: 'visual', link: '/' },
    { type: 'video', src: 'https://player.vimeo.com/video/744484163', link: '/' },
    { type: 'image', src: slideImage, alt: 'visual', link: '/' }
]);

// 메뉴 항목 정의
const menus = ['ALL', 'WOMEN', 'MEN', 'K-BEAUTY', 'LIFE', 'TOP BRANDS', 'EXCLUSIVE BRANDS', 'MY'];
const alphabet = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#', '0-9'];

// 스와이퍼 컴포넌트에 대한 참조
const menuSwiper = ref<InstanceType<typeof menuSwiperComponent> | null>(null);
const wordSwiper = ref<InstanceType<typeof menuSwiperComponent> | null>(null);

// 선택된 알파벳을 저장하는 상태
const selectedAlphabet = ref('All');

// TopBrandList 활성화를 위한 상태
const showTopBrandList = ref(false);
const showMyBrandList = ref(false); // My 브랜드 리스트 활성화 상태
// 브랜드 데이터 정의
interface Brand {
    name: string;
    exclusive: boolean;
    wish: boolean;
}
// 모든 브랜드 데이터
const brands = ref<Brand[]>([
    { name: 'AAC', exclusive: true, wish: false },
    { name: 'AACA', exclusive: false, wish: false },
    { name: 'AAKAM', exclusive: true, wish: true },
    { name: 'Aalok', exclusive: false, wish: false },
    { name: 'AARAN', exclusive: true, wish: false },
    { name: 'B.Bell', exclusive: false, wish: false },
    { name: 'CocaCola', exclusive: true, wish: true },
    { name: 'DA:EL', exclusive: true, wish: false },
    { name: 'DAISY SYNDROME', exclusive: false, wish: true },
    { name: 'DAYNEEDS', exclusive: true, wish: true },
    { name: 'Deareal', exclusive: false, wish: false },
    { name: 'DEW E DEW E', exclusive: true, wish: true },
    { name: 'EAAH', exclusive: false, wish: false },
    { name: 'EASTSERVICESHOP', exclusive: true, wish: false },
    { name: 'edel9', exclusive: false, wish: true },
    { name: 'edition.B MASK', exclusive: true, wish: false },
    { name: 'eglips', exclusive: false, wish: true },
    { name: 'EJnolee', exclusive: true, wish: false },
    { name: 'ELEGANCE PARIS', exclusive: false, wish: false },
    { name: 'FABER FINGER', exclusive: true, wish: true },
    { name: 'FACE FACTORY', exclusive: false, wish: true },
    { name: 'FAKEME', exclusive: true, wish: false },
    { name: 'F.cocoromiz', exclusive: false, wish: true },
    { name: 'FFEFF STUDIO', exclusive: true, wish: false },
    { name: 'Finoacinque', exclusive: false, wish: true },
    { name: 'Foli', exclusive: true, wish: false },
    { name: 'GABRIEL LEE', exclusive: false, wish: true },
    { name: 'gaimo', exclusive: true, wish: false },
    { name: 'GARDENS MARKET PL', exclusive: false, wish: true },
    { name: 'GIANNA', exclusive: true, wish: false },
    { name: 'GEEKTA', exclusive: false, wish: true },
    { name: 'H8', exclusive: true, wish: false },
    { name: 'Hackesch', exclusive: false, wish: true },
    { name: 'hamel', exclusive: true, wish: false },
    { name: 'IANNMORE', exclusive: false, wish: true },
    { name: 'IFYOUWANT', exclusive: true, wish: false },
    { name: 'Ike', exclusive: false, wish: true },
    { name: 'iriver', exclusive: true, wish: false },
    { name: 'JAMIEWANDER', exclusive: false, wish: true },
    { name: 'JEDREFEB5', exclusive: true, wish: false },
    { name: 'Jinny Kim', exclusive: false, wish: true },
    { name: 'jubine', exclusive: true, wish: false },
    { name: 'kamomekitchen', exclusive: false, wish: true },
    { name: 'KEEN', exclusive: true, wish: false },
    { name: 'kellykelly', exclusive: false, wish: true },
    { name: 'LAB101', exclusive: true, wish: false },
    { name: 'La dolf', exclusive: false, wish: true },
    { name: 'LAIDBACK', exclusive: true, wish: false },
    { name: 'LANGSON', exclusive: false, wish: true },
    { name: 'LAPRICALA', exclusive: true, wish: false },
    { name: 'M082', exclusive: false, wish: true },
    { name: 'MACK BARRY', exclusive: true, wish: false },
    { name: 'macky', exclusive: false, wish: true },
    { name: 'na`au', exclusive: true, wish: false },
    { name: 'naturie', exclusive: false, wish: true },
    { name: 'NDOD', exclusive: true, wish: false },
    { name: 'OA', exclusive: false, wish: true },
    { name: 'OCEAN PACIFIC', exclusive: true, wish: false },
    { name: 'oenir', exclusive: false, wish: true },
    { name: 'palepaler', exclusive: true, wish: false },
    { name: 'parachute', exclusive: false, wish: true },
    { name: 'PEACHPOPO', exclusive: true, wish: false },
    { name: 'Qduroy', exclusive: false, wish: true },
    { name: 'QUA-T', exclusive: true, wish: false },
    { name: 'QUEENMADE', exclusive: false, wish: true },
    { name: 'RACHEL COX', exclusive: true, wish: false },
    { name: 'Rael BALANCE', exclusive: false, wish: true },
    { name: 'Ramolin', exclusive: true, wish: false },
    { name: 'RAWFINED', exclusive: false, wish: true },
    { name: 'Recur,ecur', exclusive: true, wish: false },
    { name: 's2nd', exclusive: false, wish: true },
    { name: 'salad bowls', exclusive: true, wish: false },
    { name: 'SAMPAR', exclusive: false, wish: true },
    { name: 'tae-perfume', exclusive: true, wish: false },
    { name: 'TAILORSTUDIO', exclusive: false, wish: true },
    { name: 'TALLO', exclusive: true, wish: false },
    { name: 'UFCSPORT', exclusive: false, wish: true },
    { name: 'vaca', exclusive: true, wish: false },
    { name: 'VACHIMAKER', exclusive: false, wish: true },
    { name: 'valluat', exclusive: true, wish: false },
    { name: 'WAAR', exclusive: false, wish: true },
    { name: 'weeknders', exclusive: true, wish: false },
    { name: 'WETHEROAD', exclusive: false, wish: true },
    { name: 'xenia taler', exclusive: true, wish: false },
    { name: 'XTI', exclusive: false, wish: true },
    { name: 'XTONZ', exclusive: true, wish: false },
    { name: 'YAN13', exclusive: false, wish: true },
    { name: 'yieyie', exclusive: true, wish: false },
    { name: 'YOUNGOH', exclusive: false, wish: true },
    { name: 'YAN13', exclusive: true, wish: false },
    { name: 'zeezeezee', exclusive: false, wish: true },
    { name: 'ZOENA', exclusive: true, wish: false },
    { name: 'ZYELISH', exclusive: false, wish: true },
    { name: 'Zebra', exclusive: true, wish: false },
    { name: '123Brand', exclusive: false, wish: true },
    { name: '1064STUDIO', exclusive: true, wish: false },
    { name: '1159STUDIOS', exclusive: false, wish: true },
    { name: '1989STANDARD', exclusive: true, wish: false },
    { name: '(block)', exclusive: false, wish: true }
]);

// 선택된 알파벳에 맞는 브랜드를 필터링
const filteredBrands = computed(() => {
    let filtered = brands.value;
    
    // 선택된 알파벳 필터
    if (selectedAlphabet.value !== 'All') {
        if (selectedAlphabet.value === '#') {
            filtered = filtered.filter(brand => /^[^a-zA-Z0-9]/.test(brand.name));
        } else if (selectedAlphabet.value === '0-9') {
            filtered = filtered.filter(brand => /^[0-9]/.test(brand.name));
        } else {
            filtered = filtered.filter(brand => brand.name.startsWith(selectedAlphabet.value));
        }
    }

    // 검색어 필터
    if (searchTerm.value) {
        const searchTermLower = searchTerm.value.toLowerCase();
        filtered = filtered.filter(brand => brand.name.toLowerCase().includes(searchTermLower));
    }

    return filtered;
});



// 메뉴 클릭 시 선택된 알파벳 업데이트
const menuFindClick = (index: number) => {
    selectedAlphabet.value = alphabet[index];
    console.log(`알파벳 선택==>: ${selectedAlphabet.value}`);
};

// WordSwiper를 제어하기 위한 상태
const showWordSwiper = ref(true);
const showExclusiveBrandList = ref(false); // Exclusive 브랜드 리스트 활성화 상태 추가


// 메뉴 클릭 시 선택된 항목 업데이트 및 컴포넌트 활성화 제어
const handleMenuClick = (index: number) => {
    const selectedMenu = menus[index];

    switch (selectedMenu) {
        case 'TOP BRANDS':
            showTopBrandList.value = true;    // TopBrandList 활성화
            showExclusiveBrandList.value = false;  // ExclusiveBrandList 비활성화
            showMyBrandList.value = false;  // MyBrandList 비활성화
            showWordSwiper.value = false;    // WordSwiper 비활성화
            break;

        case 'EXCLUSIVE BRANDS':
            showExclusiveBrandList.value = true;   // ExclusiveBrandList 활성화
            showTopBrandList.value = false;  // TopBrandList 비활성화
            showMyBrandList.value = false;   // MyBrandList 비활성화
            showWordSwiper.value = false;    // WordSwiper 비활성화
            break;

        case 'MY':
            showMyBrandList.value = true;    // MyBrandList 활성화
            showTopBrandList.value = false;  // TopBrandList 비활성화
            showExclusiveBrandList.value = false;  // ExclusiveBrandList 비활성화
            showWordSwiper.value = false;    // WordSwiper 비활성화
            break;

        default:
            showWordSwiper.value = true;     // WordSwiper 활성화
            showTopBrandList.value = false;  // TopBrandList 비활성화
            showExclusiveBrandList.value = false;  // ExclusiveBrandList 비활성화
            showMyBrandList.value = false;   // MyBrandList 비활성화
            break;
    }
};

// wish 상태 변경 처리
const handleWishUpdate = (updatedBrand: Brand) => {
    const brandIndex = brands.value.findIndex(brand => brand.name === updatedBrand.name);
    if (brandIndex !== -1) {
        brands.value[brandIndex].wish = !brands.value[brandIndex].wish;
    }
};

// 브랜드 데이터 정의
const topBrandData = ref([
    {
        name: 'NAMING',
        wish: true,
        images: [
            { src: topBrandImg1, alt: 'NAMING image 1' },
            { src: topBrandImg2, alt: 'NAMING image 2' },
            { src: topBrandImg3, alt: 'NAMING image 3' },
            { src: topBrandImg4, alt: 'NAMING image 4' },
            { src: topBrandImg1, alt: 'NAMING image 1' },
            { src: topBrandImg2, alt: 'NAMING image 2' },
            { src: topBrandImg3, alt: 'NAMING image 3' },
            { src: topBrandImg4, alt: 'NAMING image 4' },
        ]
    },
    {
        name: 'FACE FACTORY',
        wish: true,
        images: [
            { src: topBrandImg1, alt: 'FACE FACTORY image 1' },
            { src: topBrandImg2, alt: 'FACE FACTORY image 2' },
            { src: topBrandImg3, alt: 'FACE FACTORY image 3' },
            { src: topBrandImg4, alt: 'FACE FACTORY image 4' },
            { src: topBrandImg3, alt: 'FACE FACTORY image 3' },
            { src: topBrandImg2, alt: 'FACE FACTORY image 2' },
            { src: topBrandImg1, alt: 'FACE FACTORY image 1' },
        ]
    },
    {
        name: 'ROSEMONT',
        wish: false,
        images: [
            { src: topBrandImg2, alt: 'ROSEMONT image 2' },
            { src: topBrandImg1, alt: 'ROSEMONT image 1' },
            { src: topBrandImg4, alt: 'ROSEMONT image 4' },
            { src: topBrandImg3, alt: 'ROSEMONT image 3' },
        ]
    },
    {
        name: 'INSTANTFUNK',
        wish: false,
        images: [
            { src: topBrandImg4, alt: 'INSTANTFUNK image 4' },
            { src: topBrandImg2, alt: 'INSTANTFUNK image 2' },
            { src: topBrandImg1, alt: 'INSTANTFUNK image 1' },
            { src: topBrandImg3, alt: 'INSTANTFUNK image 3' },
        ]
    }
]);


//top brand wish event
const handleWishTopBrandUpdate = (updatedBrand: any) => {
    const brandIndex = topBrandData.value.findIndex(brand => brand.name === updatedBrand.name);
    if (brandIndex !== -1) {
        topBrandData.value[brandIndex].wish = !topBrandData.value[brandIndex].wish;
    }
};

//specialbrand 데이터정의
const specialBrands = ref([
    {
        name: 'FRONTROW',
        imageSrc: specialBrandImg4,
        description: 'FRONTROW brings you the latest trends with elegance.',
        wish: true,
        link: "/DetailBrand"
    },
    {
        name: 'MAGJAY',
        imageSrc: specialBrandImg4,
        description: 'MAGJAY believes that fashion that can be with you for a long time can express yourself most like yourself while reducing the impact on the environment. That\'s why we\'re making a collection of highly sensitive materials so that we can be together for a long time.',
        wish: false,
        link: "/DetailBrand"
    },
]);


//specialbrand wish event
const handleSpecialBrandWishUpdate = (updatedBrand: any) => {
    const brandIndex = specialBrands.value.findIndex(brand => brand.name === updatedBrand.name);
    if (brandIndex !== -1) {
        specialBrands.value[brandIndex].wish = !specialBrands.value[brandIndex].wish;
    }
};

//wish true값만 전달
const filteredWishBrands = computed(() => {
    return brands.value.filter(brand => brand.wish === true);
});


// 인풋 초기값 - 첫 번째 슬라이드로 이동하는 로직 추가
const focusOnSearch = async () => {
    // selectedAlphabet 업데이트나 다른 초기화 작업을 수행
    selectedAlphabet.value = 'All';
    showWordSwiper.value = true;

    // wordSwiper 컴포넌트가 렌더된 후 0번째 인덱스를 설정
    await nextTick();  // 컴포넌트가 렌더되기를 기다림
    if (wordSwiper.value) {
        wordSwiper.value.onMenuClick('v7', 0);  // v7 타입의 0번째 인덱스를 활성화
    }
};


// 스크롤 방향 추적 변수
let lastScrollTop = 0;
// 전역 scrollTop 변수 선언
let scrollTop = 0;

// 내부 참조 정의
const productTop = ref<HTMLElement | null>(null);
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




//검색어 입력
const searchTerm = ref('');

//검색어 초기화 함수
const clearSearch = () => {
    searchTerm.value = '';  // 검색어를 빈 값으로 설정
};
//router
const route = useRoute();

// 메인 header 체크
const isMain = computed(() => route.path === '/main');

// 동적 컴포넌트 설정
const dynamicComponent = computed(() => isMain.value ? MainHeader : SubHeader);

// 헤더 배경값
const headerBgColor = '';

// 페이지 타이틀
const pageTitle = "Brands";

// 네비게이션 배경값
const NaviBgColor = '';

// 버튼 가시성 제어 플래그 설정
const showSearchButton = ref(true); // 검색 버튼 표시
const showShareButton = ref(false);  // 공유 버튼 표시
const showCartButton = ref(true);  // 장바구니 버튼 표시
const showHomeButton = ref(false);  // 홈 버튼 미표시


useScroll({
    onScrollDown,
    onScrollUp,
    handleScroll,    // 스크롤 시 항상 호출되는 함수
});
</script>
  
  
<template>
    <component :is="dynamicComponent" :headerBgColor="headerBgColor" :showSearchButton="showSearchButton"
        :showShareButton="showShareButton" :showCartButton="showCartButton" :showHomeButton="showHomeButton" />

    <div class="sub" id="container">
        <div class="content-wrap brands-wrap">
            <div class="detail-wrap">
                <BrandDetailTop :brandData="brandData" />
                <div class="detail-scroll">
                    <DetailImgBox :imageData="imageData" />
                    <DetailVideoBox :videoData="videoData" />
                    <DetailBrandTag :title="shopByEditsData.title" :tags="shopByEditsData.tags" />
                    <DetailBanner  />
                    <DetailPlanDepth />
                <ProductList :products="products" customClass="top-ranking" :showRanking="false" />
                </div>
            </div>
        </div>
    </div>
    <Quick />
    <Navigation :NaviBgColor="NaviBgColor" />
    <Footer />
</template>
<script setup lang="ts">
import { ref, computed, } from 'vue';
import { useRoute } from 'vue-router';


import SubHeader from "../../components/Mo/Header/SubHeader.vue";
import MainHeader from "../../components/Mo/Header/MainHeader.vue";
import Navigation from "../../components/Mo/Navigation/NavigationComponent.vue";
import Quick from "../../components/Mo/Quick/QuickComponent.vue";
import Footer from "../../components/Mo/Footer/FooterComponent.vue";

import BrandDetailTop from "./DeatailTop.vue";
import DetailImgBox from "./DetailImgBox.vue";
import DetailVideoBox from "./DetailVideoBox.vue";
import DetailBrandTag from "./DetailBrandTag.vue";
import DetailBanner from "./DetailBanner.vue"
import DetailPlanDepth from "./DetailPlanDepth.vue"
import ProductList from '../../components/Mo/Component/Product/ProductList.vue';
import { Product } from '../../components/Mo/Component/Product/ProductTypes';


import DemoImage from '@/assets/mo/images/temp/@temp_prd_image.png';
import specialBrandImg4 from '@/assets/mo/images/temp/@temp_special_brand.png';



// SNSLink 타입 정의
interface SNSLink {
    url: string;
    username: string;
}
// BrandData 타입 정의
interface BrandData {
    brandName: string;
    wishCount: string;
    snsLink: SNSLink;
    description: string;
}

// props로 전달할 데이터를 하나의 객체로 정의
const brandData: BrandData = {
    brandName: 'VERSACE',
    wishCount: '999',
    snsLink: {
        url: 'https://instagram.com/official_frontrow',
        username: 'Official_Frontrow'
    },
    description: `
    The brand’s collections are handspun by artisans in the UK and Ireland using only natural yarns in small batch quantities to ensure that lasting quality and. The brand’s collections are handspun by artisans in the UK and Ireland using only natural yarns in small batch quantities to ensure that lasting quality and.
    `
};


// 이미지 데이터 객체
const imageData = {
    imgSrc: specialBrandImg4,
    imgAlt: "Special Brand Image"
};

// 비디오 데이터 객체
const videoData = {
    videoSrc: "https://player.vimeo.com/video/249908774"
};

//tag data
const shopByEditsData = {
    title: "Shop by Edits",
    tags: [
        { text: "THIS WEEK'S DEAL: TRUNK PROJECT", link: "/deal-trunk-project" },
        { text: "RAIVE SS23", link: "/raive-ss23" },
        { text: "THE LIGHT BAGS", link: "/the-light-bags" },
        { text: "KOMOREBI MUSEUM SUMMER'23", link: "/komorebi-museum-summer23" }
    ]
};

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





//router
const route = useRoute();

// 메인 header 체크
const isMain = computed(() => route.path === '/main');

// 동적 컴포넌트 설정
const dynamicComponent = computed(() => isMain.value ? MainHeader : SubHeader);

// 헤더 배경값
const headerBgColor = '';


// 네비게이션 배경값
const NaviBgColor = '';

// 버튼 가시성 제어 플래그 설정
const showSearchButton = ref(true); // 검색 버튼 표시
const showShareButton = ref(false);  // 공유 버튼 표시
const showCartButton = ref(true);  // 장바구니 버튼 표시
const showHomeButton = ref(false);  // 홈 버튼 미표시



</script>
  
  
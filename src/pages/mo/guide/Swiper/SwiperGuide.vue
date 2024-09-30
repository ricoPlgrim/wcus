<template>
    <AsideNav />
    <div class="page-guide-content">
        <h2 class="page-guide-title">Swiper</h2>
        <h3 class="page-guide-title2">visual</h3>
        <div class="page-guide-box">
            <p class="text">* loading="lazy"</p>
            <!--비주얼 영역 스와이퍼-->
            <SwiperComponent type="visual" :slides="visualSlides" />
        </div>

        <h3 class="page-guide-title2">product</h3>
        <div class="page-guide-box">
            <p class="text">* slidesPerView: 2, slidesPerView: 2.2, slidesPerView: 3 으로 조정해서 사용</p> <br>
            <!-- Swiper -->
            <SwiperComponent type="recom" :slides="recommendSlides" />
        </div>
        <h3 class="page-guide-title2">menu</h3>
        <div class="page-guide-box">
            <menuSwiperComponent type="v1" :menus="menus" />
            <menuSwiperComponent type="v2" :menus="menus" />
            <menuSwiperComponent type="v3" :menus="menus" />
        </div>

        <h3 class="page-guide-title2">3D effect</h3>
        <div class="page-guide-box">
        <!-- 코너 스와이퍼 컴포넌트 -->
            <conerSwiperComponent :isCornerSwiper="true" />
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import AsideNav from '../Gnb/AsideNav.vue';
import SwiperComponent from '../../../../components/Mo/Swiper/SwiperComponent.vue';
import menuSwiperComponent from '../../../../components/Mo/Swiper/MenuIndex.vue';
import conerSwiperComponent from '../../../../components/Mo/Swiper/CornerIndex.vue';
import slideImage from '@/assets/mo/images/temp/@temp_visaul.png';
import slideImage2 from '@/assets/mo/images/temp/@temp_prd_image.png';
import slideImage3 from '@/assets/mo/images/temp/@temp_product.jpg';

// 비주얼 영역 슬라이드 데이터
const visualSlides = ref([
    {
        imageSrc: slideImage,
        altText: 'SPRING BIG SALE 2023 EVENT',
        title: 'SPRING BIG SALE<br>2023 EVENT',
        description: 'SS Product at Weekly Special Price',
    },
    {
        imageSrc: slideImage,
        altText: 'SPRING BIG SALE 2023 EVENT',
        title: 'SPRING BIG SALE<br>2023 EVENT',
        description: 'SS Product at Weekly Special Price',
    },
    {
        imageSrc: slideImage,
        altText: 'SPRING BIG SALE 2023 EVENT',
        title: 'SPRING BIG SALE<br>2023 EVENT',
        description: 'SS Product at Weekly Special Price',
    },
    {
        imageSrc: slideImage,
        altText: 'SPRING BIG SALE 2023 EVENT',
        title: 'SPRING BIG SALE<br>2023 EVENT',
        description: 'SS Product at Weekly Special Price',
    },
    {
        imageSrc: slideImage,
        altText: 'SPRING BIG SALE 2023 EVENT',
        title: 'SPRING BIG SALE<br>2023 EVENT',
        description: 'SS Product at Weekly Special Price',
    },
]);

// 추천 상품 슬라이드 데이터
const recommendSlides = ref([
    {
        imageSrc: slideImage2,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
    },
    {
        imageSrc: slideImage3,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
    },
    {
        imageSrc: slideImage2,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
    },
    {
        imageSrc: slideImage3,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
    },
    // 다른 슬라이드 추가
]);

const menus = ['All Clothing', 'Coats', 'Jackets', 'Knitwear', 'Tops', 'Dresses', 'Pants', 'Skirts', 'Sale'];
</script>
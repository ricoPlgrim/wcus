<template>
    <section>
        <div class="new-wrap">
            <!-- 타이틀, 카운트, 링크를 포함한 TitleWrap 컴포넌트 -->
            <TitleWrap title="What's New" countNum="502" linkHref="#" linkText="View More" />
            <!-- 추천 슬라이드들을 표시하는 SwiperComponent 컴포넌트 -->
            <SwiperComponent type="recom" :loop="false" :showBottomInfo="true" :slides="recommendSlides" />
        </div>

    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TitleWrap from '../Main/Component/TitleBox.vue'
import SwiperComponent from '../../../../components/Mo/Swiper/SwiperComponent.vue';
import slideImage2 from '@/assets/mo/images/temp/@temp_prd_image2.png';
import noImg from '@/assets/mo/images/no_image.png';

//데이터 슬라이드 정의
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
        imageSrc: noImg,
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
        imageSrc: noImg,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
    },
    // 다른 슬라이드 추가
]);

</script>
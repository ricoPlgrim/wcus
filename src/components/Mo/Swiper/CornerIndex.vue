<template>
    <!-- CornerSwiper 모드가 활성화된 경우 -->
    <div v-if="props.isCornerSwiper">
        <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slides-per-view="1.1"
            :pagination="paginationOptions" :coverflowEffect="coverflowEffectOptions" :loop="false" :speed="1000"
            :autoplay="autoplayOptions" :modules="modules" :observer="true" :observe-parents="true" class="corner-swiper">
            <swiper-slide v-for="(slide, index) in slides" :key="index">
                <img :src="slide.imgSrc" :alt="slide.alt">
                <div class="swiper-slide-shadow-left"></div>
                <div class="swiper-slide-shadow-right"></div>
            </swiper-slide>
            <div class="swiper-pagination"></div>
        </swiper>
    </div>
    <!-- CornerSwiper 모드가 비활성화된 경우 -->
    <div v-else class="brand-box">
        <swiper @slideChange="onSlideChange" :effect="'coverflow'" :grabCursor="true" :centeredSlides="true"
            :slides-per-view="1.1" :pagination="paginationOptions" :coverflowEffect="coverflowEffectOptions" :loop="true"
            :loop-additional-slides="1" :autoplay="autoplayOptions" :parallax="true" :modules="modules" :observer="true"
            :observe-parents="true" class="corner-swiper" @swiper="onSwiper">
            <swiper-slide v-for="(slide, index) in etcSlides" :key="index" :data-title="slide.title"
                :data-content="slide.content">
                <div v-if="slide.type === 'image'" class="img-box">
                    <router-link :to="slide.link">
                        <img :src="slide.imgSrc" :alt="slide.alt" />
                    </router-link>
                </div>
                <div v-else-if="slide.type === 'video'" class="video-wrap">
                    <div class="img-box">
                        <div class="video-area">
                            <iframe :src="`${slide.src}?controls=0&muted=1&loop=1`" frameborder="0" allow="autoplay"
                                width="100%" height="100%" webkitallowfullscreen mozallowfullscreen allowfullscreen
                                loop></iframe>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <TextBox :currentSlideTitle="currentSlideTitle" :currentSlideContent="currentSlideContent"
                :buttonHref="buttonHref" :buttonText="buttonText" :buttonClasses="buttonClasses" />
            <div class="swiper-pagination"></div>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination, Parallax } from 'swiper';
import type { Swiper as SwiperType } from 'swiper';
import type { PaginationOptions } from 'swiper/types';

import TextBox from '../../../components/Mo/Component/Main/Component/TextBox.vue';
import TestImg from '@/assets/mo/images/temp/@temp_brand2.png';
import { useVimeo } from '../../../utils/useVimeo';

// 컴포넌트의 props 정의
const props = defineProps<{
    isCornerSwiper: boolean;
}>();

import DemoImg1 from '@/assets/mo/images/temp/@temp_visaul.png'
// CornerSwiper 모드에서 사용할 슬라이드 데이터
const slides = [
    { type: 'image', imgSrc: DemoImg1,  alt: 'SPRING BIG SALE 2023 EVENT' },
    { type: 'image', imgSrc: DemoImg1,  alt: 'SPRING BIG SALE 2023 EVENT' },
    { type: 'image', imgSrc: DemoImg1,  alt: 'SPRING BIG SALE 2023 EVENT' },
    { type: 'image', imgSrc: DemoImg1,  alt: 'SPRING BIG SALE 2023 EVENT' },
    { type: 'image', imgSrc: DemoImg1,  alt: 'SPRING BIG SALE 2023 EVENT' },
];

// CornerSwiper 모드가 비활성화된 컴포넌트에서 사용할 슬라이드 데이터
const etcSlides = [
    {
        type: 'image',
        imgSrc: TestImg,
        link: '/',
        title: 'HERVE1',
        content: 'SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33',
        alt: 'HERVE',
    },
    {
        type: 'video',
        src: 'https://player.vimeo.com/video/249908774',
        title: 'video',
        content: 'SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33SMILE33',
        link: '#',
    },
    {
        type: 'image',
        imgSrc: TestImg,
        link: '/',
        title: 'HERVE2',
        content: 'abc focuses on...',
        alt: 'SPRING BIG SALE 2023 EVENT',
    },
    {
        type: 'image',
        imgSrc: TestImg,
        link: '/',
        title: 'HERVE3',
        content: 'abc focuses on...<br /> abc focuses on<br />abc focuses onabc focuses onabc focuses on',
        alt: 'SPRING BIG SALE 2023 EVENT',
    }
];

// 현재 슬라이드의 제목과 내용을 저장하는 ref 변수
const currentSlideTitle = ref('');
const currentSlideContent = ref('');

// Swiper의 페이지네이션 옵션 설정
const paginationOptions: PaginationOptions = {
    el: '.swiper-pagination',
    type: 'progressbar',
};

// 자동 재생 옵션
const autoplayOptions = {
    delay: 5000,
    disableOnInteraction: false,
};

// 커버플로우 효과 옵션
const coverflowEffectOptions = {
    slideShadows: false,
    rotate: 0,
    stretch: 20,
    depth: 200,
    modifier: 1,
};

// 버튼에 사용할 데이터
const buttonHref = '#';
const buttonText = 'SHOP';
const buttonClasses = 'btn-type2 btn-full';

// 슬라이드 변경 시 호출되는 함수
const onSlideChange = (swiper: SwiperType) => {
    const activeSlide = swiper.slides[swiper.activeIndex] as HTMLElement;
    currentSlideTitle.value = activeSlide.getAttribute('data-title') || '';
    currentSlideContent.value = activeSlide.getAttribute('data-content') || '';
};

// useVimeo initVimeo 함수 가져오기
const swiperInstance = ref<SwiperType | null>(null);

// useVimeo initVimeo 함수 가져오기
const { initVimeo } = useVimeo();

// Swiper가 초기화될 때 호출되는 함수
const onSwiper = (swiper: SwiperType) => {
    swiperInstance.value = swiper;
    initVimeo(swiper);
};

// 컴포넌트가 마운트될 때 초기 설정
onMounted(() => {
    // 초기 슬라이드 데이터 설정
    const swiperElement = document.querySelector('.corner-swiper') as HTMLElement;
    if (swiperElement) {
        const activeSlide = swiperElement.querySelector('.swiper-slide-active') as HTMLElement;
        if (activeSlide) {
            currentSlideTitle.value = activeSlide.getAttribute('data-title') || '';
            currentSlideContent.value = activeSlide.getAttribute('data-content') || '';
        }
    }

    if (swiperInstance.value) {
        initVimeo(swiperInstance.value);
    }
});

// 사용할 Swiper 모듈 정의
const modules = [Autoplay, EffectCoverflow, Pagination, Parallax];

</script>

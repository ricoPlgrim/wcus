<template>
    <div class="scr-item plan-lookbook">
        <h3 class="scr-title">{{ props.title }}</h3>

        <!-- Lookbook Type 1 -->
        <swiper v-if="type === 'lookbook-type01'" :observer="true" :observe-parents="true" :loop-additional-slides="1"
            :slides-per-view="1.06" :space-between="10" :pagination="paginationOptions" :autoplay="autoplayOptions"
            :modules="modules" :class="[customClass, swiperClass]" :loop="computedLoop" @slideChange="onSlideChange">
            <swiper-slide class="swiper-slide" v-for="(slide, index) in props.slides" :key="index"
                :class="{ 'on': index === activeIndex }">
                <router-link to="">
                    <img class="img" :src="slide.imageSrc" :alt="slide.altText" />
                </router-link>
            </swiper-slide>
        </swiper>

        <!-- Lookbook Type 2, Shop 버튼 포함 -->
        <swiper v-else-if="type === 'lookbook-type02'" ref="mainSwiper" class="lookbook-type02 swiper" :modules="modules"
            @swiper="onMainSwiperInit" @slideChange="onSlideChange">
            <swiper-slide class="swiper-slide" v-for="(slide, index) in props.slides" :key="index"
                :class="{ 'on': index === activeIndex }">
                <img class="img" :src="slide.imageSrc" :alt="slide.altText" />
                <button class="btn-shop" @click="handleShopClick(slide, index)">
                    Shop This Look
                </button>
            </swiper-slide>
        </swiper>

        <!-- 썸네일 Swiper -->
        <swiper ref="thumbSwiper" class="lookbook-thumbs swiper" :free-mode="true" :observer="true" :observe-parents="true"
            :slides-per-view="3.33" :space-between="10" :slides-offset-before="20" :slides-offset-after="20"
            :modules="modules" @swiper="onThumbSwiperInit" :scrollbar="scrollbarOptions">
            <swiper-slide class="swiper-slide" v-for="(thumb, index) in props.thumbs" :key="index"
                :class="{ 'on': index === activeIndex }" @click="moveToMainSlide(index)">
                <img class="img" :src="thumb.imageSrc" :alt="thumb.altText" />
            </swiper-slide>
            <div class="swiper-scrollbar"></div>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineEmits } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay, Pagination, Scrollbar, Thumbs } from 'swiper';
import type { Swiper as SwiperInstance, PaginationOptions, ScrollbarOptions } from 'swiper/types';
import { defineProps } from 'vue';

// 슬라이드 인터페이스 정의
interface Slide {
    imageSrc: string;
    altText: string;
}

// props 정의
const props = defineProps<{
    type: 'lookbook-type01' | 'lookbook-type02'; // Lookbook 타입
    title?: string; // 타이틀
    slides?: Slide[]; // 슬라이드 배열
    thumbs?: Slide[]; // 썸네일 배열
    customClass?: string; // 커스텀 클래스
    loop?: boolean; // 루프 여부
}>();

// 메인 및 썸네일 Swiper를 위한 Ref
const mainSwiper = ref<SwiperInstance | null>(null); // 메인 Swiper 참조
const thumbSwiper = ref<SwiperInstance | null>(null); // 썸네일 Swiper 참조

// 현재 슬라이드의 인덱스를 추적하는 상태
const activeIndex = ref<number>(0);

// Pagination 및 Scrollbar 옵션
const paginationOptions: PaginationOptions = {
    el: '.swiper-pagination',
    type: 'progressbar',
};

const scrollbarOptions: ScrollbarOptions = {
    el: '.swiper-scrollbar',
    hide: false,
};

// Autoplay 옵션
const autoplayOptions = {
    delay: 3000,
    disableOnInteraction: false,
};

// Swiper 모듈
const modules = [Autoplay, Pagination, Scrollbar, Thumbs];

// Swiper의 클래스와 루프 여부를 계산하는 computed
const swiperClass = computed(() => {
    return props.type === 'lookbook-type01' ? 'lookbook-type01' : 'lookbook-type02';
});

const computedLoop = computed(() => {
    return props.loop !== undefined ? props.loop : true;
});

// 썸네일 Swiper 초기화 콜백
const onThumbSwiperInit = (swiper: SwiperInstance) => {
    thumbSwiper.value = swiper;
};

// 메인 Swiper 초기화 콜백
const onMainSwiperInit = (swiper: SwiperInstance) => {
    mainSwiper.value = swiper;
};

// 메인 Swiper의 슬라이드 변경 이벤트 핸들러
const onSlideChange = (swiper: SwiperInstance) => {
    activeIndex.value = swiper.activeIndex;

    // 썸네일 Swiper를 메인 슬라이드 인덱스와 동일하게 이동
    if (thumbSwiper.value && typeof thumbSwiper.value.slideTo === 'function') {
        thumbSwiper.value.slideTo(swiper.activeIndex);
    } else {
        console.warn("thumbSwiper가 초기화되지 않았거나 slideTo 메서드를 사용할 수 없습니다.");
    }
};

// 이벤트 정의
const emit = defineEmits(['shopClick']); // 'shopClick' 이벤트 정의

// Shop 버튼 클릭 시 이벤트를 발생시키는 함수
const handleShopClick = (slide: Slide, index: number) => {
    emit('shopClick', { slide, index }); // 부모 컴포넌트에 slide와 index를 함께 전달
    console.log("LookBook handleShopClick ===>", slide, index);
};

// 썸네일 클릭 시 메인 슬라이드로 이동하는 함수
const moveToMainSlide = (index: number) => {
    if (mainSwiper.value && typeof mainSwiper.value.slideTo === 'function') {
        mainSwiper.value.slideTo(index);
    } else {
        console.warn("mainSwiper가 초기화되지 않았거나 slideTo 메서드를 사용할 수 없습니다.");
    }
};
</script>

<template>
    <swiper ref="swiperRef" :observer="true" :observe-parents="true" :slides-per-view="1" class="tab-list-swiper"
        @slideChange="onSlideChange" @swiper="setSwiperInstance">
        <swiper-slide v-for="(item, index) in props.tabSlides" :key="index">
            <div class="brand-box">
                <img :src="item.imgSrc" :alt="item.alt" />
                <div class="text-box" v-html="item.text"></div>
            </div>
        </swiper-slide>
    </swiper>
</template>
  
<script setup lang="ts">
import { ref, defineProps, defineExpose } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';

// 컴포넌트로 전달받는 props 정의
const props = defineProps<{
    tabSlides: Array<{ imgSrc: string; alt: string; text: string }>;
}>();

// Swiper 인스턴스를 참조할 변수
const swiperRef = ref<SwiperType | null>(null);

// slideChange 이벤트를 부모 컴포넌트로 전달하기 위한 emit 정의
const emit = defineEmits(['slideChange']);

// 슬라이드 변경 시 호출되는 함수
const onSlideChange = (swiper: SwiperType) => {
    const activeIndex = swiper.activeIndex;  // 현재 활성화된 슬라이드 인덱스 가져오기
    emit('slideChange', activeIndex);  // 부모 컴포넌트로 인덱스를 전달
};

// Swiper 인스턴스를 설정하는 함수
const setSwiperInstance = (swiper: SwiperType) => {
    swiperRef.value = swiper;  // Swiper 인스턴스를 swiperRef에 저장
};

// 특정 인덱스로 슬라이드를 이동시키는 함수
const slideTo = (index: number) => {
    console.log( "swiperRef===>", swiperRef );
    if (swiperRef.value) {
        swiperRef.value.slideTo(index);  // Swiper 인스턴스를 사용해 슬라이드를 이동
    }
};

// 부모 컴포넌트에서 호출할 수 있도록 slideTo 메서드 노출
defineExpose({
    slideTo,
});
</script>

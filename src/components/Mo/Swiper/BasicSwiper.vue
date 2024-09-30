<template>
    <swiper :observer="true" :observe-parents="true" :slides-per-view="1" :space-between="10"
        :pagination="paginationOptions" :modules="modules" @swiper="onSwiper" class="highlights-swiper">
        <swiper-slide v-for="(slide, index) in props.slides" :key="index">
            <!-- 슬라이드가 비디오인 경우 -->
            <template v-if="slide.type === 'video'">
                <div class="video-wrap">
                    <div class="video-area">
                        <iframe
                            :src="`${slide.videoSrc}?controls=0&muted=1&loop=1`"
                            frameborder="0"
                            allow="autoplay"
                            data-ready="true"
                            width="100%"
                            height="100%"
                            webkitallowfullscreen
                            mozallowfullscreen
                            allowfullscreen
                        ></iframe>
                    </div>
                    <div class="img-box">
                        <img :src="slide.imgSrc" :alt="slide.alt">
                    </div>
                </div>
            </template>
               <!-- 슬라이드가 이미지인 경우 -->
            <template v-else>
                <div class="img-box">
                    <router-link :to="slide.link">
                        <img :src="slide.imgSrc" :alt="slide.alt">
                    </router-link>
                </div>
            </template>
              <!-- 슬라이드에 표시될 텍스트 박스 -->
            <div class="text-box">
                <a :href="slide.link"><strong>{{ slide.title }}</strong></a>
                <p>{{ slide.caption }}</p>
                <a :href="slide.link" class="btn-type2 btn-full">{{ slide.buttonText }}</a>
            </div>
        </swiper-slide>
        <!-- Swiper 페이지네이션 표시 영역 -->
        <div class="swiper-pagination"></div>
    </swiper>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Parallax } from 'swiper';
import type { PaginationOptions } from 'swiper/types';
import { useVimeo } from '../../../utils/useVimeo';

// 컴포넌트의 props 정의
const props = defineProps<{
    slides: Array<{
        type: string;
        imgSrc: string;
        alt: string;
        videoSrc?: string;
        title: string;
        caption: string;
        link: string;
        buttonText: string;
    }>;
}>();

// Swiper의 페이지네이션 옵션 설정
const paginationOptions: PaginationOptions = {
    el: '.swiper-pagination',
    type: 'progressbar',
};

// 사용할 스위퍼 모듈
const modules = [Autoplay, Pagination, Parallax];

// Swiper 인스턴스를 보유하는 참조
const swiperInstance = ref<SwiperType | null>(null);

// Vimeo 비디오 초기화를 위한 함수 가져오기
const { initVimeo } = useVimeo();


// Swiper 초기화 시 호출되는 함수
function onSwiper(swiper: SwiperType): void {
    swiperInstance.value = swiper;
    initVimeo(swiper);
}
</script>

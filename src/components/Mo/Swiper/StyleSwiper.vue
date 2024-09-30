<template>
    <swiper :observer="true" :observe-parents="true" :slides-per-view="1" :space-between="10"
        :pagination="paginationOptions" :modules="modules" class="style-swiper">
        <swiper-slide v-for="(slide, index) in props.slides" :key="index">
            <a href="#">
                <div class="img-box">
                    <img :src="slide.imgSrc" :alt="slide.alt" />
                </div>
                <div class="text-box">
                    <div class="inner-box">
                        <h3 class="title-type2 v2" v-html="slide.title"></h3>
                        <p class="sub-title-type">{{ slide.subtitle }}</p>
                    </div>
                </div>
            </a>
            <BtnType2Components :buttons="[
                 { href: slide.link, text: slide.buttonText, classes: 'btn-type2 btn-full' },
            ]" />
        </swiper-slide>
        <div class="swiper-pagination"></div>
    </swiper>
</template>

<script setup lang="ts">
import BtnType2Components from '../../../components/Mo/Buttons/BtnType2.vue';
import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Parallax } from 'swiper';
import type { PaginationOptions } from 'swiper/types';

//props 정의
const props = defineProps<{
    slides: Array<{
        imgSrc: string;
        alt: string;
        title: string;
        subtitle: string;
        link: string;
        buttonText: string;
    }>;
}>();

// 페이지 매김 옵션 정의
const paginationOptions: PaginationOptions = {
    el: '.swiper-pagination',
    type: 'progressbar',
};

// 사용할 스위퍼 모듈
const modules = [Pagination, Parallax];


</script>

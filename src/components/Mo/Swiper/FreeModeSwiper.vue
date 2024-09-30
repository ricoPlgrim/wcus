<template>
       <swiper :observer="true" :observe-parents="true" :slides-per-view="2.2253" :space-between="10" :freeMode="true"
        :slidesOffsetBefore="20" :slidesOffsetAfter="20">
        <swiper-slide v-for="(slide, index) in props.slides" :key="index" >
            <slot :slide="slide"></slot>
        </swiper-slide>
    </swiper>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';

// props 정의
const props = defineProps<{
    slides: Array<{
        imgSrc: string;
        alt: string;
        title: string;
        price: string;
        sale: string;
        originalPrice?: string;
    }>;
}>();


</script>

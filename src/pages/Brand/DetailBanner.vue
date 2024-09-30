<template>
    <div class="scr-item brand-event">
        <CountSwiper   :slides="eventSlides"  className="event-swiper2"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CountSwiper from '@/components/Mo/Swiper/CountSwiper.vue';
import TempImg from '@/assets/mo/images/temp/@temp_banner.png';

// 이벤트 슬라이드 데이터 정의
interface VisualItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    link: string;
}

const eventSlides = ref<VisualItem[]>([
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'video',
        src: 'https://player.vimeo.com/video/744484163',
        link: '/',
    },
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    }
]);





</script>
  
  


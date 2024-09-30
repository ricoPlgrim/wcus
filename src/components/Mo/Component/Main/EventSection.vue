<template>
    <section>
        <div class="event-wrap">
            <!-- 이벤트 슬라이드를 표시하는 CountSwiper 컴포넌트 -->
            <CountSwiper :slides="eventSlides" className="event-swiper" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CountSwiper from '../../Swiper/CountSwiper.vue'
import TempImg from '../../../../assets/mo/images/temp/@temp_banner.png';
import TempImg3 from '../../../../assets/mo/images/temp/@temp_banner3.png';


interface VisualItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    link: string;
}


// 이벤트 슬라이드 데이터 정의
const eventSlides = ref<VisualItem[]>([
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'image',
        src: TempImg3,
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
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
]);

</script>
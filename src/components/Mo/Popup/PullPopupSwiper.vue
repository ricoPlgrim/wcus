<template>
    <div :class="['pop-full', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-detailImg">
        <div class="dim" @click="closePopup"></div>
        <div class="pop-wrap">
            <div class="pop-title">
                <button class="pop-close" @click="closePopup">
                    <i class="ico-close"></i><span class="hidden">닫기</span>
                </button>
            </div>
            <div class="pop-content">
                <ProductSwiper :slides="visualItem"  customClass="popup" type="popup" :initialIndex="selectedIndex"
                    @swiper="handleSwiperInstance" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose, nextTick } from 'vue';
import { Swiper as SwiperType } from 'swiper';
import ProductSwiper from "../../Mo/Swiper/ProductSwiper.vue";

// Image Imports
import visualImg1 from '@/assets/mo/images/temp/@temp_prd_image2.png';
import visualImg2 from '@/assets/mo/images/temp/@temp_prd_image3.png';
import visualImg3 from '@/assets/mo/images/temp/@temp_prd_image4.png';
import visualImg4 from '@/assets/mo/images/temp/@temp_prd_image5.png';
import visualImg5 from '@/assets/mo/images/temp/@temp_prd_image6.png';
import visualImg6 from '@/assets/mo/images/temp/@temp_visaul.png';

const props = defineProps<{ selectedIndex: number }>();

// Visual Item 인터페이스 정의
interface VisualItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
}

// Visual Items 데이터
const visualItem = ref<VisualItem[]>([
    { type: 'image', src: visualImg1, alt: 'visual' },
    { type: 'video', src: 'https://player.vimeo.com/video/249908774' },
    { type: 'image', src: visualImg2, alt: 'visual' },
    { type: 'image', src: visualImg3, alt: 'visual' },
    { type: 'video', src: 'https://player.vimeo.com/video/524933864' },
    { type: 'image', src: visualImg4, alt: 'visual' },
    { type: 'image', src: visualImg5, alt: 'visual' },
    { type: 'image', src: visualImg6, alt: 'visual' },
]);

// Popup 상태 관리
const isVisible = ref(false);

// Swiper 인스턴스 관리
const swiperInstance = ref<SwiperType | null>(null);

// Swiper 인스턴스를 설정하는 함수
const handleSwiperInstance = (swiper: SwiperType) => {
    swiperInstance.value = swiper;
};

// 팝업 열기 함수
const openPopup = () => {
    isVisible.value = true;
    nextTick(() => {
        if (swiperInstance.value && props.selectedIndex !== undefined) {
            // Swiper가 초기화되고 나서 슬라이드로 이동
            swiperInstance.value.slideTo(props.selectedIndex, 0); // 0으로 설정하여 즉시 이동
        }
    });

};

// 팝업 닫기 함수
const closePopup = () => {
    isVisible.value = false;
};

// 화면에 가시성을 업데이트할 때 바디의 오버플로우를 관리
watch(isVisible, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});

// openPopup과 closePopup을 외부에서 사용할 수 있도록 정의
defineExpose({ openPopup, closePopup });
</script>

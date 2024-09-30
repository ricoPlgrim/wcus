<template>
  <!-- Swiper 컴포넌트를 정의 -->
  <swiper :observer="true" :observe-parents="true" :loop="true" :pagination="paginationOptions"
    :autoplay="autoplayOptions" :modules="modules" :class="className" @swiper="onSwiper">
    <swiper-slide v-for="(slide, index) in props.slides" :key="index">
      <router-link :to="slide.link" :style="{ display: 'block', height: videoHeight ? `${videoHeight}px` : 'auto' }">
        <!-- 이미지 타입 슬라이드 -->
        <div v-if="slide.type === 'image'" class="img-box">
          <img :src="slide.src" :alt="slide.alt" />
        </div>
        <!-- 비디오 타입 슬라이드 -->
        <div v-else-if="slide.type === 'video'" class="video-wrap">
          <div class="video-area" ref="videoWrap">
            <iframe :src="`${slide.src}?controls=0&muted=1&loop=1`" frameborder="0" allow="autoplay" width="100%"
              height="100%" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
          </div>
        </div>
      </router-link>
    </swiper-slide>
    <div class="swiper-paging2"></div>
  </swiper>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, onUnmounted, nextTick } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'; // SwiperSlide 추가
import 'swiper/css'; // Swiper의 기본 스타일 추가
import 'swiper/css/pagination'; // Swiper의 pagination 스타일 추가
import { Autoplay, Pagination } from 'swiper'; // Swiper 모듈 불러오기
import type { Swiper as SwiperType } from 'swiper';
import type { PaginationOptions } from 'swiper/types';
import { useVimeo } from '../../../utils/useVimeo';


const videoWrap = ref<HTMLElement[]>([]);  // 여러 개의 video-wrap 요소를 참조
const videoHeight = ref<number | null>(null);  // 비디오 높이를 저장


// 슬라이드 타입 정의
interface VisualItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  link: string;
}

// 컴포넌트의 props 정의
const props = defineProps<{
  slides: VisualItem[],
  className: string
}>();


// Swiper의 페이지네이션 옵션 설정
const paginationOptions: PaginationOptions = {
  el: '.swiper-paging2',
  type: 'custom',
  renderCustom: function (swiper, current, total) {
    return `<em class="current-count">${('0' + current).slice(-2)}</em><em class="total-count">${('0' + total).slice(-2)}</em>`;
  }
};


// 자동 재생 옵션 정의
const autoplayOptions = {
  delay: 3000,
  disableOnInteraction: false,
};

// Swiper에서 사용할 모듈 정의
const modules = [Autoplay, Pagination];

// Vimeo 비디오 초기화를 위한 함수 가져오기
const { initVimeo } = useVimeo();

const swiperInstance = ref<SwiperType | null>(null);  // Swiper 인스턴스 저장

// Swiper 인스턴스 초기화 함수
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;

  // Swiper는 항상 동작, 비디오 슬라이드가 있을 경우에만 Vimeo 초기화
  const hasVideoSlide = props.slides.some(slide => slide.type === 'video');
  if (hasVideoSlide) {
    initVimeo(swiper);
  }
};


// 비디오 높이를 계산하고 업데이트하는 함수
const updateVideoHeight = async () => {
  await nextTick();
  if (videoWrap.value.length > 0 && videoWrap.value[0]) {
    setTimeout(() => {
      // Swiper 슬라이드의 첫 번째 요소를 가져옴
      const firstSlide = document.querySelector('.swiper-slide');
      if (firstSlide) {
        videoHeight.value = firstSlide.clientHeight;  // 첫 번째 슬라이드의 높이를 저장
      }
    }, 1000)
  }
};



onMounted(() => {
  // Swiper는 항상 동작, 비디오 슬라이드가 있을 경우에만 Vimeo 초기화
  const hasVideoSlide = props.slides.some(slide => slide.type === 'video');
  if (swiperInstance.value && hasVideoSlide) {
    initVimeo(swiperInstance.value);
  }
  updateVideoHeight();  // 처음 마운트 시 비디오 높이 계산

  // 윈도우 리사이즈 이벤트 시에도 비디오 높이를 재계산
  window.addEventListener('resize', updateVideoHeight);

});

onUnmounted(() => {
  window.removeEventListener('resize', updateVideoHeight);
});


</script>

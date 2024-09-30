<template>
  <section>
      <swiper :slides-per-view="1" :loop="true" :pagination="paginationOptions" :autoplay="autoplayOptions" :lazy="true"
        :parallax="true" :auto-height="false" :touch-ratio="1" :modules="modules" @swiper="onSwiper"
        :class="[customClass]">
        <swiper-slide v-for="(slide, index) in slides" :key="index" class="swiper-slide">
          <router-link :to="slide.link">
            <!-- 이미지 타입 슬라이드 -->
            <div v-if="slide.type === 'image'" class="img-box" :style="{ height: adjustedHeight + 'px' }">
              <img :src="slide.src" :alt="slide.alt" />
            </div>
             <!-- 비디오 타입 슬라이드 -->
            <div v-else-if="slide.type === 'video'" class="video-wrap" :style="{ height: adjustedHeight + 'px' }">
              <div class="video-area">
                <iframe :src="`${slide.src}?controls=0&muted=1&loop=1`" frameborder="0" allow="autoplay" width="100%"
                  height="100%" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              </div>
            </div>
               <!-- 슬라이드의 텍스트 박스 -->
            <div class="text-box">
              <div :class="[isInnerBox ? 'inner-box' : '']">
                <h3 :class="titleClass ? titleClass : 'title-type'" v-html="slide.title"></h3>
                <p :class="subtitleClass ? subtitleClass : 'sub-title-type'">{{ slide.subtitle }}</p>
              </div>
            </div>
          </router-link>
        </swiper-slide>
         <!-- Swiper 페이지네이션 -->
        <div class="swiper-pagination"></div>
      </swiper>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits, computed, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/lazy';
import 'swiper/css/parallax';
import { Autoplay, Pagination, Lazy, Parallax } from 'swiper';
import type { PaginationOptions, AutoplayOptions } from 'swiper/types';
import type { Swiper as SwiperType } from 'swiper';
import { useVimeo } from '../../../utils/useVimeo';

// 슬라이드 데이터 타입 정의
interface VisualItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  title?: string;
  subtitle?: string;
  link: string;
}

// props 정의
const props = defineProps<{
  slides: VisualItem[],
  navigationHeight?: number,
  customClass?: string,  // 커스텀 클래스 네임 추가
  titleClass?: string,
  subtitleClass?: string,
  isInnerBox?: boolean
}>();

// emit 정의
const emit = defineEmits(['updateHeight']);

// Swiper 관련 옵션 설정
const paginationOptions: PaginationOptions = {
  el: '.swiper-pagination',
  type: 'progressbar',
};
// Swiper 오토플레이 옵션 설정
const autoplayOptions: AutoplayOptions = {
  delay: 100000,
  disableOnInteraction: false,
};

const modules = [Autoplay, Pagination, Lazy, Parallax];  // Swiper 모듈 정의
const textBoxHeight = ref<number>(0);  // 슬라이드의 텍스트 박스 높이
const swiperInstance = ref<SwiperType | null>(null);  // Swiper 인스턴스 저장

// Vimeo 비디오 초기화를 위한 함수 가져오기
const { initVimeo } = useVimeo();

// Swiper 인스턴스 초기화 함수
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;

  // Swiper는 항상 동작, 비디오 슬라이드가 있을 경우에만 Vimeo 초기화
  const hasVideoSlide = props.slides.some(slide => slide.type === 'video');
  if (hasVideoSlide) {
    initVimeo(swiper);
  }
};


// 화면 크기 변화에 따른 슬라이드 높이 업데이트 함수
const updateHeight = () => {
  textBoxHeight.value = window.innerHeight;
};

// 네비게이션 높이를 고려한 슬라이드 높이 계산
const adjustedHeight = computed(() => {
  return textBoxHeight.value - (props.navigationHeight ?? 0);
});

// 슬라이드 높이 값이 변경될 때마다 부모 컴포넌트로 값 전송
watch(adjustedHeight, (newHeight) => {
  emit('updateHeight', newHeight);
});

// 컴포넌트가 마운트될 때 실행되는 로직
onMounted(() => {
  updateHeight();  // 초기 높이 설정
  emit('updateHeight', adjustedHeight.value);  // 부모 컴포넌트에 높이 전달
  window.addEventListener('resize', updateHeight);  // 윈도우 크기 변경 이벤트 리스너 추가
  const hasVideoSlide = props.slides.some(slide => slide.type === 'video');
  if (swiperInstance.value && hasVideoSlide) {
    initVimeo(swiperInstance.value);
  }
});

// 컴포넌트가 언마운트될 때 실행되는 로직
onUnmounted(() => {
  window.removeEventListener('resize', updateHeight);  // 윈도우 크기 변경 이벤트 리스너 제거
});
</script>

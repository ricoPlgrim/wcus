<template>
  <div :class="['visual-wrap main-visual', customClass]">
    <!-- Conditionally render Swiper based on the 'type' prop -->
    <template v-if="type === 'page'">
      <!-- Page view Swiper -->
      <swiper :slides-per-view="1" :loop="true" :pagination="paginationOptions" :observer="true" :observeParents="true"
        :modules="modules" @swiper="onSwiper" :class="['detail-swiper', customClass]">
        <swiper-slide v-for="(slide, index) in props.slides" :key="index" class="swiper-slide" @click="handleClick">
          <a href="javascript:void(0);">
            <!-- 이미지 타입 슬라이드 -->
            <div v-if="slide.type === 'image'" class="img-box">
              <img :src="slide.src" :alt="slide.alt" />
            </div>
            <!-- 비디오 타입 슬라이드 -->
            <div v-else-if="slide.type === 'video'" class="video-wrap">
              <div class="video-area">
                <iframe :src="`${slide.src}?controls=0&muted=1&loop=1`" frameborder="0" allow="autoplay" width="100%"
                  height="100%" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
              </div>
            </div>
          </a>
        </swiper-slide>
        <!-- Swiper 페이지네이션 -->
        <div class="swiper-pagination"></div>
      </swiper>
    </template>

    <template v-else-if="type === 'popup'">
      <!-- Popup view Swiper -->
      <swiper :slides-per-view="1" :loop="true" :pagination="paginationOptionsCount" :observer="true" :observeParents="true" :autoHeight="true"
        :modules="modules" @swiper="onSwiper" :zoom="zoomOptions" :class="['detail-swiper', customClass]"  :initialSlide="initialIndex">
        <swiper-slide v-for="(slide, index) in props.slides" :key="index" class="swiper-slide" @click="handleClick">
            <!-- 이미지 타입 슬라이드 -->
            <div v-if="slide.type === 'image'" class="swiper-zoom-container">
              <img :src="slide.src" :alt="slide.alt" />
            </div>
            <!-- 비디오 타입 슬라이드 -->
            <div v-else-if="slide.type === 'video'">
              <div class="video-wrap">
                <div class="video-area">
                  <iframe :src="`${slide.src}?controls=0&muted=1&loop=1`" frameborder="0" allow="autoplay" width="100%"
                    height="100%" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
              </div>
            </div>
        </swiper-slide>
        <!-- Swiper 페이지네이션 -->
        <div class="swiper-pagination swiper-paging2"></div>
      </swiper>
    </template>

    <!-- Fallback template -->
    <template v-else>
      <p>Invalid type provided</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,  defineProps, defineEmits } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,  Zoom } from 'swiper';
import type { PaginationOptions } from 'swiper/types';
import type { Swiper as SwiperType } from 'swiper';
import { useVimeo } from '../../../utils/useVimeo';

// Slide data interface
interface VisualItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

// Define props
const props = defineProps<{
  type: 'page' | 'popup'
  slides: VisualItem[],
  customClass: string,
  initialIndex?: number,  //선택적으로 사용
}>();


// Swiper options and modules
const paginationOptions: PaginationOptions = {
  el: '.swiper-pagination',
  type: 'bullets',
};


const paginationOptionsCount: PaginationOptions = {
  el: '.swiper-pagination',
  type: 'custom',
  renderCustom: function (swiper, current, total) {
    return ('<em class="current-count">'+('0' + current).slice(-2) + '</em><em class="total-count">' + ('0' + total).slice(-2)+'</em>');
  }
};

const zoomOptions = {
  maxRatio: 3,
  minRatio: 1,
};


const modules = [Pagination,  Zoom];

// Vimeo setup
const swiperInstance = ref<SwiperType | null>(null);
const { initVimeo } = useVimeo();
const emit = defineEmits(['slideSelected']);

// Initialize Swiper
const onSwiper = (swiper: SwiperType) => {
  swiperInstance.value = swiper;
  initVimeo(swiper);
};


// Handle click event
const handleClick = () => {
  if (swiperInstance.value) {
    const realIndex = swiperInstance.value.realIndex;
    emit('slideSelected', realIndex);
  }
};

onMounted(() => {
  if (swiperInstance.value) {
    initVimeo(swiperInstance.value);
  }
});

</script>

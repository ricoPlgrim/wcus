<template>
  <swiper v-if="type === 'visual'" :slides-per-view="1" :pagination="paginationOptions" :autoplay="autoplayOptions" :parallax="parallax"
    :modules="modules" :speed="speed" :class="[customClass, swiperClass]" :loop="computedLoop">
    <swiper-slide v-for="(slide, index) in slides" :key="index">
      <router-link to="">
        <div class="img-box">
          <img :src="slide.imageSrc" :alt="slide.altText" />
        </div>
        <div class="text-box">
          <div class="inner-box">
            <div class="title-wrap">
              <div class="title-type" v-html="slide.title"></div>
              <p class="sub-title-type">{{ slide.description }}</p>
            </div>
          </div>
        </div>
      </router-link>
    </swiper-slide>
    <div class="swiper-navigation">
      <div class="swiper-pagination"></div>
    </div>
  </swiper>

  <swiper v-else-if="type === 'recom'" :slides-per-view="2.225" :space-between="10" :observer="true" :free-mode="true"
    :loop="computedLoop" :observe-parents="true" :slides-offset-before="20" :slides-offset-after="20" :modules="modules"
    :class="swiperClass">
    <swiper-slide v-for="(slide, index) in localSlides" :key="index">
      <div class="product-item">
        <button class="btn-wish" :class="{ active: slide.isWished }" @click="toggleWish(index)">
          <span class="hidden">wish</span>
        </button>
        <div class="product-cont">
          <router-link to="/">
            <div class="product-model">
              <div class="img-box">
                <img :src="slide.imageSrc" :alt="slide.altText" />
              </div>
            </div>
            <div class="product-info">
              <div class="product-title">
                <h3 class="brand">{{ slide.brand }}</h3>
                <p class="title">{{ slide.title }}</p>
              </div>
              <div class="product-price">
                <span class="original">
                  <b>{{ slide.originalPrice }}</b>
                </span>
                <div class="special-price">
                  <strong class="price">
                    <b>{{ slide.specialPrice }}</b>
                  </strong>
                  <em class="sale">{{ slide.sale }}</em>
                </div>
              </div>
              <!-- 제품 하단 정보 -->
              <div v-if="showBottomInfo"  class="product-bottom">
                <!-- 태그가 있을 경우 표시 -->
                <div v-if="slide.tags" class="tag-box">
                  <span v-for="(tag, index) in slide.tags" :key="index" class="tag-type">{{ tag }}</span>
                </div>
                <div class="stats-box">
                  <span class="like">
                    <i class="ico-star"><span class="hidden">like</span></i>
                    <em>{{ slide.likes }}</em>
                  </span>
                  <span class="color">
                    <i class="ico-plus v2"><span class="hidden">more</span></i>
                    <em>{{ slide.colors }}</em>
                  </span>
                </div>
              </div>

            </div>
          </router-link>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/parallax';
import { Autoplay, Pagination, Parallax } from 'swiper';
import type { PaginationOptions } from 'swiper/types';

interface Slide {
  imageSrc?: string;
  altText?: string;
  title: string;
  description?: string;
  brand?: string;
  originalPrice?: string;
  specialPrice?: string;
  sale?: string;
  tags?: string[];
  likes?: number;
  colors?: number;
  isWished: boolean;
  soldOut?: boolean;

}

const props = defineProps<{
  type: 'visual' | 'recom';
  slides?: Slide[];
  customClass?: string;
  loop?: boolean;
  showBottomInfo?: boolean;
  parallax?: boolean;
  speed?: number;
}>();

const paginationOptions: PaginationOptions = {
  el: '.swiper-pagination',
  type: 'progressbar',
};

const autoplayOptions = {
  delay: 3000,
  disableOnInteraction: false,
};

const modules = [Autoplay, Pagination, Parallax];

const swiperClass = computed(() => {
  return props.type === 'visual' ? 'visual-swiper' : 'recommend-swiper';
});

const computedLoop = computed(() => {
  return props.loop !== undefined ? props.loop : true;
});


const localSlides = ref(props.slides.map(slide => ({ ...slide })));  // Create a local copy of slides


const toggleWish = (index: number) => {
  localSlides.value[index].isWished = !localSlides.value[index].isWished;
};


</script>
  
  
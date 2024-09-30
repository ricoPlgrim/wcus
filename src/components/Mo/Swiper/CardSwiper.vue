<template>
  <swiper :observer="true" :observe-parents="true" :slides-per-view="1.12" :space-between="10" :slides-offset-after="20"
    :slides-offset-before="20" class="ldiscover-swiper">
    <swiper-slide v-for="(slide, index) in props.slides" :key="index">
      <router-link to="/">
        <img :src="slide.imgSrc" :alt="slide.caption">
        <p>{{ slide.caption }}</p>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css'; 
import { PropType } from 'vue';

const props = defineProps({
  slides: {
    type: Array as PropType<Array<{ imgSrc: string, caption: string }>>,
    required: true,
  },
});

</script>

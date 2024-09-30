<template>
    <div class="scr-item plan-stories">
      <h3 class="scr-title">{{ title }}</h3>
      <swiper :observer="true" :observe-parents="true" :loop-additional-slides="1" :slides-per-view="1.06" :space-between="10" class="stories-swiper plan-list">
        <swiper-slide v-for="(story, index) in props.stories" :key="index">
          <router-link :to="story.link">
            <div class="plan-top">
              <img class="img" :src="story.image" :alt="story.title" />
              <div class="plan_tag">
                <p>{{ story.tag }}</p>
              </div>
            </div>
            <div class="plan-info">
              <h3 class="title">{{ story.title }}</h3>
              <p class="about">{{ story.about }}</p>
            </div>
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  
  interface Story {
    tag: string;
    title: string;
    about: string;
    image: string;
    link: string;
  }
  
  // 부모로부터 받을 props를 정의
  const props = defineProps<{
    title: string;
    stories: Story[];
  }>();
  </script>
  
<template>
    <div class="scr-item plan-today">
      <h3 class="scr-title">{{ props.title }}</h3>
  
      <ul class="corner-link">
        <li v-for="(pick, index) in props.picks" :key="index" class="corner-item">
          <a :href="pick.link">
            <div class="corner-cont">
              <div class="corner-top">
                <div class="corner-img">
                  <img :src="pick.imageSrc" :alt="pick.altText" />
                </div>
              </div>
              <div class="corner-text">
                <p class="title">{{ pick.brand }}</p>
                <p class="about">{{ pick.description }}</p>
                <p class="bottom-text">{{ pick.cta }}</p>
              </div>
            </div>
  
            <div class="corner-banner">
              <img :src="pick.bannerSrc" :alt="pick.bannerAltText" />
              <div class="plan_tag">
                <p>{{ pick.tagline }}</p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  // Define the structure of the data for each pick
  interface Pick {
    imageSrc: string;
    altText: string;
    brand: string;
    description: string;
    cta: string;
    bannerSrc: string;
    bannerAltText: string;
    tagline: string;
    link: string;
  }
  
  // Props definition
  const props = defineProps<{
    title: string;
    picks: Pick[];
  }>();
  </script>
  
 
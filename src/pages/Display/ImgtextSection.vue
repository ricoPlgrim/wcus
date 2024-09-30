<template>
    <div class="scr-item plan-imgtext">
      <h3 class="scr-title">{{ props.title }}</h3>
  
      <ul class="corner-link">
        <li v-for="(brand, index) in props.brands" :key="index" class="corner-item">
          <a :href="brand.link">
            <div class="corner-top">
              <div class="corner-img">                        
                <img :src="brand.imageSrc" :alt="brand.altText" />
              </div>
            </div>
            <div class="corner-text">{{ brand.name }}</div>
          </a>
        </li>
      </ul>


    </div>
    <div class="scr-item plan-CTA">
      <BtnType1Components :buttons="[{ href: 'javascript:;', text: 'SHORTCUT', classes: 'btn-type btn-full' }]" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import BtnType1Components from '../../components/Mo/Buttons/BtnType1.vue';
  // Define the structure of the data for each brand
  interface Brand {
    name: string;
    imageSrc: string;
    altText: string;
    link: string;
  }
  
  // Props definition
  const props = defineProps<{
    title: string;
    brands: Brand[];
  }>();
  </script>
  
  <style scoped>
  /* Add any styles you need for the component */
  </style>
  
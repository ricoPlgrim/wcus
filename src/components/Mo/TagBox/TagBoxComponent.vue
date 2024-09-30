<template>
    <div class="tag-box-container">
      <h4 class="title-type3">{{ props.title }}</h4>
      <ul class="tag-box">
        <li v-for="(tag, index) in props.tags" :key="index">
          <router-link to="/" class="tag-type2">{{ tag }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  interface Props {
    title: string;
    tags: string[];
  }
  
  const props = defineProps<Props>();
  </script>
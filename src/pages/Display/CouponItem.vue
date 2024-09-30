<template>
    <div class="scr-item plan-coupon">
      <div class="title" v-html="props.title"></div>
      <div class="coupon">
        <p class="code">USE CODE: <span>{{ props.code }}</span></p>
        <p class="end-date">ENDS: {{ props.endDate }}</p>
      </div>
      <p class="description">{{ props.description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  // Props 정의
  const props = defineProps<{
    title: string;       // 할인 타이틀
    code: string;        // 쿠폰 코드
    endDate: string;     // 종료 날짜
    description: string; // 설명 텍스트
  }>();
  </script>
  
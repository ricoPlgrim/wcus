<template>
    <div class="tag-box">
       <!-- 전달받은 태그들을 반복 렌더링 -->
      <span v-for="(tag, index) in props.tags" :key="index" class="tag-type">{{ tag }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
// 상위 컴포넌트에서 전달받은 props 정의
const props = defineProps<{
  tags: string[]; // 태그 리스트를 배열로 받음
}>();

  </script>
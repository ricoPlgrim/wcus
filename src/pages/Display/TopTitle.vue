<template>
    <div class="top-title">
      <p class="tit">{{ props.title }}</p>
      <button class="btn-wish" @click="handleWishClick" ref="wishButton">
        <span class="hidden">wish</span>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits, ref } from 'vue';
  
  // Props 정의
  const props = defineProps<{
    title: string; // 제목 텍스트
  }>();
  
  // Emit 정의
  const emit = defineEmits<{
    (e: 'wishClick'): void;
  }>();
  
  // 버튼 요소에 대한 참조 설정
  const wishButton = ref<HTMLButtonElement | null>(null);
  
  // wish 버튼 클릭 핸들러
  const handleWishClick = () => {
    if (wishButton.value) {
      wishButton.value.classList.toggle('active'); // active 클래스 토글
    }
    emit('wishClick');
  };
  </script>
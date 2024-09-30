<template>
    <!-- 자세히 보기 섹션을 나타내는 div 요소 -->
    <div id="details" :class="['cont-box more', isOpen ? 'open' : '']">
      <!-- props로 전달된 content를 HTML로 출력 -->
      <div class="prd-text-box" v-html="props.content"></div>
      <!-- 'LOAD MORE' 버튼은 isOpen이 false일 때만 표시됨 -->
      <button v-if="!isOpen" type="button" class="btn-more" @click="loadMore">LOAD MORE</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref } from 'vue';
  
  // Props 인터페이스 정의 (부모 컴포넌트로부터 받는 데이터 타입 설정)
  interface DetailsSectionProps {
    content: string; // HTML로 렌더링할 제품 설명 텍스트
  }
  
  // props로 부모 컴포넌트에서 전달받은 데이터
  const props = defineProps<DetailsSectionProps>();
  
  // 'LOAD MORE' 버튼을 눌렀는지 여부를 추적하는 상태값
  const isOpen = ref(false);
  
  // 'LOAD MORE' 버튼 클릭 시 호출되는 함수
  const loadMore = () => {
    isOpen.value = true; // 버튼 클릭 후 더보기 상태로 변경
  };
  </script>
  
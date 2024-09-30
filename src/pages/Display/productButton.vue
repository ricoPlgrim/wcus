<template>
    <a href="javascript:;" class="quick-product" ref="quickProductRef" @click="sendRefToParent">
      <span>Product</span><i class="ico-arr2 bottom"></i>
    </a>
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref, onMounted } from 'vue';
  
  // Props로 클릭 이벤트 핸들러와 부모로 ref를 전달할 함수 정의
  const props = defineProps<{
    onClick: (event: MouseEvent) => void;
    onUpdateQuickProductRef: (refElement: HTMLElement) => void;
  }>();
  
  const quickProductRef = ref<HTMLElement | null>(null);
  
  const sendRefToParent = (event: MouseEvent) => {
    if (quickProductRef.value) {
      props.onUpdateQuickProductRef(quickProductRef.value); // 부모로 ref 넘기기
    }
    props.onClick(event); // 부모 컴포넌트의 클릭 핸들러 호출
  };
  
  // 컴포넌트가 마운트된 후 부모에게 ref 전달
  onMounted(() => {
    if (quickProductRef.value) {
      props.onUpdateQuickProductRef(quickProductRef.value);
    }
  });
  </script>
  
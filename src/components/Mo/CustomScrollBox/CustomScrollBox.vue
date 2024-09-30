<template>
  <!-- 부모 컴포넌트에서 전달된 스타일과 클래스 적용 -->
  <div :style="props.customStyle" :class="['custom-scroll', customClass]">
    <!-- 슬롯을 통해 자식 요소들을 렌더링 -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Props 정의: 부모 컴포넌트에서 전달받는 속성들
const props = defineProps<{
  customStyle?: Record<string, string>; // 선택적인 커스텀 스타일 (객체 형태로 받음)
  customClass: string; // 필수 커스텀 클래스 (문자열로 받음)
}>();
</script>
 
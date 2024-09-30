<template>
  <!-- 태그를 표시하는 박스 -->
  <div class="tag-box">
    <!-- 각 태그를 반복해서 링크 형태로 출력 -->
    <a
      v-for="(tag, index) in props.tags"
      :key="index"
      href="#"
      class="tag-type2"
    >
      {{ tag }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'; // defineProps 함수 import

// TagBox 컴포넌트에서 사용할 props 인터페이스 정의
interface TagBoxProps {
tags: string[]; // 태그 문자열 배열을 props로 받음
}

// props 정의, 부모 컴포넌트로부터 태그 데이터를 받아옴
const props = defineProps<TagBoxProps>();
</script>

<template>
  <div :class="wrapperClass">
    <a v-for="(button, index) in buttons" :key="index" :href="button.href" :class="button.classes">
      {{ button.text }}
    </a>
  </div>
</template>
  
 
<script setup lang="ts">
import { defineProps } from 'vue';

interface Button {
  href: string;
  text: string;
  classes: string;
}

// Props 정의
const props = defineProps<{
  buttons: Button[];
  wrapperClass?: string;
}>();

// 기본값 설정
const defaultWrapperClass = 'btn-wrap';
const wrapperClass = props.wrapperClass || defaultWrapperClass;
</script>

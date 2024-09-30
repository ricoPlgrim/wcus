<template>
  <div class="btn-wrap v2">
    <a href="#" class="btn-type5">{{ props.buttonText1 }}</a>
    <a href="#" class="btn-type5 v2">{{ props.buttonText2 }}</a>
  </div>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';

// Props 정의
const props = defineProps<{
  buttonText1: string;
  buttonText2: string;
}>();
</script>
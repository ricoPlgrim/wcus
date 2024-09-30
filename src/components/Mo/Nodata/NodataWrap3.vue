<template>
  <div class="nodata-wrap2">
    <div class="title">We have found<br />no results for “{{ props.searchQuery }}”</div>
    <p>Please try again.</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Props 정의
const props = defineProps<{
  searchQuery: string;
}>();
</script>

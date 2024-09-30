<template>
  <div class="accordion-list">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { reactive, provide } from 'vue';

// Accordion 상태 정의
const Accordion = reactive({
  count: 0,
  active: null as number | null
});

// Accordion 상태를 제공
provide('Accordion', Accordion);
</script>


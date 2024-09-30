<template>
  <div class="btn-wrap" :class="{ v2: isHalf && isFullSecond }">
    <a v-for="(button, index) in buttons" :key="index" :href="button.href" :class="button.classes">
      {{ button.text }}
    </a>
  </div>
</template>
    
<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface Button {
  href: string;
  text: string;
  classes: string;
}

const props = defineProps<{
  buttons: Button[];
}>();

const isHalf = computed(() => props.buttons.length === 2);
const isFullSecond = computed(() => isHalf.value && props.buttons[1].classes.includes('v3'));

if (props.buttons.length !== 1 && props.buttons.length !== 2) {
  throw new Error('The buttons array must contain either 1 or 2 items.');
}
</script>


<style scoped></style>
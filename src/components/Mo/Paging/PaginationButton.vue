<template>
  <button type="button" :class="{ active: isActive, prev: isPrev, next: isNext }" :disabled="isDisabled"
    @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  isActive: boolean;
  isPrev: boolean;
  isNext: boolean;
  isDisabled: boolean;
}>();

const emit = defineEmits(['click']);

const handleClick = () => {
  if (!props.isDisabled) {
    emit('click');
  }
};
</script>
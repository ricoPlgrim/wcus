<template>
  <ul class="toggle-wrap">
    <li>
      <div class="toggle-title">
        <button :class="['btn-toggle', { active: isOpen }]" @click="toggleContent">
          <h3 class="title-type">{{ props.title }}</h3>
        </button>
      </div>
      <div :class="['toggle-box', { active: isOpen }]" v-if="isOpen">
        <slot></slot>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { defineProps } from 'vue';

// Props 정의
const props = defineProps<{
  title: string;
}>();

// isOpen 상태 정의
const isOpen = ref(false);

// toggleContent 함수 정의
const toggleContent = () => {
  isOpen.value = !isOpen.value;
};
</script>


<template>
  <div :class="['pop-layer', { 'is-visible': isVisible }]" v-if="isVisible">
    <div class="dim" @click="closePopup"></div>
    <div class="pop-wrap">
      <div class="pop-content">
        <div class="title" v-if="props.title">{{ props.title }}</div>
        <p v-html="props.description"></p>
      </div>
      <div class="btn-wrap">
        <button @click="closePopup" class="btn-type5 v2">{{ props.checkText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, defineExpose } from 'vue';

const props = defineProps<{
  title?: string;
  description: string;
  checkText: string;
}>();

const isVisible = ref(false);

const openPopup = () => {
  isVisible.value = true;
};

const closePopup = () => {
  isVisible.value = false;
};

watch(isVisible, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});

defineExpose({ openPopup, closePopup });
</script>

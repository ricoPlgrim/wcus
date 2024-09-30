<template>
  <div :class="['pop-full', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-full">
    <div class="dim"></div>
    <div class="pop-wrap">
      <div class="pop-title2">
        <h3 class="title-type">{{ props.title }}</h3>
        <button @click="closePopup" class="pop-close"><i class="ico-close"></i><span class="hidden">닫기</span></button>
      </div>
      <div class="pop-content" v-html="contentData"></div>
      <div class="btn-fixed-wrap">
        <button @click="closePopup" class="btn-type v3">{{ props.checkText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineExpose } from 'vue';

const props = defineProps<{
  title: string;
  contentData: string;
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
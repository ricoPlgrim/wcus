<template>
  <div :class="['pop-bottom', { 'is-visible': isVisible, 'active': isActive }]" v-if="isVisible" id="pop-bottom">
    <div class="dim" @click="closePopup"></div>
    <div class="pop-wrap">
      <div class="pop-bar" @click="closePopup"></div>
      <div class="pop-content">
        <strong v-html="props.title"></strong>
        <p v-html="props.description"></p>
        <div class="btn-wrap">
          <button @click="closePopup" class="btn-type v4">{{ props.buttonName }}</button>
        </div>
      </div>
      <div class="btn-bottom-wrap">
        <button class="today" @click="closePopup">{{ props.todayTitle }}</button>
        <button @click="closePopup">{{ props.closeText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineExpose } from 'vue';

const props = defineProps<{
  title: string;
  description: string;
  buttonName: string;
  todayTitle: string;
  closeText: string;
}>();

const isVisible = ref(false);
const isActive = ref(false);

const openPopup = () => {
  isVisible.value = true;
  setTimeout(() => {
    isActive.value = true;
  }, 100); // 100ms 뒤에 active 클래스 적용
};

const closePopup = () => {
  isActive.value = false;
  setTimeout(() => {
    isVisible.value = false;
  }, 300); // 애니메이션 시간 고려하여 300ms 뒤에 isVisible 변경
};

watch(isVisible, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});

defineExpose({ openPopup, closePopup });
</script>
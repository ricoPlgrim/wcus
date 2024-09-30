<template>
  <div :class="['pop-layer', { 'is-visible': isVisible }]" v-if="isVisible">
    <div class="dim" @click="closePopup"></div>
    <div class="pop-wrap">
      <div class="pop-content v2">
        <div>
          <img :src="props.imgSrc" :alt="props.imgAlt" style="width:300px; height:300px;">
          <!-- 임시로 300x300 css값 적용 -->
        </div>
      </div>
      <div class="btn-wrap">
        <a @click="closePopup" class="btn-type5">{{ props.checkText }}</a>
        <a @click="closePopup" class="btn-type5 v2">{{ props.executionText }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineExpose } from 'vue';
const props = defineProps<{
  imgSrc: string;
  imgAlt: string;
  checkText: string;
  executionText: string;
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
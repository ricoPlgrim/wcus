<template>
  <div :class="['pop-bottom', { 'is-visible': isVisible, 'active': isActive }]" v-if="isVisible" id="pop-marketing">
    <div class="dim" @click="closePopup"></div>
    <div class="pop-wrap">
      <div class="pop-bar" @click="closePopup"></div>
      <div class="pop-content">
        <strong>Agree with the app push and get<br>shopping benefits!</strong>
        <p>App error checking and duplicate login classification,<br>machine ID information machine </p>
        <div class="img" style="background:#bbb;padding:80px 0">IMAGE</div>
        <p class="v2">App error checking and duplicate login classification,<br>machine ID information machine </p>
        <div class="btn-wrap">
          <button class="btn-type v3" @click="closePopup">Receive benefit notifications</button>
          <button class="btn-type v4 etc" @click="closePopup">I'll get it later</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';

const isVisible = ref(false);
const isActive = ref(false);

const openPopup = () => {
  isVisible.value = true;
  setTimeout(() => {
    isActive.value = true;
  }, 100);
};

const closePopup = () => {
  isActive.value = false;
  setTimeout(() => {
    isVisible.value = false;
  }, 300);
};

watch(isVisible, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});

defineExpose({ openPopup, closePopup });
</script>


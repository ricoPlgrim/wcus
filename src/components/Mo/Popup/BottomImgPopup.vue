<template>
  <div :class="['pop-bottom', { 'is-visible': isVisible, 'active': isActive }]" v-if="isVisible" id="pop-bottom2">
    <div class="dim" @click="closePopup"></div>
    <div class="pop-wrap">
      <div class="pop-bar" @click="closePopup"></div>
      <div class="pop-content v2">
        <!-- 로딩 인디케이터 -->
        <div v-if="!isImageLoaded" class="loading-indicator">
          <Loading />
        </div>
        <!-- 이미지가 로드되면 표시 -->
        <img v-show="isImageLoaded" :src="props.imgSrc" :alt="props.imgAlt" @load="onImageLoad" style="max-width: 650px;">
      </div>
      <div class="btn-bottom-wrap">
        <button class="today" @click="closePopup">{{ props.todayTitle }}</button>
        <button @click="closePopup">{{ props.closeText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose, defineProps } from 'vue';
import Loading from '../../../components/Mo/Loading/LoadingComponent.vue'

const props = defineProps<{
  imgSrc: string;
  imgAlt: string;
  todayTitle: string;
  closeText: string;
}>();

// 팝업 가시성 및 활성 상태
const isVisible = ref(false);
const isActive = ref(false);

// 이미지 로딩 상태 관리
const isImageLoaded = ref(false);

// 팝업 열기 함수
const openPopup = () => {
  isVisible.value = true;
  setTimeout(() => {
    isActive.value = true;
  }, 100);
};

// 팝업 닫기 함수
const closePopup = () => {
  isActive.value = false;
  setTimeout(() => {
    isVisible.value = false;
  }, 300);
};

// 이미지 로드 완료 시 호출되는 함수
const onImageLoad = () => {
  isImageLoaded.value = true;
};

// 팝업 가시성에 따라 스크롤을 제어하는 watch
watch(isVisible, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});

// 팝업 열기 및 닫기 메서드를 노출
defineExpose({ openPopup, closePopup });
</script>

<style>
.loading-indicator {
  font-size: 16px;
  color: #333;
  text-align: center;
  padding: 20px;
}
</style>

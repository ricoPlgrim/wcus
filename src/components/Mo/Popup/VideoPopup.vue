<template>
  <div :class="['pop-layer', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-video">
    <div class="dim" @click="closePopup"></div>
    <div class="pop-wrap">
      <div class="pop-content v2">
        <div class="video-wrap">
          <div class="video-area normal" data-index="1">
            <!-- 로딩 인디케이터: loaded가 false일 때 표시 -->
            <div v-if="!loaded" class="loader">
              <div class="loading-svg">
                <img class="loading-logo" src="../../../assets/mo/images/loading_logo.svg" alt="Loading Logo" />
                <img class="loading-bar" src="../../../assets/mo/images/loading_bar.svg" alt="Loading Bar" />
              </div>
            </div>
            <!-- 비디오 iframe: 로드가 완료되면 표시 -->
            <iframe
              v-show="loaded"
              :src="`${props.videoUrl}?autoplay=1&muted=1&loop=1&controls=0`"
              frameborder="0"
              allow="autoplay"
              width="100%"
              height="100%"
              webkitallowfullscreen
              mozallowfullscreen
              allowfullscreen
              @load="onLoad"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <button @click="closePopup" class="btn-type5">{{ props.closeText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineExpose } from 'vue';

// Props 정의
const props = defineProps<{
  videoUrl: string;  // Vimeo 영상 URL
  closeText: string;  // 닫기 버튼 텍스트
}>();

// 팝업 상태
const isVisible = ref(false);  // 팝업 가시성 상태
const loaded = ref(false);  // 비디오 로드 상태

// 팝업 열기
const openPopup = () => {
  isVisible.value = true;
};

// 팝업 닫기
const closePopup = () => {
  isVisible.value = false;
  loaded.value = false;  // 로드 상태 초기화
};

// 비디오가 로드될 때 호출되는 함수
const onLoad = () => {
  loaded.value = true;  // 비디오 로드가 완료되면 로딩 인디케이터 숨기기
};

// 팝업 가시성 상태에 따라 스크롤 제어
watch(isVisible, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});

// 팝업 열기/닫기 메서드를 외부에 노출
defineExpose({ openPopup, closePopup });
</script>

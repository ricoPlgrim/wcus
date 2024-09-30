<template>
  <div :class="['pop-bottom', { 'is-visible': isVisible, 'active': isActive }]" v-if="isVisible" id="pop-share">
    <div class="dim" @click="closePopup"></div>
    <div class="pop-wrap">
      <div class="pop-bar" @click="closePopup"></div>
      <div class="pop-content">
        <div class="pop-title">
          <h3 class="title-type3">{{ title }}</h3>
        </div>
        <div class="share-box">
          <a v-if="showFacebook" href="https://www.facebook.com/sharer/sharer.php?u={{ shareUrl }}" target="_blank" class="btn-facebook">Facebook</a>
          <a v-if="showUrl" href="javascript:;" @click="copyUrl" class="btn-url">Copy URL</a>
          <a v-if="showGoogle" href="https://plus.google.com/share?url={{ shareUrl }}" target="_blank" class="btn-google">Google</a>
          <a v-if="showPinterest" href="https://pinterest.com/pin/create/button/?url={{ shareUrl }}" target="_blank" class="btn-pinterest">Pinterest</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';

// Props 정의
const props = defineProps<{
  title: string;               // 공유 팝업 타이틀
  shareUrl: string;            // 공유할 URL
  showFacebook?: boolean;      // 페이스북 버튼 표시 여부 (선택적)
  showGoogle?: boolean;        // 구글 버튼 표시 여부 (선택적)
  showPinterest?: boolean;     // 핀터레스트 버튼 표시 여부 (선택적)
  showUrl?: boolean;           // URL 복사 버튼 표시 여부 (선택적)
}>();

// 상태 관리
const isVisible = ref(false);
const isActive = ref(false);

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

// URL 복사 기능
const copyUrl = () => {
  navigator.clipboard.writeText(props.shareUrl);
  console.log( "복사한 url값", props.shareUrl );
  alert("URL copied to clipboard!"); 
};

// 스크롤 방지 처리
watch(isVisible, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});

// 메서드 노출
defineExpose({ openPopup, closePopup });
</script>

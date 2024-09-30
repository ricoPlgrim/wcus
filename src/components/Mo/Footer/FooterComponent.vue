<template>
  <!-- footer 영역에 커스텀 클래스를 적용 -->
  <footer :class="['footer-wrap', props.customClass]" id="footer">
    <div class="footer-inner">
      <!-- 앱 다운로드 버튼 영역 -->
      <div class="download-wrap">
        <a href="#" target="_blank">
          <i class="ico-download">
            <span class="hidden">app download</span>
          </i>
          <p>Download Our APP</p>
        </a>
      </div>
      <!-- 약관 및 주소 정보 영역 -->
      <div class="inner-box">
        <!-- 개인정보 보호정책 및 이용 약관 링크 -->
        <div class="terms-wrap">
          <a href="#">Privacy policy</a>
          <a href="#">Terms and Conditions</a>
        </div>
        <!-- 저작권 정보 -->
        <div class="address-wrap">
          <p>© 2023 W. CONCEPT USA INC. All Rights reserved</p>
        </div>
        <!-- SNS 링크 영역 -->
        <div class="sns-wrap">
          <a href="https://www.youtube.com/@wconcept.global" target="_blank">
            <i class="ico-youtube"></i>Youtube
          </a>
          <a href="https://www.instagram.com/wconcept/" target="_blank">
            <i class="ico-instagram"></i>Instagram
          </a>
          <a href="https://www.pinterest.co.kr/wconceptus/" target="_blank">
            <i class="ico-pinterest"></i>Pinterest
          </a>
          <a href="https://www.xiaohongshu.com/user/profile/5f8f6bfd0000000001001afd" target="_blank">
            <i class="ico-hongsha"></i>小红书
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Props 정의: 부모 컴포넌트에서 전달받는 속성들
const props = defineProps<{
  customClass?: string; // footer에 추가할 커스텀 클래스 (선택적)
}>();
</script>

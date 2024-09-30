<template>
    <div class="text-box">
       <!-- 슬라이드 제목을 표시하는 강조된 텍스트 -->
       <a href="#"><strong>{{ props.currentSlideTitle }}</strong></a>
        <!-- 슬라이드 내용을 표시하는 단락, HTML 콘텐츠를 직접 삽입 -->
        <p v-html="props.currentSlideContent"></p>
        <!-- 버튼 컴포넌트 -->
        <BtnType1Components :buttons="[{ href: buttonHref, text: buttonText, classes: buttonClasses }]" />
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import BtnType1Components from '../../../../../components/Mo/Buttons/BtnType1.vue';

// 부모 컴포넌트로부터 전달받은 props 정의
const props = defineProps({
    currentSlideTitle: {
        type: String,
        default: '',  // 기본 값으로 빈 문자열 설정
    },
    currentSlideContent: {
        type: String,
        default: '',  // 기본 값으로 빈 문자열 설정
    },
    buttonHref: {
        type: String,
        default: '#',  // 기본 값으로 '#' 설정 (필요시 다른 기본 링크로 변경 가능)
    },
    buttonText: {
        type: String,
        default: 'Learn More',  // 기본 버튼 텍스트 설정
    },
    buttonClasses: {
        type: String,
        default: 'btn-primary',  // 기본 CSS 클래스 설정
    },
});
</script>
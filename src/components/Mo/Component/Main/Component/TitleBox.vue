<template>
    <div class="title-wrap">
        <!-- 제목을 표시하는 h3 요소 -->
        <h3 class="title-type2 v2">{{ props.title }}</h3>
          <!-- subText가 있을 경우에만 표시하는 단락 -->
        <p v-if="subText">{{ props.subText }}</p>
         <!-- countNum이 있을 경우에만 표시하는 단락 -->
        <p v-if="countNum"><em class="count">{{ countNum }}</em></p>
        <!-- 링크 텍스트를 포함한 앵커 태그, linkHref가 있을 경우에만 링크를 설정 -->
        <a :href="props.linkHref" class="side-box">{{ props.linkText }}</a>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    title: string;         // 제목 텍스트
    subText?: string;      // 부제목 텍스트 (선택적)
    countNum?: string;     // 카운트 숫자 (선택적)
    linkText?: string;     // 링크 텍스트 (선택적)
    linkHref?: string;     // 링크 URL (선택적)
}>();
</script>


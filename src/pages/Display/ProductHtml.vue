<template>
     <div :class="['scr-html', customClass]">
        <!-- html, 첨부파일 입력 영역 -->
        <div v-html="props.htmlContent"></div>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

// Props 정의
const props = defineProps<{
    htmlContent: string;
    customClass?: string;
}>();

</script>
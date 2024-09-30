<template>
    <div :class="['toast-box', { 'active': isActive }]" @click="hidePopup">
        {{ props.title }}
    </div>
</template>
  
<script setup lang="ts">
import { ref, defineExpose, defineProps } from 'vue';

const props = defineProps<{
    duration: number;
    title: string;
}>();

const isActive = ref(false);

const showPopup = () => {
    setTimeout(() => {
        isActive.value = true;
    }, 100); // 100ms 뒤에 active 클래스 적용
    setTimeout(() => {
        isActive.value = false;
    }, props.duration);
};

const hidePopup = () => {
    isActive.value = false;
};

defineExpose({ showPopup, hidePopup });
</script>
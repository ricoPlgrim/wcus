<template>
    <div class="scr-item brand-img">
        <img :src="props.imageData.imgSrc" :alt="props.imageData.imgAlt">
    </div>
</template>

<script setup lang="ts">
// props 정의
const props = defineProps<{
    imageData: {
        imgSrc: string;
        imgAlt: string;
    };
}>();
</script>

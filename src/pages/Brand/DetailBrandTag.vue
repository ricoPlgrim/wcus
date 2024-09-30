<template>
    <div class="scr-item brand-tag">
        <h3 class="scr-title">{{ props.title }}</h3>
        <ul class="tag-box">
            <li v-for="(tag, index) in props.tags" :key="index">
                <a :href="tag.link" class="tag-type2">{{ tag.text }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">

// Tag 타입 정의
interface Tag {
    text: string;
    link: string;
}

// props 정의
const props = defineProps<{
    title: string;
    tags: Tag[];
}>();
</script>


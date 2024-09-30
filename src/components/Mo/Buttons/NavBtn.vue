<template>
    <div class="gnb-wrap">
        <ul>
            <li v-for="(item, index) in props.menuItems" :key="index" :class="{ active: index === 0 }">
                <a :href="item.link">{{ item.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
// 컴포넌트에 전달된 props 정의
const props = defineProps<{
    menuItems: Array<{ name: string; link: string }>;  // 메뉴 항목의 배열 (각 항목은 이름과 링크를 가짐)
}>();
</script>


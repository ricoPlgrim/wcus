<template>
    <section class="style-wrap">
        <ul class="shop-list inner-box">
            <li v-for="(item, index) in props.items" :key="index">
                <router-link :to="item.url">
                    <img :src="item.src" :alt="item.alt">
                </router-link>
            </li>
        </ul>
    </section>
</template>
  
<script setup lang="ts">
import { defineProps, PropType } from 'vue';

// props 정의, items는 반드시 전달받아야 하는 배열 타입
const props = defineProps({
    items: {
        type: Array as PropType<Array<{ src: string; alt: string; url: string }>>, 
        required: true
    }
});
</script>
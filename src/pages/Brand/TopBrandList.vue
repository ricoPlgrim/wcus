<template>
    <div class="top-brand">
        <dl class="top-brand-list" v-for="brand in props.brands" :key="brand.name">
            <dt class="tit">
                <a href="javascript:;">
                    <span>{{ brand.name }}</span>
                    <i class="ico-arr2 right"></i>
                </a>
                <button class="btn-wish" :class="{ active: brand.wish }" @click="toggleWish(brand)">
                    <span class="hidden">wish</span>
                </button>
            </dt>
            <dd class="brand-list-swiper swiper">
                <swiper :observer="true" :observe-parents="true" :slides-per-view="4.24" :space-between="1" :freeMode="true"
                    :slidesOffsetAfter="20">
                    <swiper-slide class="swiper-slide" v-for="(image, index) in brand.images" :key="index">
                        <a href="javascript:;">
                            <img :src="image.src" :alt="image.alt" />
                        </a>
                    </swiper-slide>
                </swiper>
            </dd>
        </dl>
    </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

// props로 브랜드 데이터를 받음
const props = defineProps<{
    brands: {
        name: string;
        wish: boolean;
        images: { src: string; alt: string }[];
    }[];
}>();

// 부모 컴포넌트에 wish 상태 변경을 알리기 위한 emit
const emit = defineEmits(['update-wish']);

// wish 상태를 토글하는 함수
const toggleWish = (brand: { name: string; wish: boolean }) => {
    emit('update-wish', brand);
};
</script>
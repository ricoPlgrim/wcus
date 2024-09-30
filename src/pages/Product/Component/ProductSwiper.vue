<template>
    <div class="box-item">
        <div class="title-wrap">
            <h4 class="title-type3">{{ title }}</h4>
            <div class="side-box" v-if="showLikeButton">
                <em>{{ likeCount }}</em>
                <button type="button" class="btn-like" :class="{ active: isLiked }" @click="toggleLike">
                    Like
                </button>
            </div>
        </div>
        <swiper :slides-per-view="3.48" :space-between="10" :observer="true" :observe-parents="true"
            class="recommend-swiper" :slides-offset-before="20" :slides-offset-after="20">
            <swiper-slide v-for="(item, index) in products" :key="index">
                <div class="product-item">
                    <button class="btn-wish">
                        <span class="hidden">wish</span>
                    </button>
                    <div class="product-cont">
                        <a :href="item.href">
                            <div class="product-model">
                                <div class="img-box">
                                    <img :src="item.image" alt="image">
                                </div>
                            </div>
                            <div class="product-info">
                                <div class="product-title">
                                    <h3 class="brand">{{ item.brand }}</h3>
                                    <p class="title">{{ item.title }}</p>
                                </div>
                                <div class="product-price">
                                    <span class="original"><b>{{ item.originalPrice }}</b></span>
                                    <div class="special-price">
                                        <strong class="price"><b>{{ item.salePrice }}</b></strong>
                                        <em class="sale">{{ item.discount }}</em>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

// Product interface 정의
interface Product {
    brand: string;
    title: string;
    originalPrice: string;
    salePrice: string;
    discount: string;
    image: string;
    href: string;
}

// Props 정의
const props = defineProps<{
    title: string;
    products: Product[];
    likeCount?: number;
    showLikeButton?: boolean;
}>();

// Default props
const likeCount = ref(props.likeCount || 0);
const showLikeButton = props.showLikeButton !== undefined ? props.showLikeButton : false;

// Like 상태 관리
const isLiked = ref(false);

// Like 버튼 클릭 시 상태를 토글하고 카운트 업데이트
const toggleLike = () => {
    isLiked.value = !isLiked.value;
    likeCount.value += isLiked.value ? 1 : -1;
};
</script>


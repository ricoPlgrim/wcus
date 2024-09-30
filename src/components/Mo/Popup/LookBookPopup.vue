<template>
    <div :class="['pop-full', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-prdfull">
        <div class="dim"></div> <!-- 배경을 어둡게 만드는 dim 요소 -->
        <div class="pop-wrap">
            <div class="pop-title2">
                <h3 class="title-type">{{ props.lookBookData.title }}</h3> <!-- LookBook 제목 표시 -->
                <button @click="closePopup" class="pop-close"><i class="ico-close"></i><span
                        class="hidden">닫기</span></button> <!-- 팝업 닫기 버튼 -->
            </div>
            <div class="pop-content">
                <div class="product-top">
                    <div class="prd-mode">
                        <span class="count"><em>{{ props.lookBookData.products.length }}</em> items</span> <!-- 제품 개수 표시 -->
                    </div>
                </div>
                <div class="product-list">
                    <ul>
                        <li class="product-item" v-for="(product, index) in props.lookBookData.products" :key="index">
                            <button class="btn-wish">
                                <span class="hidden">wish</span> <!-- 위시리스트 버튼 -->
                            </button>
                            <div class="product-cont">
                                <a href="#">
                                    <div class="product-model">
                                        <div class="img-box">
                                            <img :src="product.image" :alt="product.alt"> <!-- 제품 이미지 및 alt 속성 -->
                                        </div>
                                    </div>
                                    <div class="product-info">
                                        <div class="product-title">
                                            <h3 class="brand">{{ product.brand }}</h3> <!-- 브랜드명 표시 -->
                                            <p class="title">{{ product.title }}</p> <!-- 제품명 표시 -->
                                        </div>
                                        <div class="product-price">
                                            <span class="original" v-if="product.originalPrice"><b>{{ product.originalPrice }}</b></span> <!-- 정가 표시, 있으면 표시 -->
                                            <div class="special-price">
                                                <strong class="price"><b>{{ product.price }}</b></strong> <!-- 할인된 가격 표시 -->
                                                <em class="sale" v-if="product.sale">{{ product.sale }}%</em> <!-- 할인율 표시, 있을 경우에만 -->
                                            </div>
                                        </div>
                                        <div class="product-bottom">
                                            <div class="tag-box">
                                                <span class="tag-type" v-for="tag in product.tags" :key="tag">{{ tag }}</span> <!-- 제품 태그 표시 -->
                                            </div>
                                            <div class="stats-box">
                                                <span class="like">
                                                    <i class="ico-star"><span class="hidden">like</span></i>
                                                    <em>{{ product.likes }}</em> <!-- 좋아요 수 표시 -->
                                                </span>
                                                <span class="color">
                                                    <i class="ico-plus v2"><span class="hidden">more</span></i>
                                                    <em>{{ product.colors }}</em> <!-- 색상 옵션 수 표시 -->
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineExpose } from 'vue';

// props 정의, LookBook 데이터 받음
const props = defineProps<{
    lookBookData: {
        title: string;
        products: Array<{
            image: string;
            alt: string;
            brand: string;
            title: string;
            originalPrice?: string; // 정가는 선택적(optional)
            price: string;
            sale?: number; // 할인율도 선택적(optional)
            tags: string[];
            likes: number;
            colors: string;
        }>
    }
}>();

// 팝업의 가시성을 제어하는 변수
const isVisible = ref(false);

// 팝업을 여는 함수
const openPopup = () => {
    isVisible.value = true;
};

// 팝업을 닫는 함수
const closePopup = () => {
    isVisible.value = false;
};

// 팝업이 열리면 스크롤을 막고, 닫히면 스크롤을 가능하게 함
watch(isVisible, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});

// 컴포넌트 외부에서 openPopup, closePopup을 호출할 수 있도록 노출
defineExpose({ openPopup, closePopup });
</script>

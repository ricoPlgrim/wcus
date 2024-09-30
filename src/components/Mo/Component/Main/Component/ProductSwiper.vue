<template>
    <!-- 탭 콘텐츠를 감싸는 div 요소로, active 상태에 따라 클래스가 적용됨 -->
       <div class="prd-content" :class="{ active: isActive }" :id="tab.id">
         <!-- 제품을 스와이프로 보여줄 수 있는 FreeModeSwiper 컴포넌트 -->
        <div class="product-swiper swiper">
            <FreeModeSwiper :slides="props.tab.items" >
                <template #default="{ slide }">
                    <div class="product-item">
                        <button class="btn-wish">
                            <span class="hidden">wish</span>
                        </button>
                        <div class="product-cont">
                            <a href="#">
                                <div class="product-model">
                                    <div class="img-box">
                                        <img :src="slide.imgSrc" :alt="slide.alt">
                                    </div>
                                </div>
                                <div class="product-info">
                                    <div class="product-title">
                                        <h3 class="brand">{{ tab.name }}</h3>
                                        <p class="title">{{ slide.title }}</p>
                                    </div>
                                    <div class="product-price">
                                        <span class="original" v-if="slide.originalPrice"><b>{{ slide.originalPrice }}</b></span>
                                        <div class="special-price">
                                            <strong class="price"><b>{{ slide.price }}</b></strong>
                                            <em class="sale">{{ slide.sale }}</em>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </template>
            </FreeModeSwiper>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import FreeModeSwiper from '../../../Swiper/FreeModeSwiper.vue'

// 부모 컴포넌트로부터 전달받은 props 정의
const props = defineProps<{
    tab: {
        id: string;
        name: string;
        items: Array<{  // 각 탭의 제품 아이템 리스트
            imgSrc: string;
            alt: string;
            title: string;
            price: string;
            sale: string;
            originalPrice?: string;  // 선택적 속성인 원래 가격
        }>;
    };
    isActive: boolean;  // 현재 탭이 활성화된 상태인지 여부를 나타내는 불린 값
}>();

// 활성화된 인덱스를 추적하는 반응형 변수
const activeIndex = ref(0);

// 컴포넌트가 마운트될 때 실행되는 로직
onMounted(() => {
    activeIndex.value = 0;  // 초기 활성화된 인덱스를 0으로 설정
});

</script>
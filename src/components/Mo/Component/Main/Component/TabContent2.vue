<template>
    <!-- 탭별 제품 리스트를 감싸는 div 요소로, active 상태에 따라 클래스가 적용됨 -->
    <div :class="['tab-prd-list2', { active: props.isActive }]" :id="props.tab.id">
        <div class="product-list" :class="{ scroll : props.tab.items.length > 2 }">
            <!-- 제품 리스트를 감싸는 div 요소 -->
            <ProductItem v-for="(item, index) in props.tab.items" :key="index" :item="item" />
        </div>
        <BtnType2Components :buttons="[
            { href: props.tab.shopLink, text: props.tab.name, classes: 'btn-type2' },
        ]" />
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ProductItem from './ProductItem.vue';
import BtnType2Components from '../../../Buttons/BtnType2.vue';

// 부모 컴포넌트로부터 전달받은 props 정의
const props = defineProps<{
    tab: {  // 각 탭에 대한 데이터 구조 정의
        id: string;  // 탭의 고유 ID
        name: string;  // 탭 이름
        items: Array<{  // 탭에 포함된 제품 리스트
            imgSrc: string;  // 제품 이미지 소스
            alt: string;  // 이미지 대체 텍스트
            title: string;  // 제품 제목
            price: string;  // 제품 가격
            sale: string;  // 할인율
            originalPrice?: string;  // 선택적 속성인 원래 가격
        }>;
        shopLink: string;  // 상점 링크 URL
    };
    isActive: boolean;  // 현재 탭이 활성화된 상태인지 여부를 나타내는 불린 값
}>();

</script>

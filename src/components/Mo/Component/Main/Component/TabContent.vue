<template>
     <!-- 탭별 제품 리스트를 감싸는 div 요소로, 탭이 활성화되었을 때만 표시 -->
    <div class="tab-prd-list" v-show="isActive" :id="props.tab.id">
        <div class="product-list">
              <!-- 제품 아이템을 반복하여 렌더링 -->
            <ProductItem v-for="(item, index) in props.tab.items" :key="index" :item="item" />
        </div>
         <!-- 버튼 컴포넌트, 탭 이름과 연동된 상점 링크를 포함 -->
        <BtnType2Components :buttons="[
            { href: props.tab.shopLink, text: props.tab.name, classes: 'btn-type2' },
        ]" />

    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import ProductItem from './ProductItem.vue';
import BtnType2Components from '../../../Buttons/BtnType2.vue'

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
    isActive: boolean; // 현재 탭이 활성화된 상태인지 여부를 나타내는 불린 값
}>();
</script>

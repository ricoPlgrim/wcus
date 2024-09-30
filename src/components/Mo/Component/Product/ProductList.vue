<template>
  <div class="product-list">
    <ul :class="[customClass]">
      <!-- products 배열을 반복하여 ProductItem 컴포넌트를 렌더링 -->
      <!-- showRanking은 true로 설정, ranking은 index + 1로 전달하여 순서대로 표시 -->
      <ProductItem v-for="(product, index) in props.products" :showRanking="showRanking" :ranking="index + 1" :key="index" :product="product" />
      <!-- 상품 프로모션 배너 영역 -->
      <li v-if="showPromotion" class="product-item product-promotion">
        <router-link to="/">
          <img src="@/assets/mo/images/temp/@temp_prd_banner.png" alt="Promotion Banner" />
        </router-link>
      </li>
      <!-- //상품 프로모션 배너 영역 -->
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';  // Vue에서 defineProps 함수를 사용
import ProductItem from './ProductItem.vue';  // ProductItem 컴포넌트 임포트
import { Product } from './ProductTypes';  // Product 타입 임포트

// 부모 컴포넌트에서 전달받는 props 정의
const props = defineProps<{
  products: Product[];  // Product 배열 형태의 제품 리스트
  customClass?: string;  // 선택적 CSS 클래스
  showRanking?: boolean; 
  showPromotion?: boolean;  // 프로모션 배너를 표시할지 여부를 결정하는 플래그
}>();

</script>


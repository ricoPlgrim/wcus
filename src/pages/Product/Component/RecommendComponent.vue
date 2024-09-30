<template>
  <div id="recommend" class="cont-box">
      <!-- 같은 브랜드의 더 많은 상품 -->
      <ProductSwiper title="More By Brand" :products="props.recommendData.moreByBrand" :likeCount="11" :showLikeButton="true" />

      <!-- 관련 상품 -->
      <ProductSwiper title="Related Products" :products="props.recommendData.relatedProducts" :showLikeButton="false" />

      <!-- 함께 자주 구매된 상품 -->
      <ProductSwiper title="Frequently Bought Together" :products="props.recommendData.frequentlyBoughtTogether" :showLikeButton="false" />
  </div>
</template>

<script setup lang="ts">
import ProductSwiper from './ProductSwiper.vue';

// 상품 데이터 타입 정의
interface Product {
  brand: string;          // 브랜드명
  title: string;          // 상품명
  originalPrice: string;  // 정가
  salePrice: string;      // 세일가
  discount: string;       // 할인율
  image: string;          // 이미지 URL
  href: string;           // 상품 상세 페이지 링크
}

// 추천 데이터 타입 정의
interface RecommendData {
  moreByBrand: Product[];                  // 같은 브랜드의 더 많은 상품 리스트
  relatedProducts: Product[];              // 관련 상품 리스트
  frequentlyBoughtTogether: Product[];     // 함께 자주 구매된 상품 리스트
}

// props로 recommendData 받기
const props = defineProps<{
  recommendData: RecommendData;             // 부모 컴포넌트로부터 추천 데이터 받음
}>();
</script>

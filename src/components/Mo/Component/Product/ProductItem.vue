<template>
  <li :class="['product-item', { soldout: props.product.soldout }]">
    <!-- 랭킹이 표시될 조건 -->
    <span v-if="props.showRanking" class="ranking-num">{{ props.ranking }}</span>
    <!-- 찜 버튼 -->
    <button class="btn-wish" :class="{ active: isWished }" @click="toggleWish">
      <span class="hidden">wish</span>
    </button>
    <div class="product-cont">
      <router-link to="/">
        <!-- 제품 이미지 -->
        <div class="product-model">
          <div class="img-box">
            <img :src="props.product.image" alt="Product Image" />
          </div>
        </div>
        <!-- 제품 정보 -->
        <div class="product-info">
          <div class="product-title">
            <h3 class="brand">{{ props.product.brand }}</h3>
            <p class="title">{{ props.product.title }}</p>
          </div>
          <div class="product-price">
            <!-- 원래 가격이 있을 경우 표시 -->
            <span v-if="props.product.originalPrice" class="original">
              <b>{{ props.product.originalPrice }}</b>
            </span>
            <div class="special-price">
              <strong class="price"><b>{{ props.product.specialPrice }}</b></strong>
              <em class="sale">{{ props.product.sale }}</em>
            </div>
          </div>
          <!-- 제품 하단 정보 -->
          <div class="product-bottom"  v-if="props.product.tags">
            <!-- 태그가 있을 경우 표시 -->
            <div class="tag-box">
              <span v-for="(tag, index) in props.product.tags" :key="index" class="tag-type">{{ tag }}</span>
            </div>
            <div class="stats-box">
              <span class="like">
                <i class="ico-star"><span class="hidden">like</span></i>
                <em>{{ props.product.likes }}</em>
              </span>
              <span class="color">
                <i class="ico-plus v2"><span class="hidden">more</span></i>
                <em>{{ props.product.colors }}</em>
              </span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { Product } from './ProductTypes';

const props = defineProps<{
  product: Product;
  showRanking?: boolean; 
  ranking?: number;
}>();

const isWished = ref(props.product.wished);

// 클릭 이벤트 핸들러
const toggleWish = () => {
  isWished.value = !isWished.value;
};

</script>

<template>
  <li class="product-item" :class="{ soldout: item.soldOut }">
    <button class="btn-wish" :class="{ active: item.wished }">
      <span class="hidden">wish</span>
    </button>
    <div class="product-cont">
      <a href="#">
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
            <span v-if="item.originalPrice" class="original"><b>{{ item.originalPrice }}</b></span>
            <div class="special-price">
              <strong class="price"><b>{{ item.specialPrice }}</b></strong>
              <em class="sale">{{ item.sale }}</em>
            </div>
          </div>
          <div class="product-bottom">
            <div class="tag-box">
              <span v-for="tag in item.tags" :key="tag" class="tag-type">{{ tag }}</span>
            </div>
            <div class="stats-box">
              <span class="like">
                <i class="ico-star"><span class="hidden">like</span></i>
                <em>{{ item.likes }}</em>
              </span>
              <span class="color">
                <i class="ico-plus v2"><span class="hidden">more</span></i>
                <em>{{ item.colors }} Colors</em>
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </li>
</template>
  
<script setup>
    import { ref, defineProps } from 'vue';
    defineProps(['item']);
</script>
  
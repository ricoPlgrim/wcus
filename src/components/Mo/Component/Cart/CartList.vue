<template>
  <div class="cart-list">
    <CartItem v-for="(item, index) in props.items" :key="index" :item="item" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import CartItem from './CartItem.vue';
import { CartItemType } from './CartItemTypes';

// Props 정의
const props = defineProps<{
  items: CartItemType[];
}>();
</script>


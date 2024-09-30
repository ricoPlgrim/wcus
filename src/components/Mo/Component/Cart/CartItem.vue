<template>
  <div :class="['cart-item', { soldout: props.item.soldout, v2: props.item.version === 2 }]">
    <div class="product-type">
      <div class="product-model">
        <a href="#">
          <div class="img-box">
            <img :src="props.item.image" alt="" />
          </div>
        </a>
      </div>
      <div class="product-info">
        <div class="product-title">
          <h3 class="brand">{{ props.item.brand }}</h3>
          <p class="title">{{ props.item.title }}</p>
          <button type="button" class="btn-del">
            <span class="hidden">delete</span>
          </button>
        </div>
        <div class="product-option">
          <ul class="list">
            <li>{{ props.item.color }}</li>
            <li>{{ props.item.size }}</li>
            <li>Qty : <b>{{ props.item.quantity }}</b></li>
          </ul>
          <button type="button" class="btn-edit">Edit</button>
        </div>
        <div class="product-price" v-if="!props.item.soldout">
          <span class="price"><b>{{ props.item.specialPrice }}</b></span>
          <span class="original" v-if="props.item.originalPrice"><b>{{ props.item.originalPrice }}</b></span>
        </div>
        <div class="product-price" v-else>
          <a href="#" class="btn-type4 v5" v-if="props.item.version !== 2">Restock Notification</a>
          <p class="msg" v-else>Not available for sale.</p>
        </div>
      </div>
    </div>
    <div class="product-btn">
      <button type="button" class="btn-wish">
        <i class="ico-like v3"></i><span>Move to WishList</span>
      </button>
      <div class="side" v-if="props.item.couponApplied">
        <p class="msg">Coupon Applied</p>
      </div>
    </div>
    <div class="product-noti" v-if="props.item.notifications">
      <ul class="list-type">
        <li v-for="(noti, index) in props.item.notifications" :key="index">{{ noti }}</li>
        <li v-if="props.item.tooltip">
          <ToolTip 
            :btnText="props.item.tooltip.text" 
            :tooltipContents="props.item.tooltip.description" 
            :tooltipSub="true"
            tooltipSubText="Non-returnable item" />
        </li>
      </ul>
    </div>
    <div class="product-tag">
      <span v-for="(tag, index) in props.item.tags" :key="index" class="tag-type">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { CartItemType } from './CartItemTypes'; 
import ToolTip from '../../../../components/Mo/Tooltip/ToolTipComponent.vue';

// Props 정의
const props = defineProps<{
  item: CartItemType;
}>();
</script>
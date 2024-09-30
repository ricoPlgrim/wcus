<template>
    <div class="product-item">
        <button class="btn-wish">
            <span class="hidden">wish</span>
        </button>
        <div class="product-cont">
            <a href="#">
                <div class="product-model">
                    <div class="img-box">
                        <img :src="props.item.imgSrc" :alt="props.item.alt">
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-title">
                        <p class="title">{{ props.item.title }}</p>
                    </div>
                    <div class="product-price">
                        <span class="original" v-if="props.item.originalPrice"><b>{{ props.item.originalPrice }}</b></span>
                        <div class="special-price">
                            <strong class="price"><b>{{ props.item.price }}</b></strong>
                            <em class="sale">{{ props.item.sale }}</em>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    item: {
        imgSrc: string;
        alt: string;
        title: string;
        price: string;
        sale: string;
        originalPrice?: string;
    };
}>();
</script>

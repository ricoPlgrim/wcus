<template>
    <div class="scr-item plan-depth">
        <div class="depth-category sticky-box" ref="stickyBoxRef">
            <div class="btn-wrap" ref="btnWrapRef">
                <button type="button" class="btn-option" @click="emitPopup('optValue-01')">
                    <span id="optValue-01">{{ props.options.optValue01 || 'Influencer`s Pick' }}</span>
                </button>

                <button type="button" class="btn-option" v-if="hasDepth02" @click="emitPopup('optValue-02')">
                    <span id="optValue-02">{{ props.options.optValue02 || '# Shoes' }}</span>
                </button>
            </div>
        </div>

        <div class="depth-product" v-for="(product, index) in props.products" :key="index">
            <div class="product-top">
                <div class="depth-title">
                    <p class="depth-01" :data-text="product.depth01">{{ product.depth01 }}</p>
                    <p class="depth-02" v-if="product.depth02" :data-text="product.depth02">{{ product.depth02 }}</p>
                </div>
                <!--여기 소트 팝업-->
                <div class="prd-type">
                    <button type="button" @click="emitSortPopup">SORT<i class="ico-sort"></i></button>
                </div>
            </div>

            <div class="product-list">
                <ul>
                    <li v-for="(item, idx) in product.items" :key="idx" :class="{ 'soldout': item.soldout }" class="product-item">
                        <button class="btn-wish" :class="{ active: item.wishActive }"> 
                            <!-- @click="emitWishClick" -->
                            <span class="hidden">wish</span>
                        </button>
                        <div class="product-cont">
                            <a href="#">
                                <div class="product-model">
                                    <div class="img-box">
                                        <img :src="item.imageSrc" :alt="item.imageAlt">
                                    </div>
                                </div>
                                <div class="product-info">
                                    <div class="product-title">
                                        <h3 class="brand">{{ item.brand }}</h3>
                                        <p class="title">{{ item.title }}</p>
                                    </div>
                                    <div class="product-price">
                                        <span class="original" v-if="item.originalPrice"><b>{{ item.originalPrice
                                                }}</b></span>
                                        <div class="special-price">
                                            <strong class="price"><b>{{ item.specialPrice }}</b></strong>
                                            <em class="sale" v-if="item.sale">{{ item.sale }}%</em>
                                        </div>
                                    </div>
                                    <div class="product-bottom">
                                        <div class="tag-box">
                                            <span class="tag-type" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                                        </div>
                                        <div class="stats-box">
                                            <span class="like">
                                                <i class="ico-star"><span class="hidden">like</span></i>
                                                <em>{{ item.likeCount }}</em>
                                            </span>
                                            <span class="color" v-if="item.colors">
                                                <i class="ico-plus v2"><span class="hidden">more</span></i>
                                                <em>{{ item.colors }}</em>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <SortPopupLayer ref="sortPopup" />
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, defineProps, defineEmits } from 'vue';
import SortPopupLayer from '../../components/Mo/Popup/SortPopup.vue';

        
// Product Item 타입 정의
interface ProductItem {
    depthGroup: number;
    depth01: string;
    depth02?: string;
    items: Array<{
        imageSrc: string;
        imageAlt: string;
        brand: string;
        title: string;
        originalPrice?: string;
        specialPrice: string;
        sale?: number;
        tags: string[];
        likeCount: number;
        colors?: string;
        wishActive: boolean;
        soldout?: boolean;
    }>;
}

// props 정의
const props = defineProps<{
    products: ProductItem[];
    options: {
        optValue01: string | null;
        optValue02: string | null;
    };
}>();

// emit 정의
const emit = defineEmits(['open-popup', 'update-sticky-ref', 'update-btn-wrap-ref', ]);

// 내부 참조 정의
const stickyBoxRef = ref<HTMLElement | null>(null);
const btnWrapRef = ref<HTMLElement | null>(null);

// depth02가 존재하는지 확인하는 computed 속성
const hasDepth02 = computed(() => {
    return props.products.some(product => product.depth02);
});



// emit 함수들
const emitPopup = (popupId: string) => {
    emit('open-popup', popupId);
};


const sortPopup = ref<InstanceType<typeof SortPopupLayer> | null>(null);


const emitSortPopup = () => {
    // emit('open-sort-popup');
    sortPopup.value?.openPopup();

};


onMounted(() => {
    // 필요한 초기화 작업
    nextTick(() => {
        if (stickyBoxRef.value) {
            emit('update-sticky-ref', stickyBoxRef.value);
        }
        if (btnWrapRef.value) {
            emit('update-btn-wrap-ref', btnWrapRef.value);
        }
    });
});

</script>

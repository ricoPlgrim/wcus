<template>
    <div class="detail-top">
        <div class="top-title">
            <p class="tit">{{ brandData.brandName }}</p>
            <button 
                class="btn-wish" 
                :class="{ active: isWishActive }"
                @click="toggleWish"
            >
                <span class="hidden">wish</span>
                <span class="count">{{ formattedWishCount }}</span>
            </button>
        </div>
        <div class="sns-link" v-if="brandData.snsLink">
            <div class="sns-list">
                <i class="ico-instagram2"></i>
                <a :href="brandData.snsLink.url">{{ brandData.snsLink.username }}</a>
            </div>
        </div>
        <div class="text-box">
            <p class="text">{{ brandData.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// BrandData 타입 정의
interface SNSLink {
    url: string;
    username: string;
}

interface BrandData {
    brandName: string;
    wishCount: string | number;
    snsLink: SNSLink;
    description: string;
}

// props 정의
const props = defineProps<{
    brandData: BrandData;
}>();

// 상태 관리
const isWishActive = ref(false);

// wishCount를 숫자로 변환
const wishCount = ref<number>(Number(props.brandData.wishCount));

// wishCount를 포맷하여 표시 (K 단위 적용)
const formattedWishCount = computed(() => {
    if (wishCount.value >= 1000) {
        return (wishCount.value / 1000).toFixed(1) + 'K'; // 1000 이상일 때 K로 표시
    } else {
        return wishCount.value.toString(); // 1000 미만일 때는 숫자로만 표시
    }
});

// wish 토글 함수
const toggleWish = () => {
    isWishActive.value = !isWishActive.value;

    // 좋아요 활성화/비활성화 시 숫자 증가/감소
    if (isWishActive.value) {
        wishCount.value += 1; // 좋아요 추가
    } else {
        wishCount.value -= 1; // 좋아요 취소
    }
};
</script>

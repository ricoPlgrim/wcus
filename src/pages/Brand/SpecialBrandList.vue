<template>
    <div class="special-brand">
        <!-- 브랜드 목록을 순회하여 표시 -->
        <dl v-for="brand in props.brands" :key="brand.name" class="special-brand-list">
            <dt class="tit">
                <router-link :to="brand.link">{{ brand.name }}</router-link>
                <!-- wish 상태에 따라 버튼 클래스 및 상태 설정 -->
                <button :class="['btn-wish', { active: brand.wish }]" @click="toggleWish(brand)">
                    <span class="hidden">wish</span>
                </button>
            </dt>
            <dd class="cnt">
                <router-link :to="brand.link" class="img-box">
                    <img :src="brand.imageSrc" :alt="brand.name" />
                </router-link>
                <div class="text-box">
                    <p class="text">{{ brand.description }}</p>
                </div>
            </dd>
        </dl>
    </div>
</template>

<script setup lang="ts">
// Brand 데이터 타입 정의
interface Brand {
    name: string;
    imageSrc: string;
    description: string;
    wish: boolean;
    link:string;
}

// props로 전달된 브랜드 리스트
const props = defineProps<{
    brands: Brand[];
}>();

// 부모 컴포넌트로 wish 상태 변경 이벤트를 emit
const emit = defineEmits(['update-wish']);

// wish 상태 토글 함수
const toggleWish = (brand: Brand) => {
    emit('update-wish', brand);
};
</script>
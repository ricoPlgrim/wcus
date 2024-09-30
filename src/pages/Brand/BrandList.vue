<template>
  <div>
    <!-- FavoritesList 컴포넌트는 selectedAlphabet이 "ALL"일 때만 노출 -->
    <FavoritesList v-if="selectedAlphabet === 'All'" />

    <div class="brand-list">
      <!-- 선택한 알파벳에 해당하는 그룹의 브랜드 리스트 표시 -->
      <div v-if="filteredBrands.length > 0">
        <p class="tit">{{ selectedAlphabet }}</p>
        <ul class="list-item">
          <!-- 각 브랜드 표시 -->
          <li v-for="brand in filteredBrands" :key="brand.name">
            <div class="brand-tit">
              <a class="name">{{ brand.name }}</a>
              <!-- exclusive가 true일 때만 태그를 표시 -->
              <div v-if="brand.exclusive" class="tag-list">
                <span class="tag">Exclusive</span>
              </div>
            </div>
            <!-- wish 버튼 클릭 시 toggleWish 호출 -->
            <button :class="['btn-wish', { active: brand.wish }]" @click="toggleWish(brand)">
              <span class="hidden">wish</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import FavoritesList from './FavoritesList.vue';

// Brand 인터페이스 선언
interface Brand {
  name: string;
  exclusive: boolean;
  wish: boolean;
}

// props로 전달받은 brands와 선택된 알파벳을 받음
const props = defineProps<{
  brands: Brand[];
  selectedAlphabet: string;
}>();

// 부모 컴포넌트로 wish 상태 변경 이벤트를 emit
const emit = defineEmits(['update-wish']);

// wish 상태를 토글하는 함수
const toggleWish = (brand: Brand) => {
  emit('update-wish', brand);
};

// 선택된 알파벳에 맞는 브랜드 필터링
const filteredBrands = computed(() => {
  const alphabet = props.selectedAlphabet.toUpperCase();

  if (alphabet === 'ALL') {
    return props.brands; // All일 때 모든 브랜드 반환
  } else if (alphabet === '0-9') {
    return props.brands.filter(brand => /^[0-9]/.test(brand.name));
  } else if (alphabet === '#') {
    return props.brands.filter(brand => /^[^a-zA-Z0-9]/.test(brand.name));
  } else {
    return props.brands.filter(brand => brand.name.startsWith(alphabet));
  }
});
</script>

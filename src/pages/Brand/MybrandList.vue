<template>
  <div>
    <!-- 미 로그인 시 (s) -->
    <div v-if="!isLoggedIn" class="login-wrap notification-text">
      <p>You can check it after logging in.</p>
      <div class="btn-wrap">
        <button type="button" class="btn-type btn-full" @click="signIn">SIGN IN</button>
      </div>
    </div>
    <!-- // 미 로그인 시 (e) -->

    <!-- 로그인 상태의 사용자가 등록한 MY Favorite Brands 가 없을 시 (s) -->
    <div v-if="isLoggedIn && filteredBrands.length === 0" class="nodata-wrap2 notification-text">
      <div class="title">Nothing Saved</div>
      <p>Explore our finest designer brands.</p>
    </div>
    <!-- // 로그인 상태의 사용자가 등록한 MY Favorite Brands 가 없을 시 (e) -->

    <!-- 추천 브랜드 목록 (s) -->
    <div v-if="isLoggedIn && filteredBrands.length > 0" class="brand-list">
      <div class="my-wish-list">
        <ul class="list-item">
          <li v-for="(brand, index) in filteredBrands" :key="index">
            <div class="brand-tit">
              <a href="javascript:;" class="name">{{ brand.name }}</a>
              <div v-if="brand.exclusive" class="tag-list">
                <span class="tag">Exclusive</span>
              </div>
            </div>
            <button class="btn-wish" :class="{ active: brand.wish }" @click="toggleWish(brand)">
              <span class="hidden">wish</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
    <!-- // 추천 브랜드 목록 (e) -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// props로 브랜드 데이터를 받음
const props = defineProps<{
  isLoggedIn: boolean;
  brands: {
    name: string;
    exclusive: boolean;
    wish: boolean;
  }[];
}>();

// wish가 true인 브랜드만 필터링
const filteredBrands = computed(() => {
  return props.brands.filter(brand => brand.wish);
});

// 부모 컴포넌트에 wish 상태 변경을 알리기 위한 emit
const emit = defineEmits(['update-wish', 'sign-in']);

// wish 상태를 토글하는 함수
const toggleWish = (brand: { name: string; wish: boolean }) => {
  emit('update-wish', brand);
};

// 로그인 버튼 클릭 시 이벤트
const signIn = () => {
  emit('sign-in');
};
</script>

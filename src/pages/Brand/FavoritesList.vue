<template>
    <div class="brand-list">
      <p class="tit">Featured Brands</p>
      <ul class="list-item">
        <li v-for="(brand, index) in favoriteBrands" :key="index">
          <div class="brand-tit">
            <a href="javascript:;" class="name">{{ brand.name }}</a>
            <!-- Exclusive가 true일 때만 태그를 표시 -->
            <div v-if="brand.exclusive" class="tag-list">
              <span class="tag">Exclusive</span>
            </div>
          </div>
          <!-- wish 버튼이 active 상태일 경우 클래스를 적용 -->
          <button :class="['btn-wish', { active: brand.wish }]" @click="toggleWish(index)">
            <span class="hidden">wish</span>
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // 브랜드 타입 정의
  interface Brand {
    name: string;
    exclusive: boolean;
    wish: boolean; // 즐겨찾기 상태
  }
  
  // 즐겨찾기 목록 데이터 (예시로 고정된 데이터를 사용)
  const favoriteBrands = ref<Brand[]>([
    { name: 'FRONTROW', exclusive: true, wish: false },
    { name: 'Bye Bye Bad Man', exclusive: false, wish: false },
    { name: 'BENSIMON', exclusive: false, wish: false },
    { name: 'FRONTROW', exclusive: true, wish: false },
    { name: 'Bye Bye Bad Man', exclusive: false, wish: false }
  ]);
  
  // wish 상태를 토글하는 함수
  const toggleWish = (index: number) => {
    favoriteBrands.value[index].wish = !favoriteBrands.value[index].wish;
  };
  </script> 
  
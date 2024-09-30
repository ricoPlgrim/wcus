<template>
  <div :class="['content-area', 'cricle']">
    <div class="circle_contents">
      <ul class="cricle_list">
        <!-- 색상 선택 -->
        <li v-for="(item, colorIndex) in props.colors" :key="colorIndex" :class="{ active: item.active }">
          <button class="cricle_button" @click="handleColorSelection( 'color', colorIndex, item.name)"> 
            <div class="cricle_box" :class="{ white: item.name === 'white' }">
              <!-- 배경 이미지가 있을 경우 -->
              <div v-if="item.backgroundImage" :style="{ backgroundImage: 'url(' + item.backgroundImage + ')' }" class="cricle_bg"></div>
              <!-- 그렇지 않으면 배경색 표시 -->
              <div v-else :style="{ backgroundColor: item.backgroundColor }" class="cricle_bg"></div>
            </div>
            <span class="name">{{ item.name }}</span>
          </button>
        </li>
        <!-- 리셋 버튼 -->
        <li class="reset">
          <button class="cricle_button" @click="clearItems">
            <div class="cricle_box clear ">
              <img :src="ResetImg" alt="clear" />
            </div>
            <span class="name">Reset</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';

// 색상 데이터에 대한 인터페이스 정의
interface ColorItem {
  name: string;
  active: boolean;
  backgroundImage?: string;
  backgroundColor?: string;
}

// Props 정의
interface ColorProps {
  colors: ColorItem[];
  ResetImg: string;
  clearItems: () => void;
  selectedItems?: { label: string; selected: boolean }[];
}

// Props와 Emits 정의
const props = defineProps<ColorProps>();
const emit = defineEmits<{
  (event: 'update-color-items', category: string, colorIndex: number, colorName: string): void;
}>();

// 색상 선택을 처리하는 함수
const handleColorSelection = ( category: string, colorIndex: number, colorName: string) => {
   // 선택된 색상 인덱스와 색상 이름을 함께 부모 컴포넌트에 전달
  emit('update-color-items', 'Color', colorIndex, colorName);
};


watch(
  () => props.selectedItems || [],
  (newSelectedItems) => {
    props.colors.forEach((color) => {
      // selectedItems에서 해당 색상이 선택된 상태인지 확인하고 active 값을 설정
      color.active = newSelectedItems.some(item => item.label === color.name);
    });
  },
  { immediate: true } // 컴포넌트가 마운트될 때 즉시 동기화
);


</script>

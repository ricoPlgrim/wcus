<template>
  <div :class="['content-area', 'cricle']">
    <div class="circle_contents">
      <ul class="cricle_list">
        <!-- 패턴 선택 -->
        <li v-for="(item, patternIndex) in props.patterns" :key="patternIndex" :class="{ active: item.active }">
          <button class="cricle_button" @click="handleColorSelection( 'pattern', patternIndex, item.name)">
            <div class="cricle_box" :class="{ white: item.name === 'white' }">
              <!-- 배경 이미지가 있는 경우 표시 -->
              <div v-if="item.backgroundImage" :style="{ backgroundImage: 'url(' + item.backgroundImage + ')' }" class="cricle_bg"></div>
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

// 패턴 항목에 대한 인터페이스 정의
interface PatternItem {
  name: string;
  active: boolean;
  backgroundImage?: string;
  backgroundColor?: string;
}

// Props 인터페이스 정의
interface PatternProps {
  patterns: PatternItem[];
  ResetImg: string;
  clearItems: () => void;
  selectedItems?: { label: string; selected: boolean }[];
}

// 이벤트 발생기 정의
const props = defineProps<PatternProps>();
const emit = defineEmits<{
  (event: 'update-pattern-items', category: string, patternIndex: number, pattenName: string): void;
}>();

// 패턴 선택 핸들러
const handleColorSelection = ( category: string, patternIndex: number, pattenName: string) => {
    // 선택된 패턴 인덱스와 이름을 부모 컴포넌트로 전달
  emit('update-pattern-items', 'Pattern', patternIndex, pattenName); 
};

watch(
  () => props.selectedItems || [],
  (newSelectedItems) => {
    props.patterns.forEach((patterns) => {
      // selectedItems에서 해당 색상이 선택된 상태인지 확인하고 active 값을 설정
      patterns.active = newSelectedItems.some(item => item.label === patterns.name);
    });
  },
  { immediate: true } // 컴포넌트가 마운트될 때 즉시 동기화
);



</script>

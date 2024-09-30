<!-- SizeComponent.vue -->
<template>
  <div class="content-area size checkbox">
    <h4>Size</h4>
    <div class="size_contents">
      <ul class="size_list">
        <li v-for="(size, sizeIndex) in props.sizes" :key="sizeIndex"
            :class="{ 'disabled': size.isDisabled, 'active': size.selected }">
          <label class="size-checkbox-label">
            <input type="checkbox" v-model="size.selected"
                   :disabled="size.isDisabled"
                   @click="handleSizeSelection(sizeIndex)">
            <span :class="{ checked: size.selected }">{{ size.label }}</span>
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';

interface Size {
  label: string;
  selected: boolean;
  isDisabled: boolean;
}

// Props 정의
const props = defineProps<{
  sizes: Size[];
  clearItems: () => void;
  selectedItems?: { label: string; selected: boolean }[];
}>();

// Emits 정의
const emit = defineEmits<{
  (event: 'update-size-items', sizeIndex: number): void;
}>();

// 사이즈 선택 처리 함수
const handleSizeSelection = (sizeIndex: number) => {
  emit('update-size-items', sizeIndex);
};

watch(
  () => props.selectedItems || [],
  (newSelectedItems) => {
    props.sizes.forEach((sizes) => {
      // selectedItems에서 해당 색상이 선택된 상태인지 확인하고 active 값을 설정
      sizes.selected = newSelectedItems.some(item => item.label === sizes.label);
    });
  },
  { immediate: true } // 컴포넌트가 마운트될 때 즉시 동기화
);



</script>
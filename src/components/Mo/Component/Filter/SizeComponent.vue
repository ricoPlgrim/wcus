<template>
  <div class="content-area size checkbox">
    <h4>Size</h4>
    <div class="size_contents">
      <ul class="size_list">
        <li v-for="(size, sizeIndex) in sizes" :key="sizeIndex"
          :class="{ 'disabled': size.isDisabled, 'active': size.selected }">
          <label class="size-checkbox-label">
            <input type="checkbox" :disabled="size.isDisabled" :checked="size.selected"
              @change="updateSelected(sizeIndex)" />
            <span :class="{ checked: size.selected }">{{ size.label }}</span>
          </label>
        </li>
      </ul>
      <button @click="clearItems" class="clear-button">Clear All</button>
    </div>
  </div>
</template>

<script setup lang="ts">

// Size 타입 정의
interface Size {
  label: string;
  selected: boolean;
  isDisabled: boolean;
}

// props에서 sizes 배열을 받음
const props = defineProps<{
  sizes: Size[];
}>();

// 부모 컴포넌트에 이벤트 전달을 위한 emit 정의
const emit = defineEmits(['update-selected-items', 'clear-items']);

const updateSelected = (sizeIndex: number) => {
    // 선택된 사이즈 인덱스와 함께 부모 컴포넌트에 'update-selected-items' 이벤트를 전달
  emit('update-selected-items', 'Size', sizeIndex);
};

const clearItems = () => {
    // 'clear-items' 이벤트를 부모 컴포넌트에 전달
  emit('clear-items', 'Size');
};
</script>
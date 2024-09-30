<template>
  <div class="content-area radiobox">
    <h4>New Arrivals</h4>
    <div class="radio_contents">
      <ul>
        <li v-for="(option, index) in props.newArrivalsOptions" :key="index" :class="{ active: option.selected }"
            @click="handleSelection(option)">
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface NewArrivalOption {
  label: string;
  selected: boolean;
}

// Props 정의
const props = defineProps<{
  newArrivalsOptions: NewArrivalOption[];
}>();

// Emits 정의
const emit = defineEmits<{
  (event: 'select-option', selectedOption: NewArrivalOption): void;
}>();

// New Arrival 옵션 선택 처리 함수
const handleSelection = (selectedOption: NewArrivalOption) => {
   // 선택된 옵션을 부모 컴포넌트로 전달
  emit('select-option', selectedOption);
};
</script>
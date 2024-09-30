<template>
  <div class="content-area radiobox">
    <h4>New Arrivals</h4>
    <div class="radio_contents">
      <ul>
        <li v-for="(option, index) in newArrivalsOptions" :key="index" :class="{ active: option.selected }"
          @click="selectOption(index)">
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// NewArrivalsOption 타입 정의
interface NewArrivalsOption {
  label: string;
  selected: boolean;
}

// props에서 newArrivalsOptions 타입 지정
const props = defineProps<{
  newArrivalsOptions: NewArrivalsOption[];
}>();

const emit = defineEmits(['update-selected-items']);

const selectOption = (index: number) => {
  emit('update-selected-items', 'New Arrivals', index);
};
</script>
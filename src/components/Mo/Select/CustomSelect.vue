<template>
  <div :class="['select-container', typeClass, { disabled, active: isOpen }]">
    <!-- Native select -->
    <select v-if="type === 'native'" v-model="selectedValue" :disabled="disabled" @change="emitChange">
      <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">
        {{ option.label }}
      </option>
    </select>

    <!-- Custom select with buttons -->
    <div v-else :class="typeClass">
      <div class="select-option" @click="toggleDropdown">{{ selectedLabel }}</div>
      <ul v-if="isOpen">
        <li v-for="option in options" :key="option.value">
          <button @click="selectOption(option)" :disabled="option.disabled">{{ option.label }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';

defineOptions({
  name: 'CustomSelect'
});

const props = defineProps<{
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  disabled?: boolean;
  initialSelected?: string;
  type?: string;
  typeClass?: string;
}>();

const emit = defineEmits(['change']);

const isOpen = ref(false);
const selectedValue = ref(props.initialSelected || 'newst');

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(option => option.value === selectedValue.value);
  return selectedOption ? selectedOption.label : '';
});

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option: { label: string; value: string; disabled?: boolean }) => {
  if (!option.disabled) {
    selectedValue.value = option.value;
    isOpen.value = false;
    emitChange();
  }
};

const emitChange = () => {
  emit('change', selectedValue.value);
};
</script>


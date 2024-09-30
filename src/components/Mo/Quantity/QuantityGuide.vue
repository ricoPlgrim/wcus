<template>
  <div :class="['form-item', 'quantity', { disabled, full }]">
    <button type="button" class="btn-minus" @click="decreaseQuantity" :disabled="isDecreaseDisabled"
      :class="{ 'not-allowed': isDecreaseDisabled }">
      <i class="ico-minus"></i><span class="hidden">수량 감소</span>
    </button>
    <input type="text" class="num" :value="quantity" @input="updateQuantity" :disabled="disabled"
      @keydown="disabled ? $event.preventDefault() : null" :style="{ pointerEvents: isInputDisabled ? 'none' : 'auto' }"
      minlength="1">
    <button type="button" class="btn-plus" @click="increaseQuantity" :disabled="isIncreaseDisabled"
      :class="{ 'not-allowed': isIncreaseDisabled }">
      <i class="ico-plus v3"></i><span class="hidden">수량 증가</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  initialQuantity?: number;
  minQuantity?: number;
  maxQuantity?: number;
  disabled?: boolean;
  full?: boolean;
}>();


defineOptions({
  name: 'QuantityGuide'
});


const quantity = ref(props.initialQuantity ?? 1);

// 수량 감소 버튼이 비활성화 상태인지 여부를 반환
const isDecreaseDisabled = computed(() => props.disabled || quantity.value <= (props.minQuantity ?? 1));

// 수량 증가 버튼이 비활성화 상태인지 여부를 반환
const isIncreaseDisabled = computed(() => props.disabled || quantity.value >= (props.maxQuantity ?? Infinity));

// 수량 입력 필드가 비활성화 상태인지 여부를 반환
const isInputDisabled = computed(() => props.disabled || isDecreaseDisabled.value || isIncreaseDisabled.value);

// 수량을 감소시키는 함수
const decreaseQuantity = () => {
  if (!isDecreaseDisabled.value) {
    quantity.value -= 1;
  }
};

// 수량을 증가시키는 함수
const increaseQuantity = () => {
  if (!isIncreaseDisabled.value) {
    quantity.value += 1;
  }
};

// 입력 필드에서 수량을 업데이트하는 함수
const updateQuantity = (event: Event) => {
  const newQuantity = parseInt((event.target as HTMLInputElement).value, 10);
  if (!isNaN(newQuantity) && newQuantity >= (props.minQuantity ?? 1) && newQuantity <= (props.maxQuantity ?? Infinity)) {
    quantity.value = newQuantity;
  }
};
</script>

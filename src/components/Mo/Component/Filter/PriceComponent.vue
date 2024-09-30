<template>
  <div class="content-area range">
    <h4>Price</h4>
    <div class="range_contents">
      <p class="range_text">(${{ localSliderValue[0] }} ~ ${{ localSliderValue[1] }})</p>
      <!-- v-model을 사용하여 슬라이더 값 양방향 바인딩 -->
      <Slider v-model="localSliderValue" :min="min" :max="max" :tooltips="false" @input="onSliderChange"   />
      <div class="price-range">
        <span>${{ localSliderValue[0] }}</span>
        <span>${{ localSliderValue[1] }}</span>
      </div>
    </div>
    <div class="price-filter">
      <ul class="price_list">
        <li v-for="(price, priceIndex) in priceOptions" :key="priceIndex"
            :class="{ 'active': price.selected }" @click="handlePriceClick(priceIndex)">
          {{ price.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// https://www.npmjs.com/package/@vueform/slider 사용방법 자세히 나와있음
import Slider from '@vueform/slider';
import { ref, defineProps, defineEmits, watch, nextTick } from 'vue';

// Props 정의
interface PriceOption {
  label: string;
  selected: boolean;
  range: [number, number];
}

const props = defineProps<{
  min: number;
  max: number;
  priceOptions: PriceOption[];
  initialSliderValue: [number, number];
  selectedItems?: { label: string }[]; // selectedItems는 부모로부터 전달되는 선택된 항목
}>();

const emit = defineEmits<{
  (event: 'update-price', value: [number, number]): void;
  (event: 'update-price-option', priceIndex: number, range: [number, number]): void;
}>();

// 슬라이더 값 관리
const localSliderValue = ref<[number, number]>(props.initialSliderValue);

// 슬라이더 값 변경 시 처리 함수
const onSliderChange = (value: [number, number]) => {
  localSliderValue.value = value;

  // 슬라이더를 움직일 때 모든 가격 옵션의 선택을 해제
  props.priceOptions.forEach(option => {
    option.selected = false;
  });
  
  emit('update-price', value); // 부모 컴포넌트로 변경된 슬라이더 값 전달
};

// 가격 옵션 클릭 시 처리 함수
const handlePriceClick = (priceIndex: number) => {
  const selectedRange = props.priceOptions[priceIndex].range; // 선택된 가격 옵션의 range 값 가져오기
  emit('update-price-option', priceIndex, selectedRange); // 선택된 가격 옵션의 인덱스와 range를 부모 컴포넌트로 전달
};

// Watch를 사용하여 localSliderValue가 업데이트될 때 슬라이더에 반영
watch(localSliderValue, (newValue) => {
  emit('update-price', newValue); // 값이 변경될 때마다 부모에게 전달
});

// props에서 초기값 변경을 감지하고 localSliderValue 업데이트
watch(() => props.initialSliderValue, (newValue) => {
  localSliderValue.value = newValue;
});


watch(
  () => props.selectedItems,
  async (newSelectedItems) => {
    let hasSelectedPriceOption = false;

    props.priceOptions.forEach((priceOption) => {
      // selectedItems에서 해당 가격 범위가 선택된 상태인지 확인하고 selected 값을 설정
      priceOption.selected = newSelectedItems.some(item => item.label === priceOption.label);

      // 가격 옵션이 선택된 경우를 체크
      if (priceOption.selected) {
        hasSelectedPriceOption = true;
      }
    });

    // 선택된 가격 옵션이 없는 경우 localSliderValue를 min, max 값으로 초기화
    if (!hasSelectedPriceOption && (localSliderValue.value[0] !== props.min || localSliderValue.value[1] !== props.max)) {
      await nextTick(); // DOM이 완전히 렌더링된 후에 실행
      localSliderValue.value = [props.min, props.max]; // min과 max 값을 슬라이더에 반영
    }
  },
  { immediate: true }
);

</script>

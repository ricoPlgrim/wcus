<template>
  <div class="depth-category sticky-box">
    <!-- 1depth일 경우 -->
    <div v-if="isOneDepth" class="btn-wrap">
      <button
        type="button"
        class="btn-option"
        @click="openLayerPopup('#pop-category-01', 'optValue')"
      >
        <span id="optValue">{{ oneDepthText }}</span>
      </button>
    </div>
    <!-- 2depth일 경우 -->
    <div v-else class="btn-wrap">
      <button
        type="button"
        class="btn-option"
        @click="openLayerPopup('#pop-category-01', 'optValue-01')"
      >
        <span id="optValue-01">{{ twoDepthText1 }}</span>
      </button>
      <button
        type="button"
        class="btn-option"
        @click="openLayerPopup('#pop-category-02', 'optValue-02')"
      >
        <span id="optValue-02">{{ twoDepthText2 }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineExpose,  ref } from 'vue';

interface DepthCategory {
  id: string;
  label: string;
}

const props = defineProps<{
  isOneDepth: boolean;
  productCategories: DepthCategory[];
}>();

const oneDepthText = ref(
  props.productCategories.length > 0 ? props.productCategories[0].label : 'Choose a Category'
);
const twoDepthText1 = ref(
  props.productCategories.length > 0 ? props.productCategories[0].label : 'Influencer’s Pick'
);
const twoDepthText2 = ref(
  props.productCategories.length > 1 ? props.productCategories[1].label : '# Shoes'
);

// updateDepthTexts 메서드 정의
const updateDepthTexts = (depth01: string, depth02: string) => {
  oneDepthText.value = depth01;
  twoDepthText1.value = depth02;
};

// defineExpose를 사용해 메서드를 외부로 노출
defineExpose({
  updateDepthTexts,
});

const openLayerPopup = (selId: string, value: string): void => {
  console.log('Open Layer Popup:', selId, value);
};
</script>

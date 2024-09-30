<template>
  <div class="fixed-bottom">
    <div :class="computedButtonClass">
      <button type="button" class="btn-wish" v-if="props.showWishButton">
        <i class="ico-like v2"></i>
        <span class="hidden">wish</span>
      </button>
      <button type="button" :class="computedButtonClasses" :disabled="props.isDisabled">
        <template v-if="props.buttonTextSecondLine">
          <div>
            {{ props.buttonText }}
            <p>{{ props.buttonTextSecondLine }}</p>
          </div>
        </template>
        <template v-else-if="props.total && props.order">
          <em>{{ props.total }}</em>
          <span>{{ props.order }}</span>
        </template>
        <template v-else>
          {{ props.buttonText }}
        </template>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  buttonText: string;
  buttonTextSecondLine?: string;
  buttonClass?: string;
  buttonClasses?: string;
  isDisabled?: boolean;
  showWishButton?: boolean;
  total?: string;
  order?: string;
}>();

const computedButtonClass = computed(() => props.buttonClass || 'btn-type3 v3');
const computedButtonClasses = computed(() => props.buttonClasses || '');
</script>

<style scoped></style>

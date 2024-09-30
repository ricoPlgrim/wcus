<template>
  <div class="btn-wrap2">
    <button type="button"  :class="moreTotalClass ? moreTotalClass : 'btn-type2'"   @click="$emit('click')">
      More {{ props.currentNum }}/{{ props.totalPage }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  currentNum: number;
  totalPage: number;
  moreTotalClass?: string;
}>();
</script>
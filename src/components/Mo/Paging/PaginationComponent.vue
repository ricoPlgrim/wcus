<template>
  <div class="paging-wrap">
    <PaginationButton isPrev :isActive="false" :isNext="false" :isDisabled="isDisabled || currentPage === 1"
      @click="prevPage">
    </PaginationButton>

    <PaginationButton v-for="page in pages" :key="page" :isActive="shouldBeActive(page)" :isPrev="false" :isNext="false"
      :isDisabled="isDisabled" @click="() => goToPage(page)">
      {{ page }}
    </PaginationButton>

    <PaginationButton isNext :isActive="false" :isPrev="false" :isDisabled="isDisabled || currentPage === totalPages"
      @click="nextPage">
    </PaginationButton>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import PaginationButton from './PaginationButton.vue';

const props = defineProps<{
  totalPages: number;
  activePage?: number;
  active?: boolean;
}>();

const currentPage = ref(props.activePage || 1);

const isDisabled = computed(() => props.totalPages === 1);

const pages = computed(() => {
  const pagesArray = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

const shouldBeActive = (page: number) => {
  if (props.totalPages === 1) {
    return props.active && page === 1;
  }
  return page === currentPage.value;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < props.totalPages) {
    currentPage.value++;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};
</script>
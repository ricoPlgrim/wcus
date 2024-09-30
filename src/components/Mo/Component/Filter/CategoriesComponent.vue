<template>
  <div class="content-area categories">
    <div class="list_contents">
      <ul>
        <li v-for="(category, catIndex) in localCategories" :key="catIndex">
          <a href="javascript:;" :class="{ isOpen: category.isOpen }">
            <span
              @click="category.subCategories.length > 0 ? toggleCategory(catIndex) : handleUpdateSelectedItems('Categories', catIndex)">
              {{ category.label }}
            </span>
            <i class="ico-arr2" v-if="category.subCategories.length"></i>
            <ul v-if="category.isOpen && category.subCategories.length > 0" class="subDep">
              <li v-for="(subCategory, subIndex) in category.subCategories" :key="subIndex">
                <label class="checkbox-label">
                  <input
                    type="checkbox"
                    :value="subCategory.label"
                    @change="handleUpdateSelectedItems('Categories', catIndex, subIndex)"
                    :checked="subCategory.selected"
                  />
                  <span :class="{ checked: subCategory.selected }">{{ subCategory.label }}</span>
                </label>
              </li>
            </ul>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

// 카테고리 및 서브카테고리 타입 정의
interface SubCategory {
  label: string;
  selected: boolean;
}

interface Category {
  label: string;
  isOpen: boolean;
  selected?: boolean;
  subCategories: SubCategory[];
}

// Props 전달 받기
const props = defineProps<{
  categories: Category[];
  selectedItems: { label: string; selected: boolean }[];
  updateSelectedItems: (category: string, mainIndex: number, subIndex?: number | null) => void;
}>();

// 로컬 상태로 categories 복사
const localCategories = ref<Category[]>([...props.categories]);

// props.categories가 변경되면 localCategories도 업데이트
watch(
  () => props.categories,
  (newCategories) => {
    localCategories.value = [...newCategories];
  }
);

// selectedItems와 localCategories의 동기화
watch(
  () => props.selectedItems,
  (newSelectedItems) => {
    localCategories.value.forEach((category) => {
      category.subCategories.forEach((subCategory) => {
        subCategory.selected = newSelectedItems.some(item => item.label === subCategory.label);
      });
    });
  },
  { immediate: true } // 컴포넌트가 마운트될 때 즉시 동기화
);

// 카테고리 서브메뉴 열고 닫기
const toggleCategory = (index: number) => {
  localCategories.value[index].isOpen = !localCategories.value[index].isOpen;
};

// updateSelectedItems 함수 호출을 안전하게 처리하는 핸들러
const handleUpdateSelectedItems = (category: string, mainIndex: number, subIndex: number | null = null) => {
  // updateSelectedItems가 정의되었는지 확인한 후 호출
  if (typeof props.updateSelectedItems === 'function') {
    props.updateSelectedItems(category, mainIndex, subIndex);
  } else {
    console.warn('updateSelectedItems 함수가 정의되지 않았습니다.');
  }
};
</script>

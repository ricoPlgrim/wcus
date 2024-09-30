<template>
  <div class="content-area brand">
    <h4>Brand</h4>
    <div class="brand_contents">
      <form>
        <input placeholder="Search" v-model="localSearchQuery" />
        <button type="button" class="reset-button" v-if="localSearchQuery" @click="resetInput"></button>
      </form>

      <div class="brands-category-container">
        <span :class="['prev ico-arr2 right', { 'disabled': isPrevDisabled }]" @click="scrollLeft"></span>
        <div class="brands-index" ref="brandsIndex" @scroll="checkScrollPosition">
          <span v-for="(letter, index) in alphabet" :key="index" @click="scrollToHeader(letter, index)">
            {{ letter }}
          </span>
        </div>
        <span :class="['next ico-arr2 right', { 'disabled': isNextDisabled || !isBrandsIndexAvailable }]" @click="scrollRight"></span>
      </div>

      <div class="brands-cetegory-scrollbox">
        <ul class="scroller">
          <li
            v-for="(brand, brandIndex) in filteredBrands"
            :key="brand.id"
            :data-brand-id="brand.id"
            :class="{ 'header': brand.isHeader }"
          >
            <span v-if="brand.isHeader">{{ brand.label }}</span>
            <label v-else class="brand-checkbox-label">
              <input type="checkbox" :checked="brand.selected" @change="handleUpdateSelectedItems('Brand', brand.label, brandIndex)" />
              <span :class="{ checked: brand.selected }">{{ brand.label }}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { gsap } from 'gsap';

// 브랜드 타입 정의
interface Brand {
  id: string;
  label: string;
  selected?: boolean;
  isHeader?: boolean;
}

// Props 전달 받기
const props = defineProps<{
  brands: Brand[];
  selectedItems?: { label: string; selected: boolean }[];
  updateBrandItems: (category: string, brandLabel: string, brandIndex: number) => void;
}>();

const localSearchQuery = ref(''); // 검색어 입력 값
const alphabet = ref(['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']); // 알파벳 인덱스
const brandsIndex = ref<HTMLElement | null>(null); // 브랜드 인덱스 영역
const isPrevDisabled = ref(false); // 이전 버튼 상태
const isNextDisabled = ref(false); // 다음 버튼 상태

// 로컬 상태로 brands 복사
const localBrands = ref<Brand[]>([...props.brands]);

// brandsIndex 요소가 있는지 확인
const isBrandsIndexAvailable = computed(() => !!brandsIndex.value);

// 필터링된 브랜드 리스트 반환
const filteredBrands = computed(() => {
  return localBrands.value.filter(brand => brand.label.toLowerCase().includes(localSearchQuery.value.toLowerCase()));
});

// 스크롤 위치에 따라 버튼 상태 업데이트
const checkScrollPosition = (event: Event) => {
  const element = event.target as HTMLElement;
  updateButtonStates(element);
};

// 검색어 리셋
const resetInput = () => {
  localSearchQuery.value = '';
};

// 왼쪽으로 스크롤
const scrollLeft = () => {
  if (brandsIndex.value) {
    calculateScroll(brandsIndex.value, 'left');
  }
};

// 오른쪽으로 스크롤
const scrollRight = () => {
  if (brandsIndex.value) {
    calculateScroll(brandsIndex.value, 'right');
  }
};

// 스크롤 계산 및 애니메이션 적용
const calculateScroll = (element: HTMLElement, direction: 'left' | 'right') => {
  const spans = element.querySelectorAll('span');
  if (spans.length >= 2) {
    const span1Width = spans[0].clientWidth;
    const span2Width = spans[1].clientWidth;
    const visibleWidth = span1Width + span2Width;
    const scrollPosition = element.scrollLeft;
    const maxScrollLeft = element.scrollWidth - element.clientWidth;

    let newScrollPosition;
    if (direction === 'left') {
      newScrollPosition = Math.max(scrollPosition - visibleWidth, 0);
    } else {
      newScrollPosition = Math.min(scrollPosition + visibleWidth, maxScrollLeft);
    }

    gsap.to(element, {
      duration: 0.5,
      scrollLeft: newScrollPosition,
      ease: 'power2.out'
    });
    updateButtonStates(element);
  }
};

// 해당 헤더로 스크롤 이동
const scrollToHeader = (letter: string, index: number) => {
  const scroller = document.querySelector('.brands-cetegory-scrollbox .scroller') as HTMLElement | null;
  const headerElement = scroller?.querySelector(`li[data-brand-id^='header'][data-brand-id$='${index + 1}']`) as HTMLElement | null;

  if (headerElement && scroller) {
    const headerOffsetTop = headerElement.offsetTop;
    const scrollerOffsetTop = scroller.offsetTop;

     // gsap 애니메이션으로 스크롤 이동
    gsap.to(scroller, {
      duration: 0.5,
      scrollTop: headerOffsetTop - scrollerOffsetTop,
      ease: 'power2.out'
    });
  }
};

// 스크롤 위치에 따라 버튼 상태 업데이트
const updateButtonStates = (element: HTMLElement) => {
  const scrollPosition = element.scrollLeft;
  const maxScrollLeft = element.scrollWidth - element.clientWidth;
  isPrevDisabled.value = scrollPosition === 0;
  isNextDisabled.value = scrollPosition >= maxScrollLeft;
};

// 선택된 아이템 처리
const handleUpdateSelectedItems = (category: string, brandLabel: string, brandIndex: number) => {
  const selectedBrand = filteredBrands.value.find((brand, index) => index === brandIndex);

  if (selectedBrand) {
    selectedBrand.selected = !selectedBrand.selected;
    props.updateBrandItems(category, brandLabel, brandIndex);
  } else {
    console.error('Selected brand not found');
  }
};

// props.brands가 변경되면 localBrands도 업데이트
watch(
  () => props.brands,
  (newBrands) => {
    localBrands.value = [...newBrands];
  }
);

// props.selectedItems와 localBrands의 동기화
watch(
  () => props.selectedItems || [],
  (newSelectedItems) => {
    localBrands.value.forEach((brand) => {
      brand.selected = newSelectedItems.some(item => item.label === brand.label);
    });
  },
  { immediate: true } // 컴포넌트가 마운트될 때 즉시 동기화
);

// 컴포넌트가 마운트되었을 때 버튼 상태 초기화
onMounted(async () => {
  await nextTick();

  if (brandsIndex.value) {
    updateButtonStates(brandsIndex.value);
  } else {
    console.error('brandsIndex is not found.');
  }
});
</script>

<template>
    <div class="scr-item plan-depth">
        <div ref="productTop" class="product-top">
            <div class="prd-mode">
                <div :class="['chk-box', { selected: isSaleOnly }]">
                    <input type="checkbox" id="saleChk" :checked="isSaleOnly" @change="toggleSaleOnly">
                    <label class="checkbox" for="saleChk"></label>
                    <label for="saleChk">Sale Only</label>
                </div>
                <span class="count"><em>99</em> items</span>
            </div>
            <div class="prd-type">
                <button type="button" @click="openPopup('filterPopup')">Filter<i class="ico-filter"></i></button>
                <!-- 정렬 팝업 열기 버튼 -->
                <button type="button" @click="openPopup('sortPopup')">SORT<i class="ico-sort"></i></button>
            </div>
            <div class="filter-box" v-if="filterTags.length > 0">
                <swiper :observer="true" :observe-parents="true" :slides-per-view="'auto'" class="swiper filter-swiper">
                    <swiper-slide v-for="(tag, index) in filterTags" :key="index">
                        <span type="button" class="tag-type2">{{ tag }}
                            <button class="ico-close v2" @click="removeTag(index)">delete</button>
                        </span>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
    <SortPopupLayer ref="sortPopup" />
    <FilterPopupLayer ref="filterPopup"  :selectedItems="selectedItems" @selectItems="handleSelectedItems" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'; // SwiperSlide 추가
import 'swiper/css'; // Swiper의 기본 스타일 추가
import FilterPopupLayer from '../../components/Mo/Popup/FilterPopup.vue';
import SortPopupLayer from '../../components/Mo/Popup/SortPopup.vue';

// Sale Only 체크박스 상태를 관리하는 ref 변수
const isSaleOnly = ref(false);

// 상태를 토글하는 함수
const toggleSaleOnly = () => {
    isSaleOnly.value = !isSaleOnly.value;
};

const filterPopup = ref<InstanceType<typeof FilterPopupLayer> | null>(null);
const sortPopup = ref<InstanceType<typeof SortPopupLayer> | null>(null);

const openPopup = (popupName: string) => {
    if (popupName === 'filterPopup' && filterPopup.value) {
        filterPopup.value.openPopup();
    } else if (popupName === 'sortPopup' && sortPopup.value) {
        sortPopup.value?.openPopup();
    }
};

// 필터 태그와 선택된 항목들을 배열로 관리
const filterTags = ref<string[]>([]); // 선택된 필터 태그들
const selectedItems = ref<{ label: string; selected: boolean }[]>([]); // 선택된 항목 관리

// 태그 삭제 함수
const removeTag = (index: number) => {
    const removedTag = filterTags.value[index];
    filterTags.value.splice(index, 1); // 태그 배열에서 삭제

    // 선택된 항목 배열에서 해당 태그와 일치하는 항목 삭제
    selectedItems.value = selectedItems.value.filter(item => item.label !== removedTag);

    // 선택된 항목이 변경되었으므로, 팝업에 selectItems 이벤트를 emit하여 전달
   if (filterPopup.value) {
        filterPopup.value.updateSelectedItemsExternally(selectedItems.value); // 자식 컴포넌트의 함수를 호출
    }

};

// 선택된 항목을 처리하는 함수
const handleSelectedItems = (updatedSelectedItems: Array<{ label: string; selected: boolean }>) => {
    // 선택된 항목 배열과 필터 태그 업데이트
    selectedItems.value = updatedSelectedItems;
    filterTags.value = updatedSelectedItems.map(item => item.label); // 태그에 label만 추가

};

</script>
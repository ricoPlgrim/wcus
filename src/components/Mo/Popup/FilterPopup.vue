<template>
    <div :class="['pop-filter', { 'is-visible': isVisible, 'active': isActive, 'isSliderOpen': isSliderOpen }]"
        v-if="isVisible" id="pop-filter">
        <div class="pop-wrap">
            <div class="pop-title2">
                <button class="pop-close" @click="closePopup">
                    <i class="ico-close"></i><span class="hidden">닫기</span>
                </button>
                <div class="pop-action">
                    <h3 class="title-type">Filter</h3>
                    <button class="btn-clear-all" v-if="hasAnySelectedItems" @click="clearAllItems">Clear All</button>
                </div>
            </div>

            <div class="pop-tabs-wrapper">
                <div class="pop-tabs-container">
                    <div :class="['pop-tabs-slider', { 'isSliderOpen': isSliderOpen }]">
                        <div class="pop-tabs-titles">
                            <a v-for="(title, index) in titles" :key="index" href="javascript:;" class="pop-tabs-title"
                                @click="toggleTab(index)" :class="{ isOpen: openTabIndex === index }">
                                <h4>
                                    <span class="tabs-text">{{ title }}</span>
                                    <span class="count-value" v-if="getSelectedCount(title) > 0">{{
                                        getSelectedCount(title) }}</span>
                                    <i class="ico-arr2 right"></i>
                                </h4>
                            </a>
                        </div>
                        <div class="pop-tabs-menus">
                            <div class="pop-tabs-content">
                                <ul class="content-list">
                                    <li v-for="(title, index) in titles" :key="index"
                                        :class="{ isopen: openTabIndex === index }">
                                        <div class="content-header">
                                            <button class="pop-close" @click="closeTab">
                                                <i class="ico-arr"></i><span class="hidden">영역 팝업 닫기</span>
                                            </button>
                                            <h3>{{ title }}</h3>
                                            <button class="btn-clear" v-if="hasSelectedItems(title)"
                                                @click="clearItems(title)">Clear</button>
                                        </div>

                                        <!-- 카테고리 -->
                                        <CategoriesComponent v-if="title === 'Categories'" :categories="categories"
                                            :selectedItems="selectedItems"
                                            :updateSelectedItems="updateSelectedItems" />
                                        <!-- 브랜드 -->
                                        <BrandComponent v-if="title === 'Brand'" :brands="brandList" :selectedItems="selectedItems"
                                            :updateBrandItems="updateBrandItems" />

                                        <!-- 색상 -->
                                        <ColorComponent v-if="title === 'Color'" :colors="colors" :ResetImg="ResetImg"
                                            :clearItems="clearColorSelection" @update-color-items="updateColorItems"  :selectedItems="selectedItems" />

                                        <!-- Pattern Component -->
                                        <PatternComponent v-if="title === 'Pattern'" :patterns="patterns"
                                            @update-pattern-items="updatePatternItems" :clearItems="clearPatternSelection"
                                            :ResetImg="ResetImg" :selectedItems="selectedItems" />

                                        <!-- 사이즈 -->
                                        <SizeComponent v-if="title === 'Size'" :sizes="sizes"
                                            @update-size-items="updateSizeItems" :clearItems="clearSizeSelection" :selectedItems="selectedItems" />


                                        <!-- New Arrivals 컴포넌트 -->
                                        <NewArrivalsComponent v-if="title === 'New Arrivals'"
                                            :newArrivalsOptions="newArrivalsOptions" @select-option="selectOption" />

                                        <!-- 가격 -->
                                        <PriceComponent v-if="title === 'Price'" :min="sliderMin" :max="sliderMax"
                                            :priceOptions="localPriceOptions" :initialSliderValue="localSliderValue"
                                            @update-price="updatePrice" @update-price-option="updatePriceItems" :selectedItems="selectedItems" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pop-footer">
                <div class="category-area" v-if="selectedItems.length > 0">
                    <div class="category-tag">
                        <div class="category-scroll">
                            <ul class="category-list">
                                <li v-for="(item, index) in selectedItems" :key="index">
                                    {{ item.label }}
                                    <a href="javascript:;" class="btn_close" @click="removeSelectedItem(item)"></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <BtnType1Components
                    :buttons="[{ href: 'javascript:;', text: `${formattedCount} Applied`, classes: 'btn-type btn-full v3 filter' }]"
                    @click="closePopup" />
            </div>
        </div>

    </div>
</template>


<script setup lang="ts">
import { ref, defineExpose, computed, onMounted, watch, defineEmits, defineProps  } from 'vue';
import BtnType1Components from '../../Mo/Buttons/BtnType1.vue';
/* cricle  */
import ResetImg from '../../../assets/mo/images/icon/ico_reset.svg';
import ColorSilverImg from '../../../assets/mo/images/color/color-silver.png';
import ColorMetallicImg from '../../../assets/mo/images/color/color-metallic.png';
import ColorGoldImg from '../../../assets/mo/images/color/color-gold.png';
import ColorMultiImg from '../../../assets/mo/images/color/color-multi.png';

// 패턴 이미지 가져오기
import PatternSolidImg from '../../../assets/mo/images/icon/ico_solid.svg';
import PatternPatternImg from '../../../assets/mo/images/icon/ico_pattern.svg';
import PatternAnimalImg from '../../../assets/mo/images/icon/ico_animal.svg';
import PatternFloalImg from '../../../assets/mo/images/icon/ico_floal.svg';
import PatternDotsImg from '../../../assets/mo/images/icon/ico_dot.svg';
import PatternAbstractImg from '../../../assets/mo/images/icon/ico_abstract.svg';
import PatternStripeImg from '../../../assets/mo/images/icon/ico_stripe.svg';
import PatternCheckerImg from '../../../assets/mo/images/icon/ico_checker.svg';
import PatternGraphicImg from '../../../assets/mo/images/icon/ico_graphic.svg';

// 컴포넌트 분리
import CategoriesComponent from '../../Mo/Component/Filter/CategoriesComponent.vue'
import BrandComponent from '../../Mo/Component/Filter/BrandComponent.vue'
import { brandList as importedBrandList } from '../../../data/brandList';

import ColorComponent from '../../Mo/Component/Filter/ColorComponent.vue'
import PatternComponent from '../../Mo/Component/Filter/PatternComponent.vue'
import SizeComponent from '../../Mo/Component/Filter/CheckBoxComponent.vue'
import NewArrivalsComponent from '../../Mo/Component/Filter/RadioBoxComponent.vue'
import PriceComponent from '../../Mo/Component/Filter/PriceComponent.vue'






// props로 selectedItems를 부모 컴포넌트에서 전달받음
const props = defineProps({
    selectedItems: Array
});

// 내부적으로 selectedItems를 관리할 변수
const selectedItemsInternal = ref([...props.selectedItems || []]);

// props가 변경될 때 내부 상태도 동기화
watch(
  () => props.selectedItems,
  (newVal) => {
    selectedItemsInternal.value = [...(newVal || [])];
  }
);




//상품 숫자 
const appliedCount = ref(28117);

const formattedCount = computed(() => {
    return appliedCount.value.toLocaleString(); // 콤마 추가
});


// 브랜드 타입 정의
interface Brand {
    id: string;
    label: string;
    selected: boolean;  // 선택된 경우 true, 선택 해제된 경우 false
    isHeader: boolean;
}

const brandList = ref<Brand[]>([]);

//라디오버튼 타입 정의 
interface NewArrivalOption {
    label: string;
    selected: boolean;
}


// 팝업 상태 관리
const isVisible = ref(false); // 팝업의 가시성 상태를 관리하는 변수
const isActive = ref(false); // 팝업의 활성화 상태를 관리하는 변수
const isSliderOpen = ref(false); // 슬라이더의 열림 상태를 관리하는 변수
const openTabIndex = ref<number | null>(null); // 열려 있는 탭의 인덱스를 관리하는 변수


// 탭 제목을 하드코딩한 배열
const titles = [
    'Categories',
    'Brand',
    'Color',
    'Pattern',
    'Size',
    'New Arrivals',
    'Price',
];

// 색상 props
const colors = ref([
    // 컬러 데이터
    { name: 'red', active: false, backgroundColor: '#ff0000' },
    { name: 'blue', active: false, backgroundColor: '#0000ff' },
    { name: 'green', active: false, backgroundColor: '#00ff00' },
    { name: 'white', active: false, backgroundColor: '#ffffff' },
    { name: 'silver', active: false, backgroundImage: ColorSilverImg },
    { name: 'metallic', active: false, backgroundImage: ColorMetallicImg },
    { name: 'gold', active: false, backgroundImage: ColorGoldImg },
    { name: 'multi', active: false, backgroundImage: ColorMultiImg },
]);

// 패턴 props
const patterns = ref([
    { name: 'solid', active: false, backgroundImage: PatternSolidImg },
    { name: 'pattern', active: false, backgroundImage: PatternPatternImg },
    { name: 'animal', active: false, backgroundImage: PatternAnimalImg },

    { name: 'floal', active: false, backgroundImage: PatternFloalImg },
    { name: 'dot', active: false, backgroundImage: PatternDotsImg },
    { name: 'abstract', active: false, backgroundImage: PatternAbstractImg },

    { name: 'stripe', active: false, backgroundImage: PatternStripeImg },
    { name: 'checker', active: false, backgroundImage: PatternCheckerImg },
    { name: 'graphic', active: false, backgroundImage: PatternGraphicImg },
]);

//size 정의
const sizes = ref([
    { label: '4.5', selected: false, isDisabled: true },
    { label: '5', selected: false, isDisabled: false },
    { label: '5.5', selected: false, isDisabled: false },
    { label: '6', selected: false, isDisabled: false },
    { label: '6.5', selected: false, isDisabled: false },
    { label: '7', selected: false, isDisabled: false },
    { label: '7.5', selected: false, isDisabled: false },
    { label: '8', selected: false, isDisabled: false },
    { label: '8.5', selected: false, isDisabled: false },
    { label: '9', selected: false, isDisabled: false },
    { label: '9.5', selected: false, isDisabled: false },
    { label: '10', selected: false, isDisabled: false },
    { label: '10.5', selected: false, isDisabled: false },
    { label: '11', selected: false, isDisabled: false },
    { label: '11.5', selected: false, isDisabled: false },
    { label: '12', selected: false, isDisabled: false },
    { label: 'XXS', selected: false, isDisabled: true },
    { label: 'XS', selected: false, isDisabled: false },
    { label: 'S', selected: false, isDisabled: false },
    { label: 'M', selected: false, isDisabled: false },
    { label: 'L', selected: false, isDisabled: false },
    { label: 'XL', selected: false, isDisabled: true },
    { label: 'XXL', selected: false, isDisabled: true }
]);


const emit = defineEmits(['selectItems']); // 이벤트 선언

// 선택된 아이템을 관리하는 배열
const selectedItems = ref<{ label: string; selected: boolean }[]>([]);

// 카테고리 데이터 하드코딩
const categories = ref([
    {
        label: 'Jewelry', isOpen: true, selected: false, subCategories: [
            { label: 'All Jewelry', selected: false },
            { label: 'Earrings', selected: false },
            { label: 'Necklaces', selected: false }
        ]
    },
    { label: 'Accessories', isOpen: false, selected: false, subCategories: [] },
    {
        label: 'Jewelry', isOpen: false, selected: false, subCategories: [
            { label: 'simply', selected: false },
            { label: 'remaining', selected: false },
            { label: 'PageMaker', selected: false }
        ]
    },
]);


// 선택된 항목에서 특정 항목 제거
const removeSelectedItem = (selectedItem: { label: string, selected: boolean }) => {

    // 선택된 항목에서 해당 항목을 제거
    selectedItems.value = selectedItems.value.filter(item => item.label !== selectedItem.label);

    // 해당 항목이 속한 카테고리에서 선택된 상태를 false로 초기화
    categories.value.forEach((category) => {
        category.subCategories.forEach((subCategory) => {
            if (subCategory.label === selectedItem.label) {
                subCategory.selected = false;
            }
        });
    });

    // 브랜드 선택 상태 초기화
    const brandIndex = brandList.value.findIndex(brand => brand.label === selectedItem.label);
    if (brandIndex !== -1) {
        brandList.value[brandIndex].selected = false;
    }


    // 색상 선택 상태 초기화
    const colorIndex = colors.value.findIndex(color => color.name === selectedItem.label);
    if (colorIndex !== -1) {
        colors.value[colorIndex].active = false; // 색상 선택 해제
    }

    // 패턴 선택 상태 초기화
    const patternIndex = patterns.value.findIndex(pattern => pattern.name === selectedItem.label);
    if (patternIndex !== -1) {
        patterns.value[patternIndex].active = false; // 패턴 선택 해제
    }

    // 사이즈 선택 상태 초기화
    const sizeIndex = sizes.value.findIndex(size => size.label === selectedItem.label);
    if (sizeIndex !== -1) {
        sizes.value[sizeIndex].selected = false;
    }

    // 가격 선택 상태 초기화
    if (selectedItem.label.startsWith('$')) {
        // 슬라이더 값 초기화 (기본값으로 설정)
        localSliderValue.value = [sliderMin, sliderMax];

        // 모든 가격 옵션 선택 해제
        localPriceOptions.value.forEach(option => {
            option.selected = false;
        });
    }


     // 선택 항목을 외부 컴포넌트와 동기화
     updateSelectedItemsExternally(selectedItems.value);


};


// 각 필터에서 선택된 항목들을 초기화 (Clear 버튼 클릭 시)
const clearItems = (title: string) => {
    if (title === 'Categories') {
        // 카테고리와 서브카테고리의 선택 상태 초기화
        categories.value.forEach(category => {
            category.selected = false;
            category.subCategories.forEach(subCategory => {
                subCategory.selected = false;
            });
        });
    } else if (title === 'Brand') {
        // 브랜드 선택 상태 초기화
        brandList.value.forEach(brand => {
            brand.selected = false;
        });
    } else if (title === 'Color') {
        // 모든 색상 선택 상태 초기화
        colors.value.forEach(color => {
            color.active = false;
        });
    } else if (title === 'Pattern') {
        // 모든 패턴 선택 상태 초기화
        patterns.value.forEach(pattern => {
            pattern.active = false;
        });
    } else if (title === 'Size') {
        // 모든 사이즈 선택 상태 초기화
        sizes.value.forEach(size => {
            size.selected = false;
        });
    } else if (title === 'New Arrivals') {
        // 모든 New Arrivals 옵션 초기화
        newArrivalsOptions.value.forEach(option => {
            option.selected = false;
        });
    } else if (title === 'Price') {
        localSliderValue.value = [sliderMin, sliderMax]; // 슬라이더를 기본값으로 초기화
        localPriceOptions.value.forEach(option => {
            option.selected = false; // 모든 가격 옵션 선택 해제
        });
    }

    // 선택된 항목 리스트에서 해당 항목 제거
    selectedItems.value = selectedItems.value.filter(item => {
        if (title === 'Categories') {
            return !categories.value.some(category => category.label === item.label || category.subCategories.some(sub => sub.label === item.label));
        } else if (title === 'Brand') {
            // 브랜드가 선택된 항목에 있는지 확인
            return !brandList.value.some(brand => brand.label === item.label);
        }

        else if (title === 'Color') {
            return !colors.value.some(color => color.name === item.label);
        } else if (title === 'Pattern') {
            return !patterns.value.some(pattern => pattern.name === item.label);
        } else if (title === 'Size') {
            return !sizes.value.some(size => size.label === item.label);
        } else if (title === 'New Arrivals') {
            return !newArrivalsOptions.value.some(option => option.label === item.label);
        } else if (title === 'Price') {
            // 가격 항목에 해당하는 것을 제거
            return !item.label.startsWith('$');
        }
        return true;
    });
};

// 각 섹션에서 선택된 항목의 수를 계산
const getSelectedCount = (title: string) => {
    if (title === 'Categories') {
        // 카테고리와 서브카테고리에서 선택된 항목의 수를 계산
        let count = 0;
        categories.value.forEach(category => {
            if (category.selected) count++;
            category.subCategories.forEach(subCategory => {
                if (subCategory.selected) count++;
            });
        });
        return count;
    } else if (title === 'Brand') {
        // 선택된 브랜드 수 계산
        return brandList.value.filter(brand => brand.selected).length;
    } else if (title === 'Color') {
        // 선택된 색상 수 계산
        return colors.value.filter(color => color.active).length;
    } else if (title === 'Pattern') {
        // 선택된 패턴 수 계산
        return patterns.value.filter(pattern => pattern.active).length;
    } else if (title === 'Size') {
        // 선택된 사이즈 수 계산
        return sizes.value.filter(size => size.selected).length;
    } else if (title === 'New Arrivals') {
        // 선택된 New Arrivals 옵션 수 계산
        return newArrivalsOptions.value.filter(option => option.selected).length;
    } else if (title === 'Price') {
        // 가격 슬라이더가 기본값과 다른 경우 1로 계산
        if (localSliderValue.value[0] !== sliderMin || localSliderValue.value[1] !== sliderMax) {
            return 1;
        }
        return 0;
    }
    return 0;
};

// 모든 필터를 초기화 (Clear All 버튼 클릭 시)
const clearAllItems = () => {
    // 모든 카테고리 선택 상태 초기화
    categories.value.forEach(category => {
        category.selected = false;
        category.subCategories.forEach(subCategory => {
            subCategory.selected = false;
        });
    });

    // 모든 브랜드 선택 상태 초기화
    brandList.value.forEach(brand => {
        brand.selected = false;
    });

    // 모든 색상 선택 상태 초기화
    colors.value.forEach(color => {
        color.active = false;
    });

    // 모든 패턴 선택 상태 초기화
    patterns.value.forEach(pattern => {
        pattern.active = false;
    });

    // 모든 사이즈 선택 상태 초기화
    sizes.value.forEach(size => {
        size.selected = false;
    });

    // 모든 New Arrivals 옵션 초기화
    newArrivalsOptions.value.forEach(option => {
        option.selected = false;
    });

    // 가격 슬라이더 초기화
    localSliderValue.value = [sliderMin, sliderMax]; // 슬라이더를 기본값으로 초기화
    localPriceOptions.value.forEach(option => {
        option.selected = false; // 모든 가격 옵션 선택 해제
    });

    // 선택된 항목 리스트 초기화
    selectedItems.value = [];
};

// 선택된 항목이 하나라도 있는지 확인하여 Clear All 버튼을 렌더링할지 결정
const hasAnySelectedItems = computed(() => {
    // 선택된 항목이 있는지 확인
    return (
        categories.value.some(category => category.selected || category.subCategories.some(subCategory => subCategory.selected)) ||
        brandList.value.some(brand => brand.selected) ||
        colors.value.some(color => color.active) ||
        patterns.value.some(pattern => pattern.active) ||
        sizes.value.some(size => size.selected) ||
        newArrivalsOptions.value.some(option => option.selected) ||
        (localSliderValue.value[0] !== sliderMin || localSliderValue.value[1] !== sliderMax)
    );
});


// Brand 업데이트 전용 함수
const updateBrandItems = (category: string, brandLabel: string, brandIndex: number) => {
    // 선택된 브랜드를 찾음
    const selectedBrand = brandList.value.find(brand => brand.label === brandList.value[brandIndex].label);

    if (selectedBrand) {
        // 선택된 항목 관리
        const existingItemIndex = selectedItems.value.findIndex(item => item.label === selectedBrand.label);

        if (existingItemIndex === -1) {
            // 항목이 없다면 추가
            selectedItems.value.push({ label: selectedBrand.label, selected: true });
            selectedBrand.selected = true;  // 브랜드 선택 상태 업데이트
        } else {
            // 항목이 이미 있으면 제거
            selectedItems.value.splice(existingItemIndex, 1);
            selectedBrand.selected = false;  // 브랜드 선택 상태 업데이트
        }
          // 업데이트된 항목을 emit으로 부모 컴포넌트로 전달
        emit('selectItems', selectedItems.value);
        console.log("Selected Items (Brand):", selectedItems.value);
    } else {
        console.error('Brand not found in brandList for label:', brandList.value[brandIndex].label);
    }
};

// 선택된 항목을 업데이트 (체크박스 및 버튼 클릭 시) 
const updateSelectedItems = (category: string, mainIndex: number, subIndex: number | null = null) => {
    let label = '';

    if (category === 'Categories') {

        if (subIndex !== null) {
            // 카테고리 및 서브카테고리 선택/해제 로직
            const selectedSubCategory = categories.value[mainIndex]?.subCategories[subIndex];
            if (selectedSubCategory) {
                selectedSubCategory.selected = !selectedSubCategory.selected;
                label = selectedSubCategory.label;
            }
        } else {
            const selectedCategory = categories.value[mainIndex];
            if (selectedCategory) {
                selectedCategory.selected = !selectedCategory.selected;
                label = selectedCategory.label;
            }
        }
        // console.log("Selected Items (Color):", selectedItems.value);
    }
    // 선택된 항목 리스트 업데이트
    const existingItemIndex = selectedItems.value.findIndex(item => item.label === label);
    if (existingItemIndex > -1) {
        selectedItems.value.splice(existingItemIndex, 1); // 이미 선택된 항목이 있으면 제거
    } else if (label) {
        selectedItems.value.push({ label, selected: true }); // 새로운 항목 추가
    }

    // 업데이트된 항목을 emit으로 부모 컴포넌트로 전달
    emit('selectItems', selectedItems.value);
};

//컬러
const updateColorItems = (category: string, colorIndex: number) => {
    // Color 배열에서 색상을 가져옴
    const selectedColor = colors.value[colorIndex];

    // 선택된 색상이 존재하는지 확인
    if (selectedColor) {
        // 색상이 이미 선택된 항목에 있는지 확인
        const existingItemIndex = selectedItems.value.findIndex(item => item.label === selectedColor.name);

        if (existingItemIndex === -1) {
            // 선택되지 않은 경우 추가
            selectedItems.value.push({ label: selectedColor.name, selected: true });
            selectedColor.active = true; // 상태 업데이트
        } else {
            // 선택된 경우 제거
            selectedItems.value.splice(existingItemIndex, 1);
            selectedColor.active = false; // 상태 업데이트
        }
    } else {
        // 업데이트된 항목을 emit으로 부모 컴포넌트로 전달
        emit('selectItems', selectedItems.value);
        console.error('Selected color not found:', colorIndex);
    }
};


//컬러설정 초기화
const clearColorSelection = () => {
    colors.value.forEach(color => {
        color.active = false;
    });

    selectedItems.value = selectedItems.value.filter(item => {
        return !colors.value.some(color => color.name === item.label);
    });

};

//패턴설정 초기화
const clearPatternSelection = () => {
    patterns.value.forEach(pattern => {
        pattern.active = false;
    });

    selectedItems.value = selectedItems.value.filter(item => {
        return !patterns.value.some(pattern => pattern.name === item.label);
    });

};

//패턴
const updatePatternItems = (category: string, patternIndex: number, patternName: string) => {
    // Color 배열에서 색상을 가져옴
    const selectedPattern = patterns.value[patternIndex];

    // 선택된 색상이 존재하는지 확인
    if (selectedPattern) {

        // 색상이 이미 선택된 항목에 있는지 확인
        const existingItemIndex = selectedItems.value.findIndex(item => item.label === patternName);

        if (existingItemIndex === -1) {
            // 선택되지 않은 경우 추가
            selectedItems.value.push({ label: patternName, selected: true });
            selectedPattern.active = true; // 상태 업데이트
        } else {
            // 선택된 경우 제거
            selectedItems.value.splice(existingItemIndex, 1);
            selectedPattern.active = false; // 상태 업데이트
        }
        // 업데이트된 항목을 emit으로 부모 컴포넌트로 전달
        emit('selectItems', selectedItems.value);
        // console.log("Selected Items (Pattern):", selectedItems.value);
    } else {
        console.error('Selected pattern not found:', patternIndex);
    }
};

// 사이즈 선택 처리 함수
const updateSizeItems = (sizeIndex: number) => {
    const selectedSize = sizes.value[sizeIndex];
    selectedSize.selected = !selectedSize.selected;

    // 선택된 아이템 리스트 업데이트
    const existingItemIndex = selectedItems.value.findIndex(item => item.label === selectedSize.label);
    if (existingItemIndex === -1) {
        selectedItems.value.push({ label: selectedSize.label, selected: true });
    } else {
        selectedItems.value.splice(existingItemIndex, 1);
    }

    // 업데이트된 항목을 emit으로 부모 컴포넌트로 전달
    emit('selectItems', selectedItems.value);


    // console.log("Selected Items (Size):", selectedItems.value);
};

// 사이즈 선택 초기화
const clearSizeSelection = () => {
    sizes.value.forEach(size => {
        size.selected = false;
    });
    selectedItems.value = selectedItems.value.filter(item => !sizes.value.some(size => size.label === item.label));
};

// 스크롤 관련 기능 및 브랜드 필터링
const hasSelectedItems = (title: string) => {
    if (title === 'Categories') {
        // 카테고리 또는 서브카테고리에서 선택된 항목이 있는지 확인
        return categories.value.some(category => category.selected || category.subCategories.some(subCategory => subCategory.selected));
    } else if (title === 'Brand') {
        // 브랜드에서 선택된 항목이 있는지 확인
        return brandList.value.some(brand => brand.selected);
    } else if (title === 'Color') {
        // 색상에서 선택된 항목이 있는지 확인
        return colors.value.some(color => color.active);
    } else if (title === 'Pattern') {
        // 패턴에서 선택된 항목이 있는지 확인
        return patterns.value.some(pattern => pattern.active);
    } else if (title === 'Size') {
        // 사이즈에서 선택된 항목이 있는지 확인
        return sizes.value.some(size => size.selected);
    } else if (title === 'New Arrivals') {
        // New Arrivals에서 선택된 항목이 있는지 확인
        return newArrivalsOptions.value.some(option => option.selected);
    } else if (title === 'Price') {
        return localSliderValue.value[0] !== sliderMin || localSliderValue.value[1] !== sliderMax;
    }
    return false;
};


// 새로운 상품 옵션
const newArrivalsOptions = ref<NewArrivalOption[]>([
    { label: '1 day', selected: false },
    { label: '7 days', selected: false },
    { label: '30 days', selected: false },
]);

// 새로운 상품 옵션 선택
const selectOption = (selectedOption: NewArrivalOption) => {
    // Loop through all options and unselect them
    newArrivalsOptions.value.forEach(option => {
        option.selected = false;
    });
    // Set the selected option to true
    selectedOption.selected = true;
};

// 슬라이더와 가격 옵션 관련 데이터
const sliderMin = 0;
const sliderMax = 100;

// 슬라이더의 초기 값과 가격 옵션을 하드코딩으로 정의
const localSliderValue = ref<[number, number]>([sliderMin, sliderMax]);

// PriceOption 인터페이스 타입 정의
interface PriceOption {
    label: string;
    selected: boolean;
    range: [number, number];  // range는 정확히 두 개의 숫자로 된 튜플
}


// Hardcoded price options
const localPriceOptions = ref<PriceOption[]>([
    { label: '$0 - $50', selected: false, range: [0, 50] },
    { label: '$50 - $75', selected: false, range: [50, 75] },
    { label: '$75 - $100', selected: false, range: [75, 100] }
]);



// 가격 범위 업데이트 함수
const updatePrice = (value: [number, number]) => {
    localSliderValue.value = value;
    // 슬라이더 값으로 레이블 생성
    const label = `$${value[0]} - $${value[1]}`;

    // 선택된 항목 리스트에서 기존 항목을 업데이트하거나 추가
    const existingItemIndex = selectedItems.value.findIndex(item => item.label.startsWith('$'));

    // 기본 min과 max 값인지 확인
    if (value[0] === sliderMin && value[1] === sliderMax) {
        console.log("기본 min과 max 값이 선택되었습니다.");
        // 기본 범위일 경우, 기존에 선택된 가격 관련 항목을 모두 제거
        selectedItems.value = selectedItems.value.filter(item => !item.label.startsWith('$'));
    } else {
        console.log("기본값이 아닌 범위가 선택되었습니다:", label);

        if (existingItemIndex !== -1) {
            // 기존 항목이 있으면 업데이트
            selectedItems.value[existingItemIndex].label = label;
            console.log("가격 범위가 업데이트되었습니다:", label);
        } else {
            // 기존 항목이 없으면 새로운 항목 추가
            selectedItems.value.push({ label, selected: true });
            console.log("새로운 가격 범위가 추가되었습니다:", label);
        }
    }

      // 업데이트된 항목을 emit으로 부모 컴포넌트로 전달
      emit('selectItems', selectedItems.value);
};

//가격 범위 
const updatePriceItems = (priceIndex: number, range: [number, number]) => {
    const selectedOption = localPriceOptions.value[priceIndex];
    const label = selectedOption.label;

    // 현재 선택된 가격 항목이 이미 있는지 확인
    const existingItemIndex = selectedItems.value.findIndex(item => item.label === label);

    if (existingItemIndex !== -1) {
        localSliderValue.value = [sliderMin, sliderMax]; // 슬라이더를 기본값으로 초기화
        selectedItems.value = selectedItems.value.filter(item => item.label !== label); // 선택된 항목에서 해당 가격 항목 제거
        selectedOption.selected = false; // 선택 상태 해제
    } else {
        // 새로운 가격 옵션이 선택된 경우: 기존 가격 항목 제거 후 새로운 항목 추가
        selectedItems.value = selectedItems.value.filter(item => !item.label.startsWith('$')); // 기존 가격 항목 제거
        selectedItems.value.push({ label, selected: true }); // 새로운 가격 항목 추가

        // 클릭된 인덱스의 가격 옵션을 선택 상태로 업데이트
        localPriceOptions.value.forEach((option, index) => {
            option.selected = index === priceIndex;
        });

        // 슬라이더 값도 클릭된 가격 옵션의 range로 업데이트
        localSliderValue.value = [...range];

    }

};

const updateSelectedItemsExternally = (updatedSelectedItems: Array<{ label: string; selected: boolean }>) => {
    selectedItems.value = [...updatedSelectedItems];
    console.log('업데이트====>:', selectedItems.value);
};




// 팝업 열기
const openPopup = () => {
    isVisible.value = true;
    setTimeout(() => {
        isActive.value = true;
    }, 300);
};

// 팝업 닫기
const closePopup = () => {
    isActive.value = false;
    emit('selectItems', selectedItems.value);
    setTimeout(() => {
        isVisible.value = false;
    }, 300);
};

// 탭 열고 닫기 토글
const toggleTab = (index: number) => {
    if (openTabIndex.value === index) {
        openTabIndex.value = null;
        isSliderOpen.value = false;
    } else {
        openTabIndex.value = index;
        isSliderOpen.value = true;
    }
};


//팝업 내 영역 팝업 닫기
const closeTab = () => {
    openTabIndex.value = null; // 열려있는 탭의 인덱스를 null로 설정하여 탭을 닫음
    isSliderOpen.value = false; // 슬라이더의 열림 상태를 false로 설정하여 슬라이더를 닫음
};


onMounted(() => {
    // 브랜드 리스트를 설정하는 부분
    brandList.value = importedBrandList.map(brand => ({
        // 브랜드 객체의 기존 속성을 모두 복사하고, selected 속성을 추가 또는 업데이트
        ...brand,
        selected: brand.selected ?? false, // selected 속성이 없으면 false로 설정
    }));
});

watch(isVisible, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});


defineExpose({ openPopup, closePopup, updateSelectedItemsExternally  });

</script>

<style lang="scss" scoped>
.btn-wrap {
    margin-top: 0;
}
</style>

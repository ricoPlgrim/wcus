<template>
    <div class="fixed-bottom">
        <!-- 장바구니 버튼 (s) -->
        <div v-if="!props.isOutOfStock && !props.isUnavailable" class="btn-type3 v3">
            <button type="button" :class="['btn-wish', { active: isActive }]" @click="addToWishList">
                <i class="ico-like v2"></i>
                <span class="hidden">wish</span>
            </button>
            <button type="button" @click="addToCart">ADD TO CART</button>
        </div>
        <!-- //장바구니 버튼 (e) -->

        <!-- 옵션 품절 버튼 (s) -->
        <div v-if="props.isOutOfStock" class="btn-type3 v3">
            <button type="button" class="btn-wish" @click="addToWishList">
                <i class="ico-like v2"></i>
                <span class="hidden">wish</span>
            </button>
            <button type="button" class="v2">
                OUT OF STOCK
                <p>Restock Notification</p>
            </button>
        </div>
        <!-- //옵션 품절 버튼 (e) -->

        <!-- 판매 불가 버튼 (s) -->
        <div v-if="props.isUnavailable" class="btn-type3 disabled">
            <button type="button" class="btn-wish" @click="addToWishList">
                <i class="ico-like v2"></i>
                <span class="hidden">wish</span>
            </button>
            <button type="button" disabled>CURRENTLY UNAVAILABLE</button>
        </div>
        <!-- //판매 불가 버튼 (e) -->
    </div>
    <!--옵션 팝업-->
    <CartOptionPopupLayer ref="optionPopup" @openSizePopup="handleOpenSizePopup" @openRestockPopup="handleRestockPopup" />
    <!--사이즈 팝업-->
    <SizeGuidePopupLayer ref="sizeGidePopup" :tabs="sizeGuideData.tabs" :tabContents="sizeGuideData.contents"
        :actualSize="sizeGuideData.actualSizeInfo" :noteText="sizeGuideData.noteText" />

    <!--재입고 알람 팝업-->
    <RestockPopupLayer ref="restockPopup" @open-popup="handleOpenPopup" />
    <!-- <RestockPopupLayer ref="restockPopup" @open-popup="handleOpenPopup" /> -->
    <!--옵션  선택 팝업 -->
    <OptionBindPopupLayer ref="optionBindPopup" :options="currentOptions" :title="currentTitle"
        :defaultOption="currentDefaultOption" @update:selectedOption="handleOptionSelected" />
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

//옵션 팝업
import CartOptionPopupLayer from "../../../components/Mo/Popup/CartOptionPopup.vue";
//사이즈 가이드 팝업
import SizeGuidePopupLayer from "../../../components/Mo/Popup/SizeGuidePopup.vue";
//재입고 알림 팝업
import RestockPopupLayer from "../../../components/Mo/Popup/RestockPopup.vue";
//옵션 바인딩 팝업
import OptionBindPopupLayer from "../../../components/Mo/Popup/OptionBindPopup.vue";



// Props 정의 (부모 컴포넌트에서 받는 속성)
const props = defineProps({
    isOutOfStock: {        // 품절 여부
        type: Boolean,
        default: false
    },
    isUnavailable: {       // 판매 불가 여부
        type: Boolean,
        default: false
    },
    initialIsActive: {     // 초기 활성 상태
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:isActive']); // 부모 컴포넌트로 상태 업데이트 이벤트

// 상태 변수 정의
const isActive = ref(props.initialIsActive); // 초기값으로 props를 사용

// 함수 정의
const addToWishList = () => {
    isActive.value = !isActive.value; // 활성 상태를 토글
    emit('update:isActive', isActive.value); // 부모 컴포넌트에 상태 변경 알림
};


//사이즈 가이드 팝업 
const sizeGidePopup = ref<InstanceType<typeof SizeGuidePopupLayer> | null>(null);
const sizeGuideData = ref({
    tabs: [
        { title: "Women's Clothing", id: 'womenClothing', active: true },
        { title: "Women's Shoes", id: 'womenShoes', active: false },
        { title: "Men's Clothing", id: 'menClothing', active: false },
        { title: "Men's Shoes", id: 'menShoes', active: false },
        { title: "Ring Sizing", id: 'ringSizing', active: true }
    ],
    contents: [
        {
            id: 'womenClothing',
            caption: "Women's Clothing",
            headers: ['Size', 'Denim', 'US', 'UK', 'US', 'UK'],
            rows: [
                ['XS', '24', '0', '4', '0', '4'],
                ['S', '25', '2', '6', '0', '4'],
                ['M', '27', '4', '8', '0', '4'],
                ['L', '28', '6', '10', '0', '4']
            ]
        },
        {
            id: 'womenShoes',
            caption: "Women's Shoes",
            headers: ['Size', 'Denim', 'US', 'UK'],
            rows: [
                ['34', '2', '5'],
                ['S', '35', '3', '7'],
                ['M', '37', '4', '8']
            ]
        },
        {
            id: 'menClothing',
            caption: "Men’s Clothing",
            headers: ['Size', 'Denim', 'US', 'UK'],
            rows: [
                ['XS', '34', '2', '5'],
                ['S', '35', '3', '7'],
                ['M', '37', '4', '8']
            ]
        },
        {
            id: 'menShoes',
            caption: "Men’s Shoes",
            headers: ['Size', 'Denim', 'US', 'UK'],
            rows: [
                ['XS', '34', '2', '5'],
                ['S', '35', '3', '7'],
                ['M', '37', '4', '8']
            ]
        },
        {
            id: 'ringSizing',
            caption: "Men’s Shoes",
            headers: ['Size', 'Denim'],
            rows: [
                ['XS', '34'],
                ['S', '35'],
                ['M', '37']
            ]
        },
    ],
    actualSizeInfo: `
        Size: M / L / XL<br>
        - Waist: 15.15 in. / 16.14 in. / 17.12 in.<br>
        - Hip: 21.06 in. / 21.65 in. / 23.03 in.<br>
        - Thigh: 14.76 in. / 15.15 in. / 15.55 in.<br>
        - Front rise: 13.38 in. / 13.77 in. / 14.17 in.<br>
        - Total length: 40.55 in. / 41.33 in. / 42.51 in.<br>
    `,
    noteText: `
        This size chart is a general guide to compare various size conversions. As the size and cut are 
        different for each brand, please refer to the Measurements section of the DETAILS and the brand’s 
        specific size chart located at the bottom of ‘From the brand’ section for accurate size conversions.
    `
});

// 사이즈 팝업 열기
const handleOpenSizePopup = () => {
    if (sizeGidePopup.value) {
        sizeGidePopup.value.openPopup();
    }
};

// 재입고 알림 팝업 관리
const restockPopup = ref<InstanceType<typeof RestockPopupLayer> | null>(null);

// 재입고 팝업 열기
const handleRestockPopup = () => {
    if (restockPopup.value) {
        restockPopup.value.openPopup();
    }
}

// 옵션 팝업 관리
const optionPopup = ref<InstanceType<typeof CartOptionPopupLayer> | null>(null);

    // 장바구니에 추가하는 함수
const addToCart = () => {
    if (optionPopup.value) {
        optionPopup.value.openPopup();
    }
};

// 옵션 바인딩 팝업 관리
const optionBindPopup = ref<InstanceType<typeof OptionBindPopupLayer> | null>(null);


// 상태 관리 변수 (현재 옵션, 제목, 기본 옵션, 팝업 타입)
const currentOptions = ref<Record<string, string>>({});
const currentTitle = ref<string>('Select Option');
const currentDefaultOption = ref<string>('');
const currentPopupType = ref('');

// 팝업 열기 함수
const handleOpenPopup = (popupType: string) => {
    currentPopupType.value = popupType; // 팝업 타입 설정

    if (popupType === 'option1') {
        currentOptions.value = { optionA: 'Option A', optionB: 'Option B', optionC: 'Option C' };
        currentTitle.value = 'Choose Option';
        currentDefaultOption.value = 'optionA';
    } else if (popupType === 'option2') {
        currentOptions.value = { sizeS: 'Size S', sizeM: 'Size M', sizeL: 'Size L' };
        currentTitle.value = 'Choose Size';
        currentDefaultOption.value = 'sizeM';
    } else if (popupType === 'option3') {
        currentOptions.value = { Red: 'Red', Blue: 'Blue', Green: 'Green' };
        currentTitle.value = 'Choose Color';
        currentDefaultOption.value = 'colorRed';
    }

    if (optionBindPopup.value) {
        optionBindPopup.value.openPopup(); // 옵션 팝업 열기
    }
};

// 옵션 선택 시 처리 함수
const handleOptionSelected = (selectedOption: string) => {
    if (restockPopup.value) {
        restockPopup.value.updateOptionLabel(currentPopupType.value, selectedOption);
    }
};


</script>

<template>
    <section>
        <div class="product-wrap">
            <!-- 타이틀, 카운트, 링크를 포함한 TitleWrap 컴포넌트 -->
            <TitleWrap :title="title" linkHref="#" linkText="View More" />
            <!-- 메뉴 스와이퍼 컴포넌트, useMenuSwiper가 true일 때만 렌더링 -->
            <menuSwiperComponent v-if="useMenuSwiper" ref="menuSwiper" type="v1" :menus="menus"
                @menuClick="handleMenuClick" />
            <!-- 각 탭에 해당하는 제품 스와이퍼 컴포넌트를 렌더링 -->
            <ProductSwiper v-for="(tab, index) in displayedTabs" :key="index" :tab="tab" :isActive="activeTab === index" />
        </div>
    </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import TitleWrap from '../Main/Component/TitleBox.vue';
import menuSwiperComponent from '../../../../components/Mo/Swiper/MenuIndex.vue';
import ProductSwiper from '../Main/Component/ProductSwiper.vue';
import DemoImg2 from '../../../../assets/mo/images/temp/@temp_brand2.png';
import DemoImg3 from '../../../../assets/mo/images/temp/@temp_brand4.png';
import prdImg from '../../../../assets/mo/images/temp/@temp_prd_image2.png';

// props 정의: 제목(title)과 메뉴 스와이퍼 사용 여부(useMenuSwiper)를 부모로부터 받음
const props = defineProps<{
    title: string;
    useMenuSwiper: boolean;
}>();

// 메뉴 목록 정의
const menus = ['CLOTHING', 'SHOES', 'BAGS', 'ACCESSORIES'];

// 전체 탭 데이터 정의
const allTabs = ref([
    {
        id: 'CLOTHING',
        name: 'CLOTHING',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' }
        ],
    },
    {
        id: 'SHOES',
        name: 'SHOES',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
        ],
    },
    {
        id: 'BAGS',
        name: 'BAGS',
        items: [
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },

        ],
    },
    {
        id: 'ACCESSORIES',
        name: 'ACCESSORIES',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
        ],
    },
]);

// 제한된 탭 데이터 정의
const limitedTabs = ref([
    {
        id: 'LIMITED',
        name: 'LIMITED',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Limited Edition Shirt', price: '$199.00', sale: '15%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Limited Edition Dress', price: '$189.00', sale: '10%' },
            { imgSrc: prdImg, alt: 'image', title: 'Limited Edition Shirt', price: '$199.00', sale: '15%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Limited Edition Dress', price: '$189.00', sale: '10%' },
            { imgSrc: prdImg, alt: 'image', title: 'Limited Edition Shirt', price: '$199.00', sale: '15%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Limited Edition Dress', price: '$189.00', sale: '10%' },
        ],
    }
]);

// 현재 활성화된 탭 인덱스를 관리하는 변수
const activeTab = ref(0);

// 탭 버튼 클릭 시 호출되는 함수로, 활성화된 탭 인덱스를 업데이트함
const handleMenuClick = (index: number) => {
    activeTab.value = index;
};

// useMenuSwiper 값에 따라 표시할 탭 데이터를 결정하는 계산된 속성
const displayedTabs = computed(() => {
    return props.useMenuSwiper ? allTabs.value : limitedTabs.value;
});


</script>
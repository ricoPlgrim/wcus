<template>
    <section>
        <div class="brand-wrap2">
            <!-- 제목과 'View More' 링크를 포함하는 TitleWrap 컴포넌트 -->
            <TitleWrap title="Brands" linkHref="#" linkText="View More" />
            <!-- 탭 메뉴를 위한 스와이퍼 영역 -->
            <div class="tab-menu-swiper swiper">
                <!-- 메뉴 스와이퍼 컴포넌트 -->
                <menuSwiperComponent ref="menuSwiper" type="v4" :menus="menus" @menuClick="handleMenuClick" />
            </div>
            <!-- 탭에 쓰이는 스와이퍼 템플릿 -->
            <TabListSwiper ref="tabListSwiper" :tabSlides="tabSlides" @slideChange="handleSlideChange" />
            <!-- 각 탭의 콘텐츠를 렌더링 -->
            <TabContent v-for="(tab, index) in tabs" :key="index" :tab="tab" :isActive="activeTab === index" />
        </div>
    </section>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import TitleWrap from '../Main/Component/TitleBox.vue';
import menuSwiperComponent from '../../../../components/Mo/Swiper/MenuIndex.vue';
import TabListSwiper from '../../../../components/Mo/Swiper/TabListSwiper.vue';
import TabContent from '../Main/Component/TabContent.vue'
import DemoImg from '../../../../assets/mo/images/temp/@temp_brand3.png';
import DemoImg2 from '../../../../assets/mo/images/temp/@temp_brand2.png';
import DemoImg3 from '../../../../assets/mo/images/temp/@temp_brand4.png';
import prdImg from '../../../../assets/mo/images/temp/@temp_prd_image2.png';

import 'swiper/css';

// 메뉴 항목 정의
const menus = ['LOOKAST', 'ABONNE', 'KIRSHBLENDING', 'VUNSCH', 'VUNSCH2', 'VUNSCH3'];

// 탭 슬라이드 데이터 정의
const tabSlides = ref([
    { imgSrc: DemoImg, alt: 'LOOKAST', text: 'LOOKAST REIMAGINED<br>LIVING IT ITEM' },
    { imgSrc: DemoImg2, alt: 'LOOKAST', text: 'LOOKAST REIMAGINED<br>LIVING IT ITEM' },
    { imgSrc: DemoImg3, alt: 'LOOKAST', text: 'LOOKAST REIMAGINED<br>LIVING IT ITEM' },
    { imgSrc: DemoImg, alt: 'LOOKAST', text: 'LOOKAST REIMAGINED<br>LIVING IT ITEM' },
    { imgSrc: DemoImg, alt: 'LOOKAST', text: 'LOOKAST REIMAGINED<br>LIVING IT ITEM' },
    { imgSrc: DemoImg, alt: 'LOOKAST', text: 'LOOKAST REIMAGINED<br>LIVING IT ITEM' },
]);


// 스와이퍼 컴포넌트에 대한 참조
const menuSwiper = ref<InstanceType<typeof menuSwiperComponent> | null>(null);
const tabListSwiper = ref<InstanceType<typeof TabListSwiper> | null>(null);

// 슬라이드 변경 시 호출되는 함수
const handleSlideChange = (index: number) => {
    if (menuSwiper.value) {
        menuSwiper.value.onMenuClick('v4', index);
    }
    activeTab.value = index;
};

// 메뉴 클릭 시 호출되는 함수
const handleMenuClick = (index: number) => {
    if (tabListSwiper.value) {
        tabListSwiper.value.slideTo(index);
    }
    activeTab.value = index;
};

// 탭 콘텐츠 데이터를 정의
const tabs = ref([
    {
        id: 'LOOKAST',
        name: 'LOOKAST',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' }
            // 추가 제품 항목
        ],
        shopLink: '#'
    },
    {
        id: 'ABONNE',
        name: 'ABONNE',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            // 추가 제품 항목
        ],
        shopLink: '#'
    },
    {
        id: 'KIRSHBLENDING',
        name: 'KIRSHBLENDING',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            // 추가 제품 항목
        ],
        shopLink: '#'
    },
    {
        id: 'VUNSCH',
        name: 'VUNSCH',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            // 추가 제품 항목
        ],
        shopLink: '#'
    },
    {
        id: 'VUNSCH2',
        name: 'VUNSCH2',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            // 추가 제품 항목
        ],
        shopLink: '#'
    },
    {
        id: 'VUNSCH3',
        name: 'VUNSCH3',
        items: [
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: prdImg, alt: 'image', title: 'Stripe Shirt', price: '$194.00', sale: '20%' },
            // 추가 제품 항목
        ],
        shopLink: '#'
    }
]);

// 현재 활성화된 탭 인덱스를 저장하는 변수
const activeTab = ref(0);

</script>
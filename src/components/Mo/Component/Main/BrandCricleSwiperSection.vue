<template>
    <section>
        <div class="brand-wrap3">
            <!-- 제목과 더보기 링크를 포함하는 타이틀 랩 컴포넌트 -->
            <TitleWrap title="Summer ’23" linkHref="#" linkText="View More" />
            <!-- 탭 메뉴를 위한 스와이퍼 컴포넌트 -->
            <div class="tab-menu-swiper2">
                <menuSwiperComponent ref="menuSwiper" type="v5" :menuObj="menuObj" @menuClick="handleMenuClick" />
            </div>
            <!--탭에 쓰이는 스와이퍼 템플릿-->
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
import TabContent from '../Main/Component/TabContent2.vue'
import DemoImg from '../../../../assets/mo/images/temp/@temp_brand3.png';
import DemoImg2 from '../../../../assets/mo/images/temp/@temp_brand2.png';
import DemoImg3 from '../../../../assets/mo/images/temp/@temp_brand4.png';
import prdImg from '../../../../assets/mo/images/temp/@temp_prd_image2.png';
import 'swiper/css';


// 메뉴 객체 배열을 정의
const menuObj = ref([
    { name: 'LOOKAST', imgSrc: DemoImg },
    { name: 'ABONNE', imgSrc: DemoImg2 },
    { name: 'KIRSHBLENDING', imgSrc: DemoImg3 },
    { name: 'VUNSCH', imgSrc: DemoImg },
    { name: 'LOOKAST', imgSrc: DemoImg },
    { name: 'VUNSCH', imgSrc: DemoImg },
]);

// 탭 슬라이드 데이터를 정의
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

// 현재 활성화된 탭 인덱스를 저장하는 변수
const activeTab = ref(0);

// 슬라이드 변경 시 호출되는 함수
const handleSlideChange = (index: number) => {
    activeTab.value = index;
    if (menuSwiper.value) {
        menuSwiper.value.onMenuClick('v5', index); // 메뉴 스와이퍼에서 해당 메뉴를 클릭한 것처럼 처리
    }
};

// 메뉴 클릭 시 호출되는 함수
const handleMenuClick = (index: number) => {
    activeTab.value = index;
    if (tabListSwiper.value) {
        tabListSwiper.value.slideTo(index);  // 탭 리스트 스와이퍼를 해당 인덱스로 이동
    }
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
            { imgSrc: DemoImg3, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
            { imgSrc: DemoImg2, alt: 'image', title: 'Shirring Sleeveless Dress', price: '$194.00', sale: '20%' },
        
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
        ],
        shopLink: '#'
    },

]);
</script>
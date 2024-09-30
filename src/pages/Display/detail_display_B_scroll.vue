<template>
    <component :is="dynamicComponent" :showSearchButton="showSearchButton" :showShareButton="showShareButton"
        :showCartButton="showCartButton" :showHomeButton="showHomeButton" />
    <div class="sub" id="container">
        <div class="content-wrap display-wrap">
            <div class="detail-wrap lookbook"> <!-- lookbook 클래스 추가시 타입 B로 변환 -->

                <!-- 제품 버튼 컴포넌트, 클릭 이벤트와 퀵뷰 제품 참조 업데이트 기능 포함 -->
                <ProductButton :onClick="handleClick" :onUpdateQuickProductRef="updateQuickProductRef" />

                <!-- 상단 영역, 'up' 클래스와 'on' 클래스에 따라 스타일 조정 필요 -->
                <div class="detail-top on up" ref="detailTopRef">
                    <TopTitle v-bind="topTitleProps" @wishClick="handleWishClick" /><!--상단 타이틀영역-->
                    <!-- LookBookSwiper 컴포넌트, 슬라이드 이미지 표시 -->
                    <LookBookSwiper type="visual" :loop="true" customClass="plan-swiper" :speed="1000" :parallax="true"
                        :slides="recommendSlides" />
                </div>

                <div class="detail-scroll" ref="detailContents">
                    <!-- HTML 콘텐츠가 등록되면 그대로 출력 -->
                    <productHtml customClass="scr-item" :htmlContent="htmlContent" />

                    <!--customclass type-scr 추가시 탭영역 고정 ui 및 @update.tabMenuRef tabMenu이벤트-->
                    <ProductCategory :categoryTitle="categoryTitle" :categories="categories" customClass="type-scr"
                        @update:tabMenuRef="tabMenuRef = $event" />
                    <!--isSwiper를 사용하면 swiper ui 아닐시 swiper실행 안함-->
                    <ProductPlan title="Featured on KYE"
                        subtitle="Post on and hashtag #wMUSE for a chance to be featured below, and earn W Points on purchases you've influenced!"
                        :slides="items" :isSwiper="true" />
                    <!-- Swiper를 사용하지 않는 경우 -->
                    <ProductPlan title="Featured on KYE2"
                        subtitle="Post on and hashtag #wMUSE for a chance to be featured below, and earn W Points on purchases you've influenced!"
                        :isSwiper="false" />
                    <productHtml :htmlContent="htmlContent" /><!--Bo등록시 html그대로 출력되는 영역-->
                    <!-- Lookbook Type 1 슬라이드 표시 -->
                    <LookBook title="23 Summer Collection" type="lookbook-type01" :loop="true"
                        :slides="summerCollectionSlides" />

                    <!-- Lookbook Type 2 슬라이드 및 Shop 버튼과 썸네일 포함 -->
                    <LookBook title="23SS 2nd Drop" type="lookbook-type02" :slides="secondDropSlides"
                        :thumbs="secondDropThumbs" @shopClick="handleShopClick" />

                    <!-- PlanComponent 섹션의 참조를 잡기 위한 감싸는 div -->
                    <div ref="planComponentRef">
                        <PlanComponent :products="newProducts" :options="options" @update-sticky-ref="updateStickyRef"
                            @update-btn-wrap-ref="updateBtnWrapRef" @open-popup="openPopup" /><!--상단 탭영역및 제품 리스트-->
                    </div>

                    <RelatedStories :title="storiesTitle" :stories="relatedStories" /><!--stories 스와이퍼 영역-->

                </div>
            </div>
        </div>
    </div>
    <!-- LookBookPopupLayer 컴포넌트 참조, LookBook 데이터 전달 -->
    <LookBookPopupLayer  v-if="selectedItem" ref="lookBookPopup" :lookBookData="selectedItem" />
    <SelectPopupLayer ref="selectPopup" :depthOptions="depthOptions" @update:selectedOption="handleOptionSelected" />
    <Quick />
    <Navigation />
    <Footer />
</template>

<script setup lang="ts">
import { ref, computed, Ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { useScroll } from '../../utils/useScroll';

// 컴포넌트 임포트
import SubHeader from "../../components/Mo/Header/SubHeader.vue";
import MainHeader from "../../components/Mo/Header/MainHeader.vue";
import Quick from "../../components/Mo/Quick/QuickComponent.vue";
import Navigation from "../../components/Mo/Navigation/NavigationComponent.vue";
import Footer from "../../components/Mo/Footer/FooterComponent.vue";

import TopTitle from './TopTitle.vue'; // 상단 타이틀 컴포넌트
import ProductButton from './productButton.vue'; // 제품 버튼 컴포넌트
import LookBookSwiper from '../../components/Mo/Swiper/SwiperComponent.vue'; // 스와이프 컴포넌트
import ProductCategory from './ProductCategory.vue';
import ProductPlan from './ProductPlan.vue';
import productHtml from './ProductHtml.vue';
import RelatedStories from './RelatedStories.vue';
import PlanComponent from './PlanComponent.vue'
import SelectPopupLayer from '../../components/Mo/Popup/SelectOptionPopup.vue';
import LookBook from "./LookBook.vue"; // LookBook 컴포넌트
import LookBookPopupLayer from '../../components/Mo/Popup/LookBookPopup.vue'; // LookBook 팝업 레이어

// 이미지 임포트
import htmlImg from '@/assets/mo/images/temp/@temp_lookbook_html.png';
import LookBookImg1 from "@/assets/mo/images/temp/@temp_lookbook_main.png";
import LookBookImg2 from "@/assets/mo/images/temp/@temp_lookbook_01.png";
import LookBookImg3 from "@/assets/mo/images/temp/@temp_lookbook_02.png";
import LookBookImg4 from "@/assets/mo/images/temp/@temp_lookbook_03.png";
import summerImg1 from "@/assets/mo/images/temp/@temp_lookbook_04.png";
import summerImg2 from "@/assets/mo/images/temp/@temp_lookbook_02.png";
import summerImg3 from "@/assets/mo/images/temp/@temp_lookbook_01.png";
import secondImg1 from "@/assets/mo/images/temp/@temp_lookbook_01.png";
import secondImg2 from "@/assets/mo/images/temp/@temp_lookbook_02.png";
import secondImg3 from "@/assets/mo/images/temp/@temp_lookbook_03.png";
import secondImg4 from "@/assets/mo/images/temp/@temp_lookbook_04.png";
import thumImg1 from "@/assets/mo/images/temp/@temp_lookbook_01.png";
import thumImg2 from "@/assets/mo/images/temp/@temp_lookbook_02.png";
import thumImg3 from "@/assets/mo/images/temp/@temp_lookbook_03.png";
import thumImg4 from "@/assets/mo/images/temp/@temp_lookbook_04.png";
import DemoImg5 from '@/assets/mo/images/temp/@temp_prd_image5.png';
import DemoImg6 from '@/assets/mo/images/temp/@temp_prd_image6.png';
import DemoImg7 from '@/assets/mo/images/temp/@temp_prd_image7.png';
import DemoImg8 from '@/assets/mo/images/temp/@temp_prd_image8.png';



//참조 정의
const detailTopRef = ref<HTMLElement | null>(null);
const quickProductRef = ref<HTMLElement | null>(null);
const planComponentRef = ref(null); // PlanComponent 참조

// 스크롤 시 PlanComponent로 이동
const scrollToPlanComponent = () => {
    if (planComponentRef.value) {
        const elementTop = planComponentRef.value.getBoundingClientRect().top + window.scrollY;
        gsap.to(window, { duration: .3, scrollTo: { y: elementTop, autoKill: false } });
    }
};

// 자식으로부터 전달받은 ref를 저장하는 함수
const updateQuickProductRef = (refElement: HTMLElement) => {
    quickProductRef.value = refElement; // 자식으로부터 전달받은 ref 저장
};

//버튼 클릭 시 해당 엘리먼트 스크롤 이동
const handleClick = () => {
    scrollToPlanComponent(); // PlanComponent로 스크롤 이동
};


// LookBook 데이터 정의
interface Product {
    image: string;
    alt: string;
    brand: string;
    title: string;
    originalPrice?: string;
    price: string;
    sale: number;
    tags: string[];
    likes: number;
    colors: string;
}


interface SelectedItemData {
    title: string;
    products: Product[];
}

interface LookBookData {
    title: string;
    products: {
        [key: string]: Product[];  // key는 동적이므로 string 타입으로 정의
    };
}


// LookBookPopupLayer에서 사용할 LookBook 데이터를 정의
const lookBookData: LookBookData = {
    title: 'Shop This Look',
    products: {
        item0: [
            {
                image: DemoImg5,
                alt: 'Product 1',
                brand: 'Brand A',
                title: 'Stylish Jacket',
                originalPrice: '$500.00',
                price: '$350.00',
                sale: 30,
                tags: ['Free Shipping', 'Limited Edition'],
                likes: 350,
                colors: '5 Colors',
            },
            {
                image: DemoImg6,
                alt: 'Product 2',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg7,
                alt: 'Product 3',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg8,
                alt: 'Product 4',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg5,
                alt: 'Product 5',
                brand: 'Brand A',
                title: 'Stylish Jacket',
                originalPrice: '$500.00',
                price: '$350.00',
                sale: 30,
                tags: ['Free Shipping', 'Limited Edition'],
                likes: 350,
                colors: '5 Colors',
            },
            {
                image: DemoImg6,
                alt: 'Product 6',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            }
        ],
        item1: [
            {
                image: DemoImg7,
                alt: 'Product 3',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg5,
                alt: 'Product 1',
                brand: 'Brand A',
                title: 'Stylish Jacket',
                originalPrice: '$500.00',
                price: '$350.00',
                sale: 30,
                tags: ['Free Shipping', 'Limited Edition'],
                likes: 350,
                colors: '5 Colors',
            },
            {
                image: DemoImg6,
                alt: 'Product 2',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },

            {
                image: DemoImg8,
                alt: 'Product 4',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg5,
                alt: 'Product 5',
                brand: 'Brand A',
                title: 'Stylish Jacket',
                originalPrice: '$500.00',
                price: '$350.00',
                sale: 30,
                tags: ['Free Shipping', 'Limited Edition'],
                likes: 350,
                colors: '5 Colors',
            },
            {
                image: DemoImg6,
                alt: 'Product 6',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            }
        ],
        item2: [
            {
                image: DemoImg5,
                alt: 'Product 1',
                brand: 'Brand A',
                title: 'Stylish Jacket',
                originalPrice: '$500.00',
                price: '$350.00',
                sale: 30,
                tags: ['Free Shipping', 'Limited Edition'],
                likes: 350,
                colors: '5 Colors',
            },
            {
                image: DemoImg6,
                alt: 'Product 2',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg7,
                alt: 'Product 3',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg8,
                alt: 'Product 4',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg5,
                alt: 'Product 5',
                brand: 'Brand A',
                title: 'Stylish Jacket',
                originalPrice: '$500.00',
                price: '$350.00',
                sale: 30,
                tags: ['Free Shipping', 'Limited Edition'],
                likes: 350,
                colors: '5 Colors',
            },
            {
                image: DemoImg6,
                alt: 'Product 6',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            }
        ],
        item3: [
            {
                image: DemoImg5,
                alt: 'Product 1',
                brand: 'Brand A',
                title: 'Stylish Jacket',
                originalPrice: '$500.00',
                price: '$350.00',
                sale: 30,
                tags: ['Free Shipping', 'Limited Edition'],
                likes: 350,
                colors: '5 Colors',
            },
            {
                image: DemoImg6,
                alt: 'Product 2',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg7,
                alt: 'Product 3',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg8,
                alt: 'Product 4',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            },
            {
                image: DemoImg5,
                alt: 'Product 5',
                brand: 'Brand A',
                title: 'Stylish Jacket',
                originalPrice: '$500.00',
                price: '$350.00',
                sale: 30,
                tags: ['Free Shipping', 'Limited Edition'],
                likes: 350,
                colors: '5 Colors',
            },
            {
                image: DemoImg6,
                alt: 'Product 6',
                brand: 'Brand B',
                title: 'Casual Shoes',
                price: '$150.00',
                sale: 20,
                tags: ['Best Seller'],
                likes: 120,
                colors: '3 Colors',
            }
        ],
    }
};

interface Slide {
    imageSrc: string;
    altText: string;
}



// LookBookPopupLayer 컴포넌트를 참조로 정의
const lookBookPopup = ref<InstanceType<typeof LookBookPopupLayer> | null>(null);


// 선택된 아이템 저장할 변수
const selectedItem = ref<SelectedItemData | null>(null);

// Shop 버튼 클릭 시 LookBookPopupLayer 팝업을 여는 함수
const handleShopClick = (data: { slide: Slide, index: number }) => {
    const { index } = data;

    const selectedItemData: SelectedItemData = {
        title: lookBookData.title,
        products: lookBookData.products[`item${index}`] // 선택된 인덱스에 맞는 제품 데이터 설정
    };


    selectedItem.value = selectedItemData;

    if (lookBookPopup.value) {
        lookBookPopup.value.openPopup();
    }
};


// summerCollectionSlides에 여름 컬렉션 슬라이드를 정의
const summerCollectionSlides = [
    { imageSrc: summerImg1, altText: 'Summer Collection Image 1' },
    { imageSrc: summerImg2, altText: 'Summer Collection Image 2' },
    { imageSrc: summerImg3, altText: 'Summer Collection Image 3' },
];

//2번째 드롭 슬라이드 정의
const secondDropSlides = [
    { imageSrc: secondImg1, altText: 'Second Drop Image 1' },
    { imageSrc: secondImg2, altText: 'Second Drop Image 2' },
    { imageSrc: secondImg3, altText: 'Second Drop Image 3' },
    { imageSrc: secondImg4, altText: 'Second Drop Image 4' },
];

//2번째 드롭 썸네일 정의
const secondDropThumbs = [
    { imageSrc: thumImg1, altText: 'Thumbnail Image 1' },
    { imageSrc: thumImg2, altText: 'Thumbnail Image 2' },
    { imageSrc: thumImg3, altText: 'Thumbnail Image 3' },
    { imageSrc: thumImg4, altText: 'Thumbnail Image 4' },
];


// 카테고리 제목 정의
const categoryTitle = 'Reike Nen Pre-Fall’23';

// 카테고리 목록 정의
const categories = ['WOMEN', 'MEN', 'K-BEAUTY', 'LIFE'];

// 탑 타이틀 속성 정의
const topTitleProps = {
    title: "VERSACE Official Unleash Your Best Self With VERSACE"
};

//추천 슬라이드를 저장하는 ref 정의
const recommendSlides = ref([
    {
        imageSrc: LookBookImg1,
        altText: 'Recommend Slide 1',
    },
    {
        imageSrc: LookBookImg2,
        altText: 'Recommend Slide 1',
    },
    {
        imageSrc: LookBookImg3,
        altText: 'Recommend Slide 1',
    },
    {
        imageSrc: LookBookImg4,
        altText: 'Recommend Slide 1',
    },
]);



// HTML 콘텐츠 정의
const htmlContent = `<img src="${htmlImg}" alt="Custom HTML Content" />`;


// PlanComponent를 위한 신상품 데이터 정의
const newProducts = ref([
    {
        depthGroup: 0,
        depth01: "Influencer’s Pick",
        depth02: "",
        items: [
            {
                imageSrc: DemoImg5,
                imageAlt: "Featured Product 1",
                brand: "BRAND A",
                title: "New Stylish Jacket",
                originalPrice: "$500.00",
                specialPrice: "$350.00",
                sale: 30,
                tags: ["Free Shipping", "Limited Edition"],
                likeCount: 350,
                colors: "5 Colors",
                wishActive: false,
                soldout: false,
            },
            {
                imageSrc: DemoImg6,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg7,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg8,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            }
        ]
    },
    {
        depthGroup: 0,
        depth01: "",
        depth02: "",
        items: [
            {
                imageSrc: DemoImg5,
                imageAlt: "Featured Product 1",
                brand: "BRAND A",
                title: "New Stylish Jacket",
                originalPrice: "$500.00",
                specialPrice: "$350.00",
                sale: 30,
                tags: ["Free Shipping", "Limited Edition"],
                likeCount: 350,
                colors: "5 Colors",
                wishActive: false,
                soldout: false,
            },
            {
                imageSrc: DemoImg6,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg7,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg8,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            }
        ]
    },
    {
        depthGroup: 0,
        depth01: "",
        depth02: "",
        items: [
            {
                imageSrc: DemoImg5,
                imageAlt: "Featured Product 1",
                brand: "BRAND A",
                title: "New Stylish Jacket",
                originalPrice: "$500.00",
                specialPrice: "$350.00",
                sale: 30,
                tags: ["Free Shipping", "Limited Edition"],
                likeCount: 350,
                colors: "5 Colors",
                wishActive: false,
                soldout: false,
            },
            {
                imageSrc: DemoImg6,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg7,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg8,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            }
        ]
    },
    {
        depthGroup: 1,
        depth01: "APPAREL",
        depth02: "",
        items: [
            {
                imageSrc: DemoImg5,
                imageAlt: "Featured Product 1",
                brand: "BRAND A",
                title: "New Stylish Jacket",
                originalPrice: "$500.00",
                specialPrice: "$350.00",
                sale: 30,
                tags: ["Free Shipping", "Limited Edition"],
                likeCount: 350,
                colors: "5 Colors",
                wishActive: false,
                soldout: false,
            },
            {
                imageSrc: DemoImg6,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg7,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg8,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            }
        ]
    },
    {
        depthGroup: 1,
        depth01: "",
        depth02: "",
        items: [
            {
                imageSrc: DemoImg5,
                imageAlt: "Featured Product 1",
                brand: "BRAND A",
                title: "New Stylish Jacket",
                originalPrice: "$500.00",
                specialPrice: "$350.00",
                sale: 30,
                tags: ["Free Shipping", "Limited Edition"],
                likeCount: 350,
                colors: "5 Colors",
                wishActive: false,
                soldout: false,
            },
            {
                imageSrc: DemoImg6,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg7,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg8,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            }
        ]
    },
    {
        depthGroup: 2,
        depth01: "BAG&ACC",
        depth02: "",
        items: [
            {
                imageSrc: DemoImg5,
                imageAlt: "Featured Product 1",
                brand: "BRAND A",
                title: "New Stylish Jacket",
                originalPrice: "$500.00",
                specialPrice: "$350.00",
                sale: 30,
                tags: ["Free Shipping", "Limited Edition"],
                likeCount: 350,
                colors: "5 Colors",
                wishActive: false,
                soldout: false,
            },
            {
                imageSrc: DemoImg6,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg7,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            },
            {
                imageSrc: DemoImg8,
                imageAlt: "Featured Product 2",
                brand: "BRAND B",
                title: "Modern Casual Shoes",
                originalPrice: "$200.00",
                specialPrice: "$150.00",
                sale: 25,
                tags: ["Exclusive", "Best Seller"],
                likeCount: 120,
                colors: "3 Colors",
                wishActive: true,
                soldout: false,
            }
        ]
    }
]);

// 탭 요소 타겟 정의
const stickyBoxRef = ref<HTMLElement | null>(null);
const updateStickyRef = (refElement: HTMLElement) => {
    stickyBoxRef.value = refElement;
};

// 버튼 랩 요소 타겟 정의
const btnWrapRef = ref<HTMLElement | null>(null);
const updateBtnWrapRef = (refElement: HTMLElement) => {
    btnWrapRef.value = refElement;
};

// 깊이 제품 요소를 참조로 정의
const depthProducts: Ref<HTMLElement[] | null> = ref(null);

// 스크롤 방향 추적 변수
let lastScrollTop = 0;
// 전역 scrollTop 변수 선언
let scrollTop = 0;

// 옵션 상태 관리
const options = ref({
    optValue01: null as string | null,
    optValue02: null as string | null
});

// newDepth01을 ref로 정의
const newDepth01 = ref<string | null>(null);
const newDepth02 = ref<string | null>(null);

// 탭 버튼 텍스트 변경 함수 정의
const updateButtonText = () => {
    if (!depthProducts.value || !btnWrapRef.value || !stickyBoxRef.value) return;

    const headerWrapHeight = (document.querySelector('.header-wrap') as HTMLElement)?.offsetHeight || 0;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    let depth01Temp = null;
    let depth02Temp = null;

    depthProducts.value.forEach((product, index) => {
        const productTop = product.querySelector('.product-top');
        const depth01Element = product.querySelector('.depth-01');
        const depth02Element = product.querySelector('.depth-02');
        const productHeight = product.offsetHeight;

        // depth-01이 없는 경우 depth-02를 기준으로 사용
        const depthElement = depth01Element || depth02Element;

        if (productTop && depthElement) {
            const depthTopPosition = depthElement.getBoundingClientRect().top + window.scrollY - headerWrapHeight;
            const productBottomPosition = depthTopPosition + productHeight;

            // depth의 위치를 기준으로 buffer를 설정하여 텍스트 변경
            const buffer = 50;  // 예시: depth의 위치에서 50px 전에 텍스트를 변경
            const isInView = scrollPosition >= depthTopPosition - buffer && scrollPosition < productBottomPosition;

            if (isInView) {
                const depthGroup = newProducts.value[index].depthGroup;

                for (let i = 0; i < newProducts.value.length; i++) {
                    if (newProducts.value[i].depthGroup === depthGroup && newProducts.value[i].depth01) {
                        depth01Temp = newProducts.value[i].depth01.trim();
                        break;
                    }
                }

                // depth02가 존재할 경우 해당 값을 설정
                if (depth02Element) {
                    depth02Temp = depth02Element.textContent?.trim();
                }
            }
        }
    });

    // depth01 값이 있을 때만 업데이트
    if (depth01Temp) {
        newDepth01.value = depth01Temp;
        options.value.optValue01 = depth01Temp;
    }

    // depth02 값이 있을 때만 업데이트
    if (depth02Temp) {
        newDepth02.value = depth02Temp;
        options.value.optValue02 = depth02Temp;
    } else {
        // depth02 값이 없을 경우 null로 설정
        newDepth02.value = null;
        options.value.optValue02 = null;
    }

    lastScrollTop = scrollPosition;
};


const detailContents = ref<HTMLElement | null>(null);

// 스크롤 이벤트 핸들러 정의
const handleScroll = () => {
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollDifference = scrollTop - lastScrollTop;


    const detailContentsTop = detailContents.value?.getBoundingClientRect().top || 0;
    const windowHeight = window.innerHeight;

    if (detailContentsTop <= 0) {
        if (detailTopRef.value) {
            detailTopRef.value.classList.add('hidden');
        }
    } else {
        if (detailTopRef.value) {
            detailTopRef.value.classList.remove('hidden');
        }
    }


    if (scrollDifference > 0) {
        // 스크롤 다운
        stickyBoxRef.value?.classList.add('down');
        stickyBoxRef.value?.classList.remove('up');
    } else if (scrollDifference < 0) {
        // 스크롤 업 
        stickyBoxRef.value?.classList.add('up');
        stickyBoxRef.value?.classList.remove('down');
    }

    if (planComponentRef.value) {
        const planRect = planComponentRef.value.getBoundingClientRect();
        const isPlanInView = planRect.top < windowHeight && planRect.bottom >= 0;

        if (isPlanInView && quickProductRef.value) {
            quickProductRef.value.classList.add('out');
        } else if (quickProductRef.value) {
            quickProductRef.value.classList.remove('out');
        }
    }



    lastScrollTop = scrollTop;

    updateButtonText(); // 스크롤 시 항상 버튼 텍스트 업데이트

};



// 스크롤 방향 함수 밑으로 내릴때
const onScrollDown = () => {
    const tabMneuElement = tabMenuRef.value;
    if (tabMneuElement && !tabMneuElement.classList.contains('down')) {
        tabMneuElement.classList.add('down');
        tabMneuElement.classList.remove('up');
    }
};

// 스크롤 방향 함수 밑으로 올릴때
const onScrollUp = () => {
    const tabMneuElement = tabMenuRef.value;
    if (tabMneuElement && tabMneuElement.classList.contains('down')) {
        tabMneuElement.classList.remove('down');
        tabMneuElement.classList.add('up');
    }
};



const storiesTitle = "Related Stories";
import storiesImg from "@/assets/mo/images/temp/@temp_plan_list.png";

// 전달할 스토리 데이터 배열 정의
const relatedStories = [
    {
        tag: 'Event & Sale',
        title: 'UPDATED ICONS: MOST-WANTED BAGS',
        about: 'Discover the 7 most wanted bags that everyone is absorbed with. Updated your style with new iconic bags.',
        image: storiesImg,
        link: 'javascript:;'
    },
    {
        tag: 'Trend',
        title: 'UPDATED ICONS: MOST-WANTED BAGS',
        about: 'Discover the 7 most wanted bags that everyone is absorbed with. Updated your style with new iconic bags.',
        image: storiesImg,
        link: 'javascript:;'
    },
    {
        tag: 'Brand',
        title: 'STEP INTO A NEW ROMANCE',
        about: 'From perfectly cut tailoring and evening gowns, to bikini and terry cotton beachwear.',
        image: storiesImg,
        link: 'javascript:;'
    }
];



//탭메뉴
const tabMenuRef = ref<HTMLElement | null>(null);


// 버튼 가시성 제어 플래그 설정
const showSearchButton = ref(false);
const showShareButton = ref(true);
const showCartButton = ref(true);
const showHomeButton = ref(false);


// 라우터 경로 사용
const route = useRoute();
const isMain = computed(() => route.path === '/main');

// 동적 컴포넌트 설정
const dynamicComponent = computed(() => isMain.value ? MainHeader : SubHeader);

interface Item {
    brand: string;
    title: string;
}

// 제품 슬라이드 항목 정의
const items = ref<Item[]>([
    {
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
    }
]);

const selectPopup = ref<InstanceType<typeof SelectPopupLayer> | null>(null);

const currentPopupId = ref<string | null>(null);

// 팝업 열기 함수 정의
const openPopup = (popupId: string) => {
    currentPopupId.value = popupId;

    if (depthProducts.value) {
        let newDepthOptions: Record<string, string> = {};

        if (popupId === 'optValue-01') {
            const uniqueDepth01 = new Set<string>();

            depthProducts.value.forEach((product) => {
                const depthElement = product.querySelector('.depth-01');
                if (depthElement) {
                    const depthText = depthElement.textContent?.trim();
                    if (depthText && !uniqueDepth01.has(depthText)) {
                        uniqueDepth01.add(depthText);
                        newDepthOptions[`option${uniqueDepth01.size}`] = depthText;
                    }
                }
            });

        } else if (popupId === 'optValue-02') {
            const selectedGroup = newProducts.value.find(
                product => product.depth01 === newDepth01.value
            )?.depthGroup;

            if (selectedGroup !== undefined) {
                depthProducts.value.forEach((product, index) => {
                    const productDepthGroup = newProducts.value[index]?.depthGroup;
                    if (productDepthGroup === selectedGroup) {
                        const productTops = product.querySelectorAll('.product-top');
                        productTops.forEach((topElement, topIndex) => {
                            const depthElement = topElement.querySelector('.depth-02');
                            if (depthElement) {
                                const depthText = depthElement.textContent?.trim();
                                if (depthText) {
                                    newDepthOptions[`option${index + 1}-${topIndex + 1}`] = depthText;
                                }
                            }
                        });
                    }
                });
            }

            // depth02가 없는 경우에도 기본 그룹 처리
            if (Object.keys(newDepthOptions).length === 0) {
                depthProducts.value.forEach((product, index) => {
                    const productDepthGroup = newProducts.value[index]?.depthGroup;
                    if (productDepthGroup === 0) {
                        const depthElement = product.querySelector('.depth-01');
                        if (depthElement) {
                            const depthText = depthElement.textContent?.trim();
                            if (depthText) {
                                newDepthOptions[`option${index + 1}`] = depthText;
                            }
                        }
                    }
                });
            }
        }

        depthOptions.value = newDepthOptions;

        if (popupId === 'optValue-01' && newDepth01.value) {
            const matchingKey = Object.keys(depthOptions.value).find(
                key => depthOptions.value[key] === newDepth01.value
            );
            if (matchingKey) {
                nextTick(() => {
                    const popupElement = selectPopup.value?.$el || selectPopup.value;

                    if (popupElement) {
                        const radioInput = popupElement.querySelector(`input[value="${matchingKey}"]`);
                        if (radioInput) {
                            (radioInput as HTMLInputElement).checked = true;
                        }
                    }
                });
            }
        }
        if (popupId === 'optValue-02' && newDepth02.value) {
            const matchingKey = Object.keys(newDepthOptions).find(
                key => newDepthOptions[key] === newDepth02.value
            );
            if (matchingKey) {
                nextTick(() => {
                    const popupElement = selectPopup.value?.$el || selectPopup.value;

                    if (popupElement) {
                        const radioInput = popupElement.querySelector(`input[value="${matchingKey}"]`);
                        if (radioInput) {
                            (radioInput as HTMLInputElement).checked = true;
                        }
                    }
                });
            }
        }

        if (selectPopup.value) {
            selectPopup.value.openPopup();
        }
    }
};


// 옵션 선택 처리 함수 정의
const handleOptionSelected = (option: string | null) => {
    // 옵션이 선택되지 않았거나 depthProducts가 비어있는 경우 함수를 종료
    if (!option || !depthProducts.value) return;

    // 옵션 버튼들이 있는 요소를 가져옴. 만약 btn-option이 2개라면 2뎁스(옵션이 두 단계)라고 판단
    // const btnOptions = btnWrapRef.value?.querySelectorAll('.btn-option') || [];
    // const hasDepth02 = btnOptions.length === 2;

    // nextTick을 사용하여 DOM 업데이트 이후에 실행
    nextTick(() => {
        let targetElement: HTMLElement | null = null; // 선택된 옵션에 해당하는 요소를 저장할 변수
        let targetIndex: number | null = null; // 선택된 요소의 인덱스를 저장할 변수
        let hasDepth01 = false; // depth-01이 있는지 여부를 저장하는 변수

        if (depthProducts.value) {
            // 모든 제품에 대해 반복문을 실행하여 선택된 옵션에 해당하는 요소를 찾음
            depthProducts.value.forEach((product, index) => {
                const depth01Element = product.querySelector('.depth-01'); // 1뎁스 요소를 찾음
                const depth02Elements = product.querySelectorAll('.depth-02'); // 2뎁스 요소들을 찾음

                // 옵션이 depth-01 요소와 일치하는지 확인
                if (depth01Element && depth01Element.textContent?.trim() === option) {
                    targetElement = depth01Element as HTMLElement; // 일치하면 타겟 요소로 설정
                    targetIndex = index; // 해당 인덱스 저장
                    hasDepth01 = true; // depth-01이 있음
                }

                // 옵션이 depth-02 요소와 일치하는지 확인
                depth02Elements.forEach((depth02Element) => {
                    if (depth02Element.textContent?.trim() === option) {
                        targetElement = depth02Element as HTMLElement; // 일치하면 타겟 요소로 설정
                        targetIndex = index; // 해당 인덱스 저장
                        if (!depth01Element) hasDepth01 = false; // depth-01이 없는 경우 처리
                    }
                });

                // depth02 요소가 없는 경우 depth01 요소만으로 타겟 설정
                if (depth02Elements.length === 0 && depth01Element && depth01Element.textContent?.trim() === option) {
                    targetElement = depth01Element as HTMLElement; // 타겟 요소로 설정
                    targetIndex = index; // 해당 인덱스 저장
                    hasDepth01 = true; // depth-01이 있음
                }
            });
        }

        // 타겟 요소와 인덱스가 유효한 경우
        if (targetElement && targetIndex !== null) {
            const rect = targetElement.getBoundingClientRect(); // 타겟 요소의 위치 정보를 가져옴
            const elementTop = rect.top + scrollTop; // 요소의 절대적인 상단 위치를 계산
            let scrollMove;

            // 스크롤 방향 판단
            if (scrollTop < elementTop) {
                // 스크롤이 위에서 아래로 내려가는 경우
                if (hasDepth01) {
                    scrollMove = elementTop - 50; // depth-01이 있을 때 스크롤 위치
                }
            } else {
                // 스크롤이 아래에서 위로 올라가는 경우
                if (hasDepth01) {
                    scrollMove = elementTop - 90; // depth-01이 있을 때 스크롤 위치
                }
            }

            gsap.to(window, { duration: 1, scrollTo: { y: scrollMove, autoKill: false } });

            // 마지막 스크롤 위치를 현재 스크롤 위치로 업데이트
            lastScrollTop = scrollTop;
        }
    });
};




// 위시 아이콘 클릭 이벤트 처리 함수 정의
const handleWishClick = () => {
    console.log('위시 아이콘 클릭 이벤트');
};

// depth 옵션 데이터를 저장하는 Ref
const depthOptions: Ref<Record<string, string>> = ref({});

// 컴포넌트가 마운트된 후 수행되는 작업
onMounted(() => {
    nextTick(() => {
        // depthProducts 요소를 참조 배열로 설정
        depthProducts.value = Array.from(document.querySelectorAll('.depth-product'));
        updateButtonText();
    });
});

// 스크롤을 사용할 수 있게 하는 커스텀 훅 사용
useScroll({
    onScrollDown,
    onScrollUp,
    handleScroll,    // 스크롤 시 항상 호출되는 함수
});

</script>

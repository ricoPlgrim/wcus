<template>
    <component :is="dynamicComponent" :headerBgColor="headerBgColor" :headerClass="headerClass"
        :showSearchButton="showSearchButton" :showShareButton="showShareButton" :showCartButton="showCartButton"
        :showHomeButton="showHomeButton" @headerHeight="updateHeaderHeight" :handleScrollStateChange="isScrolling"
        :modelValue="activeTabIndex" :tabChangeExecuted="tabChangeExecuted" />

    <!-- 헤더 관련 설명
         :headerBgColor="headerBgColor" => 헤더의 배경색상 설정
         :showSearchButton="showSearchButton" => 헤더에 검색 버튼 표시 여부
         :showShareButton="showShareButton" => 헤더에 SNS 공유 버튼 표시 여부
         :showCartButton="showCartButton" => 헤더에 장바구니 버튼 표시 여부
         :showHomeButton="showHomeButton" => 헤더에 홈 버튼 표시 여부
         @headerHeight="updateHeaderHeight" => 헤더 높이 업데이트 함수
         :handleScrollStateChange="isScrolling" => 스크롤 상태를 자식 컴포넌트에서 부모로 전달
         :modelValue="activeTabIndex" => 활성화된 탭 인덱스 값 전달
         :tabChangeExecuted="tabChangeExecuted" => 탭 변경이 실행되었는지 여부 전달
    -->

    <div class="sub" id="container">
        <div class="content-wrap  product-wrap">
            <div class="detail-wrap">
                <div class="product-thumb">
                    <!--상품상세 스와이퍼-->
                    <ProductSwiper :slides="visualItem" @slideSelected="onSlideSelected" customClass="product"
                        type="page" />
                    <!--상품상세 클릭시 풀팝업 스와이퍼-->
                    <FullPopupLayer ref="prdPopupLayer" :selectedIndex="selectedIndex" />
                    <!-- 태그 박스 컴포넌트 -->
                    <TagBox :tags="productTags" />
                </div>
                <div class="product-info">
                    <!-- 상품 정보 컴포넌트 -->
                    <ProductInfo :productInfo="productInfo" />
                    <!-- 쿠폰 박스 컴포넌트 -->
                    <CouponBox :coupons="couponData" />
                    <!-- 배송 정보 컴포넌트 -->
                    <DeliveryInfo :deliveryText="deliveryOptions" />
                    <!-- 메시지 박스 컴포넌트 -->
                    <MsgBox btnText="Final Sale"
                        tooltipContents="Final sale item is available at a discounted price as they are limited in quantity and may not be in perfect condition (e.g., no tags, minimal imperfections, etc.). Please note that due to the nature of the sale, we will not be offering any price matching, exchanges, cancellations, or return for these items."
                        :tooltipSub="true" tooltipSubText=": Non-returnable item" />
                    <!-- 태그 링크 박스 컴포넌트 -->
                    <TagBoxLink :tags="tagsLinks" />
                    <!-- 아코디언 리스트 컴포넌트 -->
                    <AccordionList :items="accordionItems" />
                    <!-- 뮤즈 박스 컴포넌트 -->
                    <WmuseBox />
                    <!-- 공지사항 박스 컴포넌트 -->
                    <NoticeBox :notices="notices" />
                </div>

                <div class="product-cont">
                    <!-- 탭 컴포넌트 -->
                    <TabComponent :tabs="detailsTabs" tabClass="tab-type" :modelValue="activeTabIndex"
                        @update:activeIndex="handleTabChange" />
                    <!-- 상품 상세, 리뷰, 추천 섹션 -->
                    <div ref="detailsRef">
                        <DetailsComponent :content="prdData" />
                    </div>
                    <div ref="reviewRef">
                        <ReviewSection :reviewData="reviewData" />
                    </div>
                    <div ref="recommendRef">
                        <RecommendSection :recommendData="recommendData" />
                    </div>
                    <!-- 장바구니 버튼 컴포넌트 -->
                    <CartBtn :isOutOfStock="false" :isUnavailable="false" :initialIsActive="false" />
                </div>
            </div>
        </div>
        <!-- 사이즈 가이드 팝업 -->
        <SizeGuidePopupLayer ref="sizeGidePopup" :tabs="sizeGuideData.tabs" :tabContents="sizeGuideData.contents"
            :actualSize="sizeGuideData.actualSizeInfo" :noteText="sizeGuideData.noteText" />
    </div>

    <Quick customClass="detail " /> <!-- detail 클래스 추가시 업다운 기능 작동 안함 -->
    <Footer customClass="detail" /><!-- detail 클래스 추가시 하단 여백 발생 -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import { useRoute } from 'vue-router';
import { useScroll } from '../../utils/useScroll';
import SubHeader from "../../components/Mo/Header/SubHeader.vue";
import MainHeader from "../../components/Mo/Header/MainHeader.vue";
import Quick from "../../components/Mo/Quick/QuickComponent.vue";
import Footer from "../../components/Mo/Footer/FooterComponent.vue";
import CartBtn from "./Component/CartBtn.vue";


/* 상품상세 페이지 컴포넌트 */
import ProductSwiper from "../../components/Mo/Swiper/ProductSwiper.vue"
import TagBox from "./Component/TagBox.vue"
import ProductInfo from "./Component/ProductInfo.vue"
import CouponBox from "./Component/CouponBox.vue"
import DeliveryInfo from "./Component/DeliveryInfo.vue"


/* 각종 컴포넌트들 */
import MsgBox from "./Component/MsgBox.vue"
import TagBoxLink from "./Component/TagBoxLink.vue"
import AccordionList from "./Component/AccordionMenu.vue"
import WmuseBox from "./Component/WmuseBox.vue"
import NoticeBox from "./Component/NoticeBox.vue"
import TabComponent from "../../components/Mo/Buttons/TabBtn.vue"
import DetailsComponent from "./Component/DetailsComponent.vue"
import RecommendSection from "./Component/RecommendComponent.vue"
import ReviewSection from "./Component/ReviewComponent.vue"

//상품팝업 미리보기
import FullPopupLayer from '../../components/Mo/Popup/PullPopupSwiper.vue';

//사이즈 가이드 팝업
import SizeGuidePopupLayer from "../../components/Mo/Popup/SizeGuidePopup.vue";


// 이미지 임포트
import visualImg1 from '@/assets/mo/images/temp/@temp_prd_image2.png';
import visualImg2 from '@/assets/mo/images/temp/@temp_prd_image3.png';
import visualImg3 from '@/assets/mo/images/temp/@temp_prd_image4.png';
import visualImg4 from '@/assets/mo/images/temp/@temp_prd_image5.png';
import visualImg5 from '@/assets/mo/images/temp/@temp_prd_image6.png';
import noticeImg1 from '@/assets/mo/images/temp/@temp_banner2.png';

import DemoImg1 from '@/assets/mo/images/temp/@temp_prd_image.png'
import DemoImg2 from '@/assets/mo/images/temp/@temp_prd_image2.png'
import DemoImg3 from '@/assets/mo/images/temp/@temp_prd_image3.png'
import DemoImg4 from '@/assets/mo/images/temp/@temp_prd_image4.png'
import DemoImg5 from '@/assets/mo/images/temp/@temp_prd_image5.png'
import DemoImg6 from '@/assets/mo/images/temp/@temp_prd_image6.png'


// 비디오 임포트
import videoTest1 from '@/assets/mo/images/sample_video.mp4'
import videoTest2 from '@/assets/mo/images/sample_video2.mp4'



// 헤더 관련 설정
const headerBgColor = 'transparent';  // 헤더 배경색 투명
const headerClass = "v2";  // 헤더에 v2 클래스 추가const headerBgColor = 'transparent';

// 버튼 가시성 제어 플래그 설정
const showSearchButton = ref(true); //검색 버튼 표시
const showShareButton = ref(true);  // 공유 버튼 표시
const showCartButton = ref(true);  // 장바구니 버튼 표시
const showHomeButton = ref(false);  // 홈 버튼 미표시



/* 상품 슬라이더에 사용할 이미지 및 비디오 데이터 */
interface VisualItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
}

/* 제품의 태그 데이터를 설정 */
const visualItem = ref<VisualItem[]>([
    {
        type: 'image',
        src: visualImg1,
        alt: 'visual',
    },
    {
        type: 'video',
        src: 'https://player.vimeo.com/video/249908774',
    },
    {
        type: 'image',
        src: visualImg2,
        alt: 'visual',
    },
    {
        type: 'image',
        src: visualImg3,
        alt: 'visual',
    },
    {
        type: 'video',
        src: 'https://player.vimeo.com/video/524933864',
    },
    {
        type: 'image',
        src: visualImg4,
        alt: 'visual',
    },
    {
        type: 'image',
        src: visualImg5,
        alt: 'visual',
    },
]);

// Product Tags 데이터 설정
const productTags = ref(['Priority Shipping', 'Exclusive']);


/* 제품 정보 데이터 */
interface ProductInfoData {
    brandName: string;
    productName: string;
    originalPrice?: number;
    discountedPrice: number;
    discountRate?: number;
    loyaltyPoints: number;
    reviewCount: number;
    rating: number;
}

const productInfo = ref<ProductInfoData>({
    brandName: "Brand Name",
    productName: "Double Button Cotton Shorts _ 3 Colors Cube Linen Cardigan",
    originalPrice: 384.00,
    discountedPrice: 362.00,
    discountRate: 39,
    loyaltyPoints: 78,
    reviewCount: 14,
    rating: 80,
});


// 쿠폰 데이터 설정
interface Coupon {
    code: string;
    notice: string;
}

const couponData: Coupon[] = [
    { code: 'JAMBSADEAL1', notice: "THIS WEEK'S DEAL: 1 BSA BRANDS" },
    { code: 'JAMBSADEAL2', notice: "THIS WEEK'S DEAL: 2 BSA BRANDS" },
    { code: 'JAMBSADEAL3', notice: "THIS WEEK'S DEAL: 3 BSA BRANDS" },
    { code: 'JAMBSADEAL4', notice: "THIS WEEK'S DEAL: 4 BSA BRANDS" },
];

/* 배송 정보 데이터 설정 */
interface deliveryItem {
    text: string;
}

const deliveryOptions = ref<deliveryItem[]>([
    { text: 'Standard (5-11 Business Days)' },
    { text: 'Estimated Delivery: Mar 02 - Mar 10' }
]);


const tagsLinks = ['#4Depth', '#3Depth', '#2Depth', '#1Depth'];
const accordionItems = ref([
    {
        title: "Editor's Notes",
        content: `
      <div class="sku-box">SKU <em>510573889</em></div>
      <pre> These are the pants made of mixed wool/acrylic/poly/nylon. It is convenient to wear with the logo engraved button and the YKK nickel zipper. There are pockets on the front and  back and belt rings on the waist to allow belt use. There is a logo label in the back pocket.</pre>
      <div style="color:#FF563F;">* Price may vary by the options.</div><div style="color:#FF563F;">* Product information has been automatically translated from W Concept Korea site.</div><div style="color:#FF563F;">Please note that due to international shipping conditions, all free gifts will be excluded.</div><br>
    `,
        isActive: true
    },
    {
        title: "Size & Fit",
        content: `
        <table><thead><tr><th></th><th>100</th><th>105</th></tr></thead><tbody><tr><th>총 길이</th><td>11</td><td>22</td></tr><tr><th>어깨너비</th><td>11</td><td>22</td></tr><tr><th>가슴둘레</th><td>11</td><td>22</td></tr><tr><th>소매길이</th><td>11</td><td>22</td></tr><tr><th>소매폭</th><td>11</td><td>22</td></tr></tbody></table>

    `,
        isActive: false
    },
    {
        title: "Composition & Care",
        content: `
        <pre>  -40% Wool, 25% Acrylic, 25% Polyester, 10% Nylon 
  - Do not wash - Dry clean only - Do not bleach 
  - Do not tumble dry 
  - Iron at a maximum of 110 Celsius
        </pre>
        `,
        isActive: false
    },
    {
        title: "Delivery & Return",
        content: `
            <p>Standard (5-11 Business Days)</p>
            <p>Estimated Delivery : May 10 - May 18</p>
        `,
        isActive: false
    },
    {
        title: "About Brand",
        content: `
            <pre>By OUI MAISON
                The Joshep Vestish Top is a knit vest with a boat neck design 
            and semi-crop length made from summer cotton premium yarn.</pre>
        `,
        isActive: false
    }
]);

// NoticeBox에 전달할 공지사항 데이터
const notices = ref([
    {
        items: [
            "New knitted sleeveless top is perfect for layering without division of front and back, as well as various styling with straps on each side by either tying or untying the straps.",
            "Design and length perfect for layering"
        ],
        imageSrc: noticeImg1
    },
    {
        items: [
            "New knitted sleeveless top is perfect for layering without division of front and back, as well as various styling with straps on each side by either tying or untying the straps.",
            "Design and length perfect for layering"
        ],
        imageSrc: noticeImg1
    }
]);

// 탭 인터페이스 정의
interface Tab {
    href: string;
    text: string;
    dataText?: string;
    count?: number;
}

// 탭 데이터 정의
const detailsTabs = ref<Tab[]>([
    { href: 'javascript:;', text: 'Details', dataText: 'Details' },
    { href: 'javascript:;', text: 'Reviews', dataText: 'Reviews', count: 80 },
    { href: 'javascript:;', text: 'Recommend', dataText: 'Recommend' },
]);

// 이미지 error 일 경우 (s) 
//< img src = "../../assets/moimages/temp/@temp_prd_imaddddge2.png" alt = "image" onerror = "this.src='../../assets/mo/images/no_prd_image.png'" >
//이미지 error 일 경우 (e) -->
const prdData = ref<string>(` This jacket is made of rayon, polyester, and linen. It features a minimal design, 
                              a peaked lapel with a clean and neat look. Wear this item with a matching bottom for a perfect set look. This item is a perfect formal item.
							  <br/>
							  <br/>
                              <img src="https://cdn.wconcept.com/contents/extract/p/product-image.wconcept.co.kr/18ed5865b40/1a8be7/33/thARdP0fdKGVajeJ-80SpgBcOWw.jpg" alt="image">
							  <img src="https://cdn.wconcept.com/contents/extract/p/product-image.wconcept.co.kr/18ed5865b40/15332a/33/EoAbdogiAN4dRw9sr4fBbgWtA_w.jpg" alt="image">
                            `)
//리뷰 데이터
const reviewData = ref({
    averageRating: 4.8,
    fitData: [
        { label: 'Runs Small', percentage: 10 },
        { label: 'True To Size', percentage: 80 },
        { label: 'Runs Large', percentage: 10 },
    ],
    reviews: [
        {
            id: 1,
            name: 'Sally',
            rating: 4.8,
            fit: 'True To Size',
            purchasedSize: 'L',
            usualSize: 'L',
            title: 'Love the jacket',
            content: `
            I really like this jacket. It has a simple shape, but with nice details. 
            However, the price on it fluctuates day by day and WConcept doesn't do price 
            adjustments, so it's kind of silly that they want you to keep buying and returning 
            the same jacket. The jacket is well made and structured. Fit is perfect, relaxed fit 
            but doesn’t look oversized. Love it!
        `,
            expanded: false,
            images: [visualImg1, visualImg2],
            videos: [
                { src: videoTest1, videoImg: visualImg1 }, // 비디오와 썸네일 이미지 추가
                { src: videoTest2, videoImg: visualImg2 }
            ],
            date: 'Jun 15, 2023',
            helpful: 10,
            reply: 'Thank you for your feedback! We are glad you loved the jacket!'
        },
        {
            id: 2,
            name: 'John',
            rating: 4.0,
            fit: 'Runs Small',
            purchasedSize: 'M',
            usualSize: 'M',
            title: 'Good quality, but tight',
            content: 'The jacket is great but fits a little smaller than expected.',
            expanded: false,
            images: [visualImg3],
            videos: [], // 비디오가 없는 경우 빈 배열
            date: 'Jun 14, 2023',
            helpful: 5
        },
        {
            id: 3,
            name: 'Emily',
            rating: 5.0,
            fit: 'True To Size',
            purchasedSize: 'S',
            usualSize: 'S',
            title: 'Perfect Fit and Quality',
            content: `
            This is one of the best jackets I have ever purchased. The material feels premium 
            and the fit is absolutely perfect. It's stylish yet practical. I received many compliments 
            wearing it.
        `,
            expanded: false,
            images: [visualImg4, visualImg5],
            videos: [
                { src: videoTest1, videoImg: visualImg4 } // 단일 비디오와 썸네일 이미지 추가
            ],
            date: 'Jun 13, 2023',
            helpful: 15,
            reply: 'Thank you for your feedback! We are glad you loved the jacket!'
        },
        {
            id: 4,
            name: 'David',
            rating: 3.5,
            fit: 'Runs Large',
            purchasedSize: 'XL',
            usualSize: 'L',
            title: 'Good jacket, but too large',
            content: `
            The jacket is good quality but it runs a bit too large for my liking. I ordered an XL but it feels 
            like an XXL. Next time, I will size down.
        `,
            expanded: false,
            images: [visualImg5],
            videos: [
                { src: videoTest1, videoImg: visualImg5 }, // 여러 비디오와 썸네일 이미지 추가
                { src: videoTest2, videoImg: visualImg1 }
            ],
            date: 'Jun 12, 2023',
            helpful: 3
        },
    ]
});

const prdPopupLayer = ref<InstanceType<typeof FullPopupLayer> | null>(null);

// 선택된 슬라이드 인덱스 관리
const selectedIndex = ref<number>(0);  // realIndex를 저장할 변수
const onSlideSelected = (realIndex: number) => {
    // 선택된 슬라이드 인덱스 업데이트
    selectedIndex.value = realIndex;
    if (prdPopupLayer.value) {
        prdPopupLayer.value.openPopup();
    }
};

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


//헤더 높이값
const headerHeight = ref(0);
const updateHeaderHeight = (...args: unknown[]) => {
    const height = args[0] as number; // 첫 번째 인수를 height로 처리
    headerHeight.value = height;
};


// 탭 상태 관리
const activeTabIndex = ref(0);

// 각 요소에 대한 ref 설정
const detailsRef = ref<HTMLElement | null>(null);
const reviewRef = ref<HTMLElement | null>(null);
const recommendRef = ref<HTMLElement | null>(null);

// handleScroll 함수 정의
const handleScroll = () => {
    const headerOffset = headerHeight.value || 0; // 헤더 높이 반영

    const detailsRect = detailsRef.value?.getBoundingClientRect();
    const reviewRect = reviewRef.value?.getBoundingClientRect();
    const recommendRect = recommendRef.value?.getBoundingClientRect();

    // 각 섹션이 화면에 보이는지 확인 (헤더 높이 반영)
    if (detailsRect && detailsRect.top - headerOffset < 0 && detailsRect.bottom - headerOffset > 0) {
        activeTabIndex.value = 0; // Details 섹션이 활성화됨
    } else if (reviewRect && reviewRect.top - headerOffset < 0 && reviewRect.bottom - headerOffset > 0) {
        activeTabIndex.value = 1; // Reviews 섹션이 활성화됨
    } else if (recommendRect && recommendRect.top - headerOffset < 0 && recommendRect.bottom - headerOffset > 0) {
        activeTabIndex.value = 2; // Recommend 섹션이 활성화됨
    }
};


const isScrolling = ref(false);
let isAnimating = false;  // 애니메이션 진행 여부를 추적하는 변수

// 탭이 변경되었는지 여부를 저장하는 상태값
const tabChangeExecuted = ref(false);

// 탭 변경 시 호출되는 함수
const handleTabChange = (index: number) => {
    if (isAnimating) return;  // 애니메이션이 진행 중일 경우 함수 종료
    tabChangeExecuted.value = true; // 탭 변경이 실행됨
    isScrolling.value = true;
    isAnimating = true;  // 애니메이션 시작 시 잠금
    let targetElement: HTMLElement | null = null;
    // 목표 요소를 설정
    switch (index) {
        case 0:
            targetElement = detailsRef.value;
            break;
        case 1:
            targetElement = reviewRef.value;
            break;
        case 2:
            targetElement = recommendRef.value;
            break;
    }

    if (targetElement) {
        // 헤더 높이를 고려한 스크롤 오프셋 계산
        const offsetY = headerHeight.value;
        // 현재 스크롤 위치
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;
        // 요소의 위치에서 헤더 오프셋을 고려한 목표 스크롤 위치 계산
        const targetScrollY = targetElement.getBoundingClientRect().top + currentScrollY - offsetY;

        // 애니메이션으로 스크롤 이동
        gsap.to(window, {
            duration: 0.8,
            scrollTo: {
                y: targetScrollY + 1,
            },
            ease: 'power2.out',
            onComplete: () => {
                isScrolling.value = false;
                isAnimating = false;  // 애니메이션 완료 시 잠금 해제
                tabChangeExecuted.value = false; // 애니메이션 종료 후 상태 초기화
            }
        });
    }

    // 클릭한 탭을 active 상태로 설정
    activeTabIndex.value = index;
};

/* 추천 섹션에 전달할 데이터 설정 */
const recommendData = {
    moreByBrand: [
        {
            brand: 'LEMAIRE',
            title: 'High Collar Blouson jackets',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg1,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'High Collar Blouson jackets',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg2,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'High Collar Blouson jackets',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg3,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'High Collar Blouson jackets',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg4,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'High Collar Blouson jackets',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg5,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'High Collar Blouson jackets',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg6,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
    ],
    relatedProducts: [
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg6,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg5,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg4,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg3,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg2,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg1,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
    ],
    frequentlyBoughtTogether: [
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg3,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg2,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg1,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg4,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg6,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
        {
            brand: 'LEMAIRE',
            title: 'You Might Also Like',
            originalPrice: '$400.00',
            salePrice: '$245.00',
            discount: '10%',
            image: DemoImg5,
            href: 'javascript:;',  // 제품 상세 페이지로 이동
        },
    ]
};

//router
const route = useRoute();
// 메인header 체크
const isMain = computed(() => route.path === '/main');

// 동적 컴포넌트 설정
const dynamicComponent = computed(() => isMain.value ? MainHeader : SubHeader);


//사이즈 가이드 팝어부 호출
const openPopup = (popupName: string) => {
    if (popupName === 'sizeGidePopup') {
        if (sizeGidePopup.value) {
            sizeGidePopup.value.openPopup();   //size가이드 팝업 
        }
    }
};



onMounted(() => {
    const sizeGuideBtn = document.getElementById('size-guide-btn');
    if (sizeGuideBtn) {
        //사이즈가이드 버튼 클릭시 사이즈가이드 팝업 호출
        sizeGuideBtn.addEventListener('click', () => {
            openPopup('sizeGidePopup');
        });
    }
});



useScroll({
    handleScroll,    // 스크롤 시 항상 호출되는 함수
});
</script>
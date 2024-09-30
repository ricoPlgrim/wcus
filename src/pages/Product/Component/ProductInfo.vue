<template>
    <div class="product-info-box">
        <!-- 브랜드 이름과 제품명을 표시하는 부분 -->
        <div class="name-box">
            <div class="brand-name">
                <a href="javascript:;"><span>{{ props.productInfo.brandName }}</span></a>
                <i class="ico-arr"></i>
            </div>
            <h3 class="product-name">{{ props.productInfo.productName }}</h3>
        </div>

        <!-- 가격 정보를 표시하는 부분 -->
        <div class="price-box">
            <!-- 정가가 있을 경우 표시 -->
            <span class="original" v-if="props.productInfo.originalPrice">
                <b>{{ formatPrice(props.productInfo.originalPrice) }}</b>
            </span>
            <!-- 할인된 가격 표시 -->
            <span class="price">
                <b>{{ formatPrice(props.productInfo.discountedPrice) }}</b>
            </span>
            <!-- 할인율이 있을 경우 표시 -->
            <span class="sale" v-if="props.productInfo.discountRate">{{ props.productInfo.discountRate }}%</span>
            <!-- 적립 포인트 정보 표시 -->
            <p class="loyal">Loyalty Points: <em>{{ props.productInfo.loyaltyPoints }}</em> W Points</p>
        </div>

        <!-- 리뷰 정보와 리뷰 작성 버튼을 표시하는 부분 -->
        <div class="review-box">
            <!-- 리뷰 개요 표시, 클릭 시 리뷰 섹션으로 스크롤 이동 -->
            <div class="rating-wrap btn-review" @click="reviewMove">
                <span>Reviews: </span>
                <div class="star-rating">
                    <div class="star" :style="{ width: `${props.productInfo.rating}%` }">star</div>
                </div>
                <em>({{ props.productInfo.reviewCount }})</em>
            </div>
            <!-- 리뷰 작성 버튼 -->
            <button type="button" class="btn-type4 v5" @click="openReviewClick">
                <span>Add Your Review</span>
            </button>
            <!-- 로그인하지 않은 경우 표시되는 경고 팝업 -->
            <ReviewAlert ref="basicPopup" description="You must own this item to write a customer review." checkText="OK" />
            <!-- 리뷰 작성 팝업 -->
            <ReviewPopup ref="reviewPopup" :title="reviewData.title" :contentData="reviewData.contentData"
                :checkText="reviewData.checkText" :productOptions="reviewData.productOptions" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { gsap } from 'gsap'; 
import ReviewAlert from '../../../components/Mo/Popup/BasicPopup.vue';
import ReviewPopup from '../../../components/Mo/Popup/ReviewPopup.vue';

// productInfoData 인터페이스 정의 (제품 정보 타입 지정)
interface productInfoData {
    brandName: string;
    productName: string;
    originalPrice?: number;
    discountedPrice: number;
    discountRate?: number;
    loyaltyPoints: number;
    reviewCount: number;
    rating: number;
}

// Props 정의 (부모 컴포넌트로부터 전달받을 데이터)
const props = defineProps<{ productInfo: productInfoData }>();

// 가격 포맷팅 함수 (달러 형식으로 변환)
const formatPrice = (price: number) => `$${price.toFixed(2)}`;

// 로그인 여부를 관리하는 변수 (로그인 했으면 true, 안했으면 false)
const userLogin = ref(false);

// 팝업 컴포넌트 참조
const basicPopup = ref<InstanceType<typeof ReviewAlert> | null>(null);
const reviewPopup = ref<InstanceType<typeof ReviewPopup> | null>(null);

// 리뷰 작성 팝업에 필요한 데이터 정의
const reviewData = ref({
    title: 'Write a Review',
    contentData: 'Please select your purchased product and write your review.',
    checkText: 'Subject to data protection regulations, I agree to the use of name for account identification and communication purposes.',
    productOptions: [
        { id: 'prdOption1', label: 'Option1, Option2, Option3', selected: false },
        { id: 'prdOption2', label: 'L, Blue, City', selected: false },
        { id: 'prdOption3', label: 'XL, Pink, City', selected: false },
        { id: 'prdOption4', label: 'M, Green, City', selected: false },
        { id: 'prdOption5', label: 'S, Black, City', selected: false }
    ]
});

// 리뷰 섹션으로 스크롤 이동하는 함수
const reviewMove = () => {
    const reviewElement = document.getElementById("reviews");  // 리뷰 섹션 요소를 찾음
    const headerElement = document.querySelector('.header-wrap');  // 헤더 요소를 찾음

    // 리뷰 섹션과 헤더가 존재하는지 확인 후, 스크롤 애니메이션 실행
    if (reviewElement && headerElement) {
        const headerHeight = headerElement.getBoundingClientRect().height;  // 헤더의 높이를 계산
        gsap.to(window, {
            duration: 0.8,
            scrollTo: reviewElement.offsetTop - headerHeight + 1,  // 헤더 높이를 고려하여 스크롤
            ease: 'power2.out'
        });
    } 
};

// 리뷰 작성 버튼 클릭 시 호출되는 함수
const openReviewClick = () => {
    if (!userLogin.value) {
        // 로그인하지 않았을 경우, 경고 팝업 표시
        if (basicPopup.value) {
            basicPopup.value.openPopup();  // ReviewAlert 팝업 열기
        }
    } else {
        // 로그인했을 경우, 리뷰 작성 팝업 표시
        if (reviewPopup.value) {
            reviewPopup.value.openPopup();  // ReviewPopup 팝업 열기
        }
    }
};
</script>

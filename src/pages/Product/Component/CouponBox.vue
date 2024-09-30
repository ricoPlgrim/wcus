<template>
    <div class="coupon-box reset">
        <!-- 쿠폰이 2개 이상일 때는 Swiper 사용 -->
        <swiper v-if="props.coupons.length > 1" :slides-per-view="1.05" :space-between="10" :slides-offset-after="20"
            :speed="1000" :loop="true" :loop-additional-slides="1" :autoplay="autoplayOptions" :modules="modules"
            class="coupon-swiper">
            <!-- 쿠폰 데이터를 슬라이드로 반복하여 표시 -->
            <swiper-slide v-for="(coupon, index) in props.coupons" :key="index">
                <router-link to="/">
                    <div class="code">USE CODE : <strong>{{ coupon.code }}</strong></div>
                    <div class="notice">{{ coupon.notice }}</div>
                </router-link>
            </swiper-slide>
        </swiper>

        <!-- 쿠폰이 1개일 때는 정적인 코드로 표시 -->
        <div v-else class="single-coupon">
            <router-link to="/">
                <div class="code">USE CODE : <strong>{{ props.coupons[0].code }}</strong></div>
                <div class="notice">{{ props.coupons[0].notice }}</div>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'; // Props 정의를 위한 Vue 함수
import { Swiper, SwiperSlide } from 'swiper/vue'; // Swiper 및 SwiperSlide 컴포넌트
import 'swiper/css'; // Swiper 기본 스타일 가져오기
import 'swiper/css/pagination'; // Swiper pagination 스타일 가져오기
import { Autoplay } from 'swiper'; // Swiper의 Autoplay 모듈 가져오기

// 쿠폰 타입 정의 (코드와 공지사항을 포함)
interface Coupon {
    code: string;
    notice: string;
}

// 부모 컴포넌트로부터 전달받는 props 정의 (쿠폰 목록)
const props = defineProps<{ coupons: Coupon[] }>();

// Swiper의 자동 재생 옵션 설정
const autoplayOptions = {
    delay: 2000, // 2초마다 슬라이드 자동 전환
};

// Swiper에서 사용할 모듈 정의
const modules = [Autoplay]; // Autoplay 모듈 사용

</script>

<template>
    <div v-if="isVisible" class="top-banner top-img" id="top-banner" ref="topBannerElement">
        <button type="button" class="btn-close" @click="closeBanner"><i class="ico-close">닫기</i></button>
        <swiper :observer="true" :observe-parents="true" :slides-per-view="1" class="topbanner-swiper"
            :autoplay="autoplayOptions" :speed="500" :modules="modules" effect="fade">
            <swiper-slide v-for="(item, index) in props.tabSlides" :key="index" :style="{ backgroundColor: item.bgColor }">
                <div class="brand-box">
                    <img :src="item.imgSrc" :alt="item.alt" />
                    <div class="text-box" v-html="item.text"></div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template> 

<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Autoplay, EffectFade } from 'swiper';

// Swiper를 위한 자동재생 옵션과 모듈 정의
const autoplayOptions = {
    delay: 3000,  // 3초마다 슬라이드 전환
    disableOnInteraction: false,  // 사용자 상호작용 후에도 자동재생 유지
};

const modules = [Autoplay, EffectFade];  // Swiper에 사용할 모듈 정의

// props 정의
const props = defineProps<{
    tabSlides: Array<{ imgSrc: string; alt: string; text: string; link: string, bgColor: string }>;  // 탭 슬라이드 배열
}>();

// emit 함수 정의
const emit = defineEmits<{
    (e: 'updateHeight', height: number): void;  // 탑 배너 높이값을 부모 컴포넌트로 전달
    (e: 'updateVisibility', isVisible: boolean): void;  // 탑 배너가 닫혔는지 여부를 부모 컴포넌트로 전달
    (e: 'passTopBannerElement', el: HTMLElement | null): void; // 부모에게 ref 전달  
}>();

// 배너 요소에 대한 참조
const topBannerElement = ref<HTMLElement | null>(null);

// 배너 가시성 상태 관리
const isVisible = ref(true);

// 배너를 닫는 함수
const closeBanner = () => {
    isVisible.value = false;  // 배너 가시성을 false로 설정하여 배너를 닫음
    emit('updateVisibility', isVisible.value);  // 부모 컴포넌트에 배너가 닫혔음을 알림
    // 배너가 닫힐 때 부모 컴포넌트의 높이 값을 null로 초기화
    emit('updateHeight', 0);  // 배너 높이를 0으로 전달
        // 현재 시간을 기준으로 24시간 뒤의 시간을 계산
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    const bannerData = {
        status: 'closed',
        expiration: expirationTime,
    };

    // 로컬 스토리지에 배너 상태와 만료 시간 저장
    localStorage.setItem('topbanner', JSON.stringify(bannerData));

};

// 배너가 렌더링된 후 배너 높이값을 가져와 부모 컴포넌트로 전달
onMounted(() => {
    if (topBannerElement.value) {
        const bannerHeight = topBannerElement.value.clientHeight;  // 배너 높이값 계산
        emit('updateHeight', bannerHeight);  // 계산된 높이값을 부모 컴포넌트로 전달

        // 부모 컴포넌트에 topBannerElement 전달
        emit('passTopBannerElement', topBannerElement.value);
    }

    const bannerData = localStorage.getItem('topbanner');
    if (bannerData) {
        const parsedData = JSON.parse(bannerData);
        const currentTime = new Date().getTime();

        // 만료 시간이 지나지 않았으면 배너를 닫은 상태로 유지
        if (parsedData.status === 'closed' && parsedData.expiration > currentTime) {
            isVisible.value = false; // 배너가 닫힌 상태라면 가시성을 false로 설정
        } else {
            // 만료 시간이 지났다면 로컬 스토리지에서 값을 제거
            localStorage.removeItem('topbanner');
        }
    }
});

</script>

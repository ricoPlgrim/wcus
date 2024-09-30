<template>
    <section>
        <div class="style-wrap">
              <!-- 스타일 섹션의 타이틀을 표시하는 TitleWrap 컴포넌트 -->
            <TitleWrap title="Style" />
            <div class="inner-box">
                <!-- 스타일 스와이퍼 컴포넌트를 사용하여 슬라이드를 표시 -->
                <StyleSwiper :slides="slides" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TitleWrap from '../Main/Component/TitleBox.vue'
import StyleSwiper from '../../Swiper/StyleSwiper.vue'
import DemoImg from '../../../../assets/mo/images/temp/@temp_style.png'

// 슬라이드 데이터를 정의
const slides = ref([
    {
        imgSrc: DemoImg,  // 슬라이드에 표시될 이미지 소스
        alt: 'visual',  // 이미지 대체 텍스트
        title: 'LENINA REIMAGINED<br/>LIVING IT ITEM',  // 슬라이드 제목
        subtitle: 'OSOI 2.0.2 reinterprets minimalism and military to aim natural silhouette.',  // 슬라이드 부제목
        link: 'https://www.naver.com',  // 버튼 클릭 시 이동할 링크
        buttonText: 'SHOP NOW'  // 버튼에 표시될 텍스트
    },
    {
        imgSrc: DemoImg,
        alt: 'visual',
        title: '22222LENINA REIMAGINED<br/>LIVING IT ITEM2',
        subtitle: 'OSOI 2.0.2 reinterprets minimalism and military to aim natural silhouette.',
        link: '#',
        buttonText: 'SHOP NOW'
    },
    {
        imgSrc: DemoImg,
        alt: 'visual',
        title: '22222LENINA REIMAGINED<br/>LIVING IT ITEM3',
        subtitle: 'OSOI 2.0.2 reinterprets minimalism and military to aim natural silhouette.',
        link: '#',
        buttonText: 'SHOP NOW'
    },
    {
        imgSrc: DemoImg,
        alt: 'visual',
        title: '22222LENINA REIMAGINED<br/>LIVING IT ITEM4',
        subtitle: 'OSOI 2.0.2 reinterprets minimalism and military to aim natural silhouette.',
        link: '#',
        buttonText: 'SHOP NOW'
    }
]);
</script>


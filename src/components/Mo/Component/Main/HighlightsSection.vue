<template>
    <section>
        <div class="highlights-wrap">
            <!-- 타이틀과 'View More' 링크를 포함한 TitleWrap 컴포넌트 -->
            <TitleWrap title="The Highlights"  linkHref="#" linkText="View More" />
            <div class="inner-box">
                  <!-- BasicSwiper 컴포넌트로 하이라이트 항목들을 스와이프 가능하게 표시 -->
                <BasicSwiper :slides="HighlightsItems" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import TitleWrap from '../Main/Component/TitleBox.vue';
import BasicSwiper from '../../../../components/Mo/Swiper/BasicSwiper.vue';
import emptyImg from '@/assets/mo/images/visual/life_empty.png';
import highlightsImg from '@/assets/mo/images//temp/@temp_highlights.png';


// 하이라이트 항목 정의
const HighlightsItems = [
    {
        type: 'video',  // 항목 타입: 비디오
        imgSrc: emptyImg,  // 비디오가 로드되지 않을 경우 대체 이미지
        alt: 'visual',  // 이미지의 대체 텍스트
        videoSrc: 'https://player.vimeo.com/video/249908774',  // 비디오 소스 URL
        title: 'V&A BEAUTY',  // 항목 제목
        caption: 'Awaken Your Artistic Beauty. V&A Beauty is a contemporary art and beauty brand that contains the Awaken Your Artistic Beauty. V&A Beauty is a contemporary art and beauty brand that contains the',  // 항목 설명
        link: '#',  // 링크 주소
        buttonText: 'SHOP V&A',  // 버튼에 표시될 텍스트
    },
    {
        type: 'image',  // 항목 타입: 이미지
        imgSrc: highlightsImg,  // 이미지 소스
        alt: 'V&A BEAUTY',  // 이미지의 대체 텍스트
        title: 'V&A BEAUTY2',  // 항목 제목
        caption: 'Awaken Your Artistic Beauty. V&A Beauty is a contemporary art and beauty brand that contains the Awaken Your Artistic Beauty. V&A Beauty is a contemporary art and beauty brand that contains the',  // 항목 설명
        link: '#',  // 링크 주소
        buttonText: 'SHOP V&A',  // 버튼에 표시될 텍스트
    }, 
    {
        type: 'image',  // 항목 타입: 이미지
        imgSrc: highlightsImg,  // 이미지 소스
        alt: 'V&A BEAUTY',  // 이미지의 대체 텍스트
        title: 'V&A BEAUTY3',  // 항목 제목
        caption: 'Awaken Your Artistic Beauty. V&A Beauty is a contemporary art and beauty brand that contains the Awaken Your Artistic Beauty. V&A Beauty is a contemporary art and beauty brand that contains the',  // 항목 설명
        link: '#',  // 링크 주소
        buttonText: 'SHOP V&A',  // 버튼에 표시될 텍스트
    },
];
</script>
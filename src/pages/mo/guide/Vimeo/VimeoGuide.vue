
<template>
    <AsideNav />
    <div class="page-guide-content">
		<h2 class="page-guide-title">VIMEO</h2>

		<h3 class="page-guide-title2">basic</h3>
		<div class="page-guide-box">
            <div class="video-wrap">
                <div class="video-area normal" data-index="0">
                    <iframe src="https://player.vimeo.com/video/249908774" frameborder="0" allow="autoplay" data-ready="true" width="640" height="360" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </div>
            </div>
		</div>

		<h3 class="page-guide-title2">popup</h3>
		<div class="page-guide-box">
            <button @click="openPopup('videoPopup')" class="btn-type">video popup</button>
            <VideoPopupLayer ref="videoPopup"  videoUrl="https://player.vimeo.com/video/249908774" closeText="CLOSE" />
        </div>

        
		<h3 class="page-guide-title2">swiper</h3> 
        <div class="page-guide-box">
            <VideoSwiper :slides="eventSlides"  className="ldiscover-swiper" />
        </div>
	</div>


  </template>
    
  <script setup lang="ts">
  import { ref } from 'vue'; 
  import AsideNav from '../Gnb/AsideNav.vue';
  import VideoPopupLayer  from '../../../../components/Mo/Popup/VideoPopup.vue';
  import VideoSwiper  from '../../../../components/Mo/Swiper/VideoSwiper.vue';

  import TempImg from '../../../../assets/mo/images/temp/@temp_banner3.png';

// 이벤트 슬라이드 데이터 정의
interface VisualItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    link: string;
}

const eventSlides = ref<VisualItem[]>([
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'video',
        src: 'https://player.vimeo.com/video/249908774',
        link: '/',
    },
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    }
]);

const videoPopup = ref<InstanceType<typeof VideoPopupLayer> | null>(null);

// 팝업 열기 함수
const openPopup = (popupName: string) => {
  if (popupName === 'videoPopup') {
        if (videoPopup.value) {
            videoPopup.value.openPopup();   //size가이드 팝업 
        }
    }
};
  </script>
 
<template>
    <div class="scr-item brand-video">
        <div class="video-wrap">
            <div class="video-area">
                <iframe 
                    :src="`${props.videoData.videoSrc}?controls=0&autoplay=1&loop=1&muted=1`"
                    frameborder="0"
                    allow="autoplay; fullscreen"
                    width="100%"
                    height="100%"
                    webkitallowfullscreen
                    mozallowfullscreen
                    allowfullscreen
                    @load="onVideoLoad"
                ></iframe>
                <div v-if="!isVideoLoaded" class="loading-spinner">
                    <Loading />
                    <!-- 로딩 스피너 혹은 로딩 메시지를 여기에 넣을 수 있습니다 -->
                    <!-- Loading video... -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Loading from '../../components/Mo/Loading/LoadingComponent.vue'
// props 정의
const props = defineProps<{
    videoData: {
        videoSrc: string;
    };
}>();

// 비디오 로딩 상태 관리
const isVideoLoaded = ref(false);

// 비디오가 로드되면 호출되는 함수
const onVideoLoad = () => {
    setTimeout( () =>{
        isVideoLoaded.value = true;
    },1000)
};
</script>

<style scoped lang="scss">
.loading-spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8); 
    .loading-wrap{
        align-items: center;
    }
}
</style>

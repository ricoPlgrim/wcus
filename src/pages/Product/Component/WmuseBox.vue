<template>
    <div class="wmuse-box">
        <div class="title-wrap">
            <h4 class="title-type4">wMUSE</h4>

        </div>
        <div class="muse-box">
            <!-- 로딩 중일 때 표시되는 로딩 인디케이터 -->
            <Loading v-if="loading" />
            <!-- 동적으로 콘텐츠가 여기에 추가됨 -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Loading from '../../../components/Mo/Loading/LoadingComponent.vue';

// 로딩 상태를 관리하는 반응형 변수
const loading = ref(true);

// 컴포넌트가 마운트될 때 실행되는 로직
onMounted(() => {
    const script = document.createElement('script');
    script.src = 'https://app.addsauce.com/widgets/widget_loader/78c4bd1e-70c3-fb99-8bc5-a98328db8eeb/sauce_homepage.js';
    script.async = true;  // 비동기 로딩 설정
    script.className = 'snapppt-widget';  // 스크립트에 클래스 이름 설정

    // 스크립트가 로드된 후 로딩 상태를 false로 설정
    script.onload = () => {
        loading.value = false;
    };

    // 'muse-box' 클래스를 가진 요소를 찾고 스크립트를 자식으로 추가
    const museBox = document.querySelector('.muse-box');
    if (museBox) {
        museBox.appendChild(script);
    } else {
        console.error("muse-box 클래스가 있는 요소를 찾을 수 없습니다.");
    }
});
</script>
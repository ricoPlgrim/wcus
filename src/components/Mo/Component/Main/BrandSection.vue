<template>
    <section>
        <!-- 타이틀과 'View More' 링크를 포함하는 TitleWrap 컴포넌트 -->
        <TitleWrap title="TOP Brands"  linkHref="#" linkText="View More" />
        <!-- 브랜드 스와이퍼를 감싸는 랩 -->
        <div class="brand-wrap">
             <!-- CornerSwiper 컴포넌트, 코너 스와이퍼 기능을 사용하지 않음 (isCornerSwiper 속성) -->
            <conerSwiperComponent :isCornerSwiper="false" />
        </div>
    </section>
</template>

<script setup lang="ts">
import TitleWrap from '../Main/Component/TitleBox.vue'; // 타이틀과 링크를 표시하는 컴포넌트
import conerSwiperComponent from '../../../../components/Mo/Swiper/CornerIndex.vue';   // 브랜드 스와이퍼 컴포넌트
 
</script>
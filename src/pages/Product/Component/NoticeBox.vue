<template>
    <div class="notice-box">
        <div class="title-wrap">
            <!-- Notice 타이틀 표시 -->
            <h4 class="title-type4">Notice</h4>
        </div>
        <!-- props로 전달된 공지사항 목록을 반복하여 렌더링 -->
        <div v-for="(notice, index) in props.notices" :key="index" class="notice-cont">
            <!-- 공지사항의 텍스트 항목들을 리스트로 출력 -->
            <ul class="list-type">
                <li v-for="(item, i) in notice.items" :key="i">
                    <!-- 공지사항 내용을 <pre> 태그로 감싸서 그대로 출력 -->
                    <pre>{{ item }}</pre>
                </li>
            </ul>
            <!-- 공지사항 이미지 출력 -->
            <div class="img-box">
                <img :src="notice.imageSrc" alt="Notice Image" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// 공지사항 항목의 데이터 구조 정의
interface NoticeItem {
    items: string[];  // 공지사항의 텍스트 항목 배열
    imageSrc: string; // 공지사항의 이미지 URL
}

// 부모 컴포넌트로부터 notices 데이터를 props로 받음
const props = defineProps<{
    notices: NoticeItem[];  // 공지사항 목록의 배열 형태로 props 받기
}>();
</script>

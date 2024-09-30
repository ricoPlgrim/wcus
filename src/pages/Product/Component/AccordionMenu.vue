<template>
    <!-- 아코디언 리스트를 감싸는 박스 -->
    <div class="info-box">
        <div class="accordion-list">
            <!-- 각 아코디언 항목을 반복적으로 출력 -->
            <dl v-for="(item, index) in localItems" :key="index" class="accordion-item" :class="{ active: item.isActive }">
                <dt>
                    <!-- 아코디언 버튼, 클릭 시 토글 -->
                    <button class="js_accordion" @click="toggleAccordion(index)">
                        {{ item.title }}
                    </button>
                </dt>
                <dd :class="{ isOpen: item.isActive }" style="max-height: 0;">
                    <!-- 아코디언 내용, HTML로 렌더링됨 -->
                    <div v-html="item.content" class="items"></div>
                   
                </dd>
            </dl>
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue'; // Vue 컴포넌트 훅 import
import { useAccordion } from '../../../utils/useAccordion'; // 커스텀 훅 사용

// AccordionItem 인터페이스 정의
interface AccordionItem {
    title: string;  // 아코디언 제목
    content: string; // 아코디언 내용 (HTML 형태로 전달)
    isActive: boolean; // 활성화 여부
}

// Props로 아코디언 항목 리스트를 받음
const props = defineProps<{
    items: AccordionItem[]; // 아코디언 항목 배열
}>();

// useAccordion 훅을 사용하여 아코디언 상태와 로직을 관리
const { localItems, toggleAccordion } = useAccordion(props.items);

// 컴포넌트가 마운트된 후, 활성화된 아코디언 항목의 높이를 설정
onMounted(() => {
    // DOM 업데이트가 완료된 후 실행
    nextTick(() => {
        // 각 아코디언 항목에 대해 초기 높이를 설정
        localItems.value.forEach((item, index) => {
            const element = document.querySelectorAll('.accordion-item')[index]?.querySelector('dd') as HTMLElement; // 아코디언 항목의 dd 요소를 찾음
            const itemsElement = element.querySelector('.items') as HTMLElement; // dd 내의 items 요소를 찾음
            if (element && itemsElement) {
                const totalHeight = itemsElement.scrollHeight; // 내용의 전체 높이를 계산

                if (item.isActive) {
                    element.style.maxHeight = `${totalHeight}px`; // 활성화된 항목은 전체 높이를 설정
                } else {
                    element.style.maxHeight = '0'; // 비활성화된 항목은 높이를 0으로 설정
                }
            }
        });
    });
});
</script>

// src/composables/useAccordion.ts
import { ref, watch, nextTick } from 'vue';

interface AccordionItem {
    title: string;
    content: string;
    isActive: boolean;
}

export function useAccordion(items: AccordionItem[]) {
    const localItems = ref<AccordionItem[]>([...items]);

    // props가 업데이트될 경우 localItems에 동기화
    watch(
        () => items,
        (newItems) => {
            localItems.value = [...newItems];
        }
    );

    // 아코디언 항목 토글 함수
    const toggleAccordion = (index: number) => {
        localItems.value.forEach((item, i) => {
            item.isActive = i === index ? !item.isActive : false;
        });

        // 아코디언 열림 상태가 변경된 후에 높이를 다시 계산
        nextTick(() => {
            updateHeights();
        });
    };

    // 활성화된 항목의 높이를 계산하는 함수
    const updateHeights = () => {
        localItems.value.forEach((item, index) => {
            const element = document.querySelectorAll('.accordion-item')[index]?.querySelector('dd') as HTMLElement;
            const itemsElement = element.querySelector('.items') as HTMLElement;
            if (element && itemsElement) {
                const totalHeight = itemsElement.scrollHeight;

                if (item.isActive) {
                    element.style.maxHeight = `${totalHeight}px`;
                } else {
                    element.style.maxHeight = '0';
                }
            }
        });
    };

    return {
        localItems,
        toggleAccordion,
    };
}

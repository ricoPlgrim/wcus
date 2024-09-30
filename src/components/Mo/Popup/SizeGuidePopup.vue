<template>
    <div :class="['pop-full', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-size">
        <div class="dim"></div>
        <div class="pop-wrap">
            <div class="pop-title2">
                <h3 class="title-type">Size Guide</h3>
                <button class="pop-close" @click="closePopup">
                    <i class="ico-close"></i>
                    <span class="hidden">Close</span>
                </button>
            </div>
            <div class="pop-content">
                <div class="tab-wrap">
                    <ul class="tab-type3 js_tab" ref="tabList">
                        <!-- 탭 버튼 -->
                        <li v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === tab.id }">
                            <button @click="selectTab(tab.id, index)">{{ tab.title }}</button>
                        </li>
                    </ul>

                    <!-- 탭 콘텐츠 -->
                    <div v-for="(tabContent, index) in tabContents" :key="index" v-show="activeTab === tabContent.id"
                        class="tab-content" :style="{ display: activeTab === tabContent.id ? 'block' : 'none' }">
                        <div class="tbl-wrap">
                            <table class="tbl-type2">
                                <caption class="table-caption">{{ tabContent.caption }}</caption>
                                <thead>
                                    <tr>
                                        <th v-for="(header, hIndex) in tabContent.headers" :key="hIndex" scope="col"
                                            class="col">{{ header }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, rIndex) in tabContent.rows" :key="rIndex">
                                        <td v-for="(cell, cIndex) in row" :key="cIndex" class="col">{{ cell }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Actual Size 정보 -->
                <div class="size-box">
                    <h5 class="title-type4">Actual Size</h5>
                    <div class="text-box">
                        <div v-html="actualSize"></div>
                    </div>
                </div>

                <!-- 주의 사항 -->
                <div class="size-box">
                    <h5 class="title-type4">Please Note</h5>
                    <div class="text-box">
                        {{ noteText }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, watch, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';

// 상위에서 전달받을 props 정의
const props = defineProps<{
    tabs: Array<{ title: string; id: string; active: boolean }>,
    tabContents: Array<{ id: string; caption: string; headers: string[]; rows: string[][] }>,
    actualSize: string,
    noteText: string
}>();

// 팝업 상태 관리
const isVisible = ref(false);

// 현재 활성화된 탭 상태 관리
const activeTab = ref(props.tabs.find(tab => tab.active)?.id || props.tabs[0]?.id);
const tabList = ref<HTMLElement | null>(null);
const tabItems = ref<HTMLElement[]>([]);

const selectTab = (tabId: string, index: number) => {
    activeTab.value = tabId;

    // GSAP로 선택된 탭을 중앙으로 스크롤
    nextTick(() => {
        if (tabItems.value.length && tabItems.value[index] && tabList.value) {
            const tabItem = tabItems.value[index];
            const tabListBounds = tabList.value.getBoundingClientRect();
            const tabItemBounds = tabItem.getBoundingClientRect();
            const offset = tabItemBounds.left - tabListBounds.left - (tabListBounds.width / 2 - tabItemBounds.width / 2);

            gsap.to(tabList.value, {
                scrollLeft: tabList.value.scrollLeft + offset,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    });
};

// props.tabs 변화 감지
watch(
    () => props.tabs,
    (newTabs) => {
        activeTab.value = newTabs.find(tab => tab.active)?.id || newTabs[0]?.id;
    },
    { immediate: true } // 처음에 컴포넌트가 마운트될 때도 실행
);

// 팝업 열림/닫힘 시 스크롤 방지 처리
watch(isVisible, (newVal) => {
	document.body.style.overflow = newVal ? 'hidden' : '';
});

// 팝업 열기 메서드
const openPopup = () => {
    isVisible.value = true;
    // 팝업 열릴 때 기본 활성화된 탭을 설정
    activeTab.value = props.tabs.find(tab => tab.active)?.id || props.tabs[0]?.id;

    // nextTick으로 DOM 업데이트 후 탭 리스트 다시 계산
    nextTick(() => {
        if (tabList.value) {
            tabItems.value = Array.from(tabList.value.children) as HTMLElement[];
        }
    });
};

// 팝업 닫기 메서드
const closePopup = () => {
    isVisible.value = false;
};

// 컴포넌트 마운트 후 탭 리스트 초기화
onMounted(() => {
    nextTick(() => {
        if (tabList.value) {
            tabItems.value = Array.from(tabList.value.children) as HTMLElement[];
        }
    });
});

defineExpose({ openPopup, closePopup });
</script>

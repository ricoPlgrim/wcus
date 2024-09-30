<template>
    <section>
        <div class="ranking-wrap">
              <!-- 랭킹 섹션의 타이틀을 표시하는 TitleWrap 컴포넌트 -->
            <TitleWrap title="Ranking" />
            <div class="tab-wrap inner-box">
                <ul class="tab-type2">
                    <li v-for="tab in props.RankingData" :key="tab.id" :class="{ active: activeTab === tab.id }">
                        <a :href="'#' + tab.id" @click.prevent="setActiveTab(tab.id)">{{ tab.title }}</a>
                    </li>
                </ul>
                <div v-for="tab in props.RankingData" :key="tab.id" :id="tab.id" class="tab-content"
                    :class="{ active: activeTab === tab.id }">
                    <ul class="ranking-list">
                        <li v-for="item in tab.items" :key="item.name">
                            <a :href="item.link">{{ item.name }}</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import TitleWrap from '../Main/Component/TitleBox.vue';

// 부모 컴포넌트로부터 전달받은 props를 정의
const props = defineProps<{
    RankingData: Array<{
        id: string;
        title: string;
        items: Array<{
            name: string;
            link: string;
        }>;
    }>;
}>();

// 현재 활성화된 탭의 ID를 관리하는 ref
const activeTab = ref(props.RankingData[0].id);  // 초기값은 첫 번째 탭의 ID로 설정
 
// 탭 클릭 시 호출되는 함수, 클릭된 탭의 ID를 activeTab에 저장
const setActiveTab = (tabId: string) => {
    activeTab.value = tabId;
};
</script>


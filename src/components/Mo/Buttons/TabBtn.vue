<template>
  <!-- 탭을 표시하는 부분, 클래스는 props로 전달된 tabClass와 'js_tab'을 적용 -->
  <ul :class="[tabClass, 'js_tab']">
    <!-- tabs 배열을 반복하여 각 탭을 렌더링, 현재 활성화된 탭은 active 클래스를 추가 -->
    <li v-for="(tab, index) in tabs" :key="index" :class="{ active: index === currentActiveIndex }">
      <!-- 탭 클릭 시 setActive 함수를 호출하여 활성화 상태 변경 -->
      <a :href="tab.href" :data-text="tab.dataText || null" @click.prevent="setActive(index)">
        <!-- 탭에 count 값이 있을 경우 표시 -->
        <span v-if="tab.count">{{ tab.text }}<em class="count">({{ tab.count }})</em></span>
        <!-- count 값이 없을 경우 일반 텍스트만 표시 -->
        <span v-else>{{ tab.text }}</span>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

// 탭 항목의 데이터 구조 정의
interface Tab {
  href: string;      // 탭의 링크
  text: string;      // 탭에 표시될 텍스트
  dataText?: string; // data-text 속성 (옵션)
  count?: number;    // 탭에 표시될 카운트 값 (옵션)
}

// props 정의 (부모 컴포넌트로부터 탭 데이터와 클래스, 활성화된 탭의 인덱스 값 수신)
const props = defineProps<{
  tabs: Tab[];        // 탭 배열
  tabClass?: string;  // 추가적인 탭 클래스 (옵션)
  modelValue?: number; // 현재 활성화된 탭의 인덱스 (v-model 역할)
}>();

// 내부 상태 관리 변수로 현재 활성화된 탭의 인덱스를 관리
const currentActiveIndex = ref(props.modelValue || 0); // modelValue로 초기화

// 이벤트를 정의하여 부모 컴포넌트로 활성화된 탭 인덱스를 전달
const emit = defineEmits(['update:activeIndex']);

// 탭 클릭 시 활성화 상태 변경 함수
const setActive = (index: number) => {
  currentActiveIndex.value = index; // 내부 상태 업데이트
  emit('update:activeIndex', index); // 부모 컴포넌트로 업데이트 알림
};

// modelValue가 변경될 때 currentActiveIndex를 업데이트
watch(() => props.modelValue, (newValue) => {
  if (newValue !== undefined && newValue !== currentActiveIndex.value) {
    currentActiveIndex.value = newValue;
  }
});

// props로 전달된 tabClass가 없을 경우 기본값으로 'tab-type'을 사용
const tabClass = props.tabClass || 'tab-type';
</script>

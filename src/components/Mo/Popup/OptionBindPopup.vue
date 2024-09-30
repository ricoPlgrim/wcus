<template>
    <div :class="['pop-select', { 'is-visible': isVisible, 'active': isActive }]" v-if="isVisible" id="pop-select">
        <div class="dim" @click="closePopup"></div>
        <div class="pop-wrap">
            <div class="pop-bar"></div>
            <div class="pop-content option-wrap">
                <div class="option-title">
                    <h3 class="title-type3">{{ title }}</h3>
                </div>
                <div class="option-inner">
                    <div class="form-wrap">
                        <div class="form-item" v-for="(label, key) in options" :key="key">
                            <div :class="['chk-box', { selected: selectedOption === key }]">
                                <input type="radio" :id="key" name="option" :value="key"  @change="handleOptionChange" v-model="selectedOption" />
                                <label class="checkbox" :for="key"></label>
                                <label :for="key">{{ label }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineEmits } from 'vue';

// 부모 컴포넌트에서 전달받을 props 정의
const props = defineProps({
  options: {
    type: Object as () => Record<string, string>, // 옵션 리스트를 객체 형태로 받음
    required: true // 필수 속성으로 설정
  },
  title: {
    type: String,
    default: 'Option' // 기본 제목 설정
  },
  defaultOption: {
    type: String,
    default: '' // 기본 선택 옵션 설정
  }
});

// 팝업의 상태 관리
const isVisible = ref(false); // 팝업의 표시 여부
const isActive = ref(false); // 팝업 활성화 여부 (애니메이션 용도)
const selectedOption = ref<string>(props.defaultOption); // 선택된 옵션 저장

// 부모 컴포넌트에 선택된 옵션을 알리기 위한 이벤트 정의
const emit = defineEmits(['update:selectedOption']);

// 팝업을 열고, 애니메이션을 위한 약간의 지연시간을 줌
const openPopup = () => {
    isVisible.value = true; // 팝업을 표시
    setTimeout(() => {
        isActive.value = true; // 팝업 활성화
    }, 100);
};

// 팝업을 닫고, 애니메이션 후에 팝업을 숨김
const closePopup = () => {
    isActive.value = false; // 팝업 비활성화
    setTimeout(() => {
        isVisible.value = false; // 팝업 숨기기
    }, 300);
};

// 옵션 변경 시 호출되는 함수, 부모 컴포넌트에 선택된 옵션을 알리고 팝업을 닫음
const handleOptionChange = () => {
    emit('update:selectedOption', selectedOption.value); // 부모 컴포넌트에 선택된 옵션 알림
    closePopup(); // 팝업 닫기
};

// 부모 컴포넌트에서 팝업을 열고 닫을 수 있도록 메서드 노출
defineExpose({ openPopup, closePopup });
</script>

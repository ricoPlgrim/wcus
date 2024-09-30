<template>
    <div :class="['pop-select', { 'is-visible': isVisible, 'active': isActive }]" v-if="isVisible" id="pop-select">
        <div class="dim" @click="closePopup"></div>
        <div class="pop-wrap">
            <div class="pop-bar"></div>
            <div class="pop-content option-wrap">
                <div class="option-title">
                    <h3 class="title-type3">Category</h3>
                </div>
                <div class="option-inner">
                    <div class="form-wrap">
                        <div class="form-item" v-for="(label, key) in props.depthOptions" :key="key">
                            <div :class="['chk-box', { selected: checkedOptions[key] }]">
                                <input type="radio" :id="key" name="option" :value="key" v-model="selectedOption" @change="handleOptionChange" />
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
import { ref, watch, defineExpose, defineEmits, defineProps } from 'vue';

// props 정의
const props = defineProps<{
    depthOptions: Record<string, string>;  // Depth-01 또는 Depth-02 텍스트를 받아올 props
}>();


const isVisible = ref(false);
const isActive = ref(false);
const selectedOption = ref<string | null>(null);  // 선택된 옵션
const checkedOptions = ref<Record<string, boolean>>({});  // 선택된 옵션 상태

const openPopup = () => {
    isVisible.value = true;
    setTimeout(() => {
        isActive.value = true;
    }, 100);
};

const closePopup = () => {
    isActive.value = false;
    setTimeout(() => {
        isVisible.value = false;
    }, 300);
};

const emit = defineEmits(['update:selectedOption']);

const handleOptionChange = () => {
    // 선택된 옵션의 key를 가져옵니다
    const selectedKey = selectedOption.value;
    
    // 선택된 key가 null이 아닌 경우에만 처리합니다
    if (selectedKey !== null) {
        // 선택된 key를 기반으로 label을 찾습니다
        const selectedLabel = props.depthOptions[selectedKey];
        
        // checkedOptions를 업데이트합니다
        for (const key in checkedOptions.value) {
            if (Object.prototype.hasOwnProperty.call(checkedOptions.value, key)) {
                checkedOptions.value[key] = key === selectedKey;
            }
        }
        
        // 이벤트를 통해 label을 부모로 전달합니다
        emit('update:selectedOption', selectedLabel);

    }

    closePopup();
};

watch(isVisible, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});


defineExpose({ openPopup, closePopup });
</script>

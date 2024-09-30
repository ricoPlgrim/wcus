<template>
    <div :class="['pop-select', { 'is-visible': isVisible, 'active': isActive }]" v-if="isVisible" id="pop-select">
        <div class="dim" @click="closePopup"></div>
        <div class="pop-wrap">
            <div class="pop-bar"></div>
            <div class="pop-content option-wrap">
                <div class="option-title">
                    <h3 class="title-type3">Option</h3>
                </div>
                <div class="option-inner">
                    <div class="form-wrap">
                        <div class="form-item" v-for="(label, key) in options" :key="key">
                            <div :class="['chk-box', { selected: checkedOptions[key], disabled: isDisabled(key) }]">
                                <input type="radio" :id="key" name="option" :value="key" v-model="selectedOption"
                                    @change="handleOptionChange" :disabled="isDisabled(key)" />
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
import { ref, watch, defineExpose, defineEmits } from 'vue';

type OptionKey = 'new' | 'best' | 'low_to_high' | 'high_to_low' | 'discount';

const isVisible = ref(false);
const isActive = ref(false);
const selectedOption = ref<OptionKey>('new');
const checkedOptions = ref<Record<OptionKey, boolean>>({
    new: true,
    best: false,
    low_to_high: false,
    high_to_low: false,
    discount: false,
});

const options: Record<OptionKey, string> = {
    new: "What’s New",
    best: "Best Sellers",
    low_to_high: "Price : Low to High",
    high_to_low: "Price : High to Low",
    discount: "Discount : High to Low",
};

const isDisabled = (key: OptionKey) => key === 'discount';

const openPopup = () => {
    isVisible.value = true;
    setTimeout(() => {
        isActive.value = true;
    }, 100); // 100ms 뒤에 active 클래스 적용
};

const closePopup = () => {
    isActive.value = false;
    setTimeout(() => {
        isVisible.value = false;
    }, 300); // 애니메이션 시간 고려하여 100ms 뒤에 isVisible 변경
};

const emit = defineEmits(['update:selectedOption']);

const handleOptionChange = () => {
    for (const key in checkedOptions.value) {
        if (Object.prototype.hasOwnProperty.call(checkedOptions.value, key)) {
            checkedOptions.value[key as OptionKey] = key === selectedOption.value;
        }
    }
    emit('update:selectedOption', selectedOption.value);
    closePopup();
};

watch(isVisible, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});

defineExpose({ openPopup, closePopup });
</script>
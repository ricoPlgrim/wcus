<template>
    <div class="tooltip-wrap" ref="tooltipWrap">
        <template v-if="props.tooltipSub && (props.tooltipSubText && props.tooltipSubText.length > 0)">
            <div class="tooltip-btn" @click="toggleTooltip">
                <p class="tooltip-text">
                    {{ props.btnText }}
                    <span class="tooltip-btn"><i class="ico-info"></i></span>
                    {{ props.tooltipSubText }}
                </p>
                <div class="tooltip-box" :class="{ active: isTooltipVisible }">
                    {{ props.tooltipContents }}
                </div>
            </div>
        </template>

        <template v-else>
            <div class="tooltip-btn" @click="toggleTooltip">
                {{ props.btnText }} <i class="ico-info"></i>
            </div>
            <div class="tooltip-box" :class="{ active: isTooltipVisible }">
                {{ props.tooltipContents }}
            </div>
        </template>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
    btnText: string;
    tooltipContents: string;
    tooltipSub: boolean;
    tooltipSubText?: string;
}>();

const isTooltipVisible = ref(false);
const tooltipWrap = ref<HTMLElement | null>(null);

const toggleTooltip = () => {
    isTooltipVisible.value = !isTooltipVisible.value;
};

const handleClickOutside = (event: MouseEvent) => {
    if (tooltipWrap.value && !tooltipWrap.value.contains(event.target as Node)) {
        isTooltipVisible.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss"></style>

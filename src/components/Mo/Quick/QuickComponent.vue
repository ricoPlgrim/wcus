<template>
  <div :class="[`quick-wrap`, props.customClass]" id="quick" ref="quickElement">
    <button type="button" class="btn-top" ref="scrollBtnElement" @click="scrollToTop">TOP</button>
    <button type="button" class="btn-chat">CHAT</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useScroll } from '../../../utils/useScroll';

// Define props
const props = defineProps<{
  customClass?: string,
}>();

gsap.registerPlugin(ScrollToPlugin);

const quickElement = ref<HTMLElement | null>(null);
const scrollBtnElement = ref<HTMLElement | null>(null);

const onScrollDown = () => {
  if (quickElement.value) {
    quickElement.value.classList.add('down');
  }
};

const onScrollUp = () => {
  if (quickElement.value) {
    quickElement.value.classList.remove('down');
  }
};

const onScrollBtnShow = () => {
  if (scrollBtnElement.value) {
    scrollBtnElement.value.classList.add('active');
  }
};

const onScrollBtnHide = () => {
  if (scrollBtnElement.value) {
    scrollBtnElement.value.classList.remove('active');
  }
};


useScroll({
  onScrollDown,
  onScrollUp,
  onScrollBtnShow,
  onScrollBtnHide,   
});


const scrollToTop = () => {
  gsap.to(window, { scrollTo: { y: 0, autoKill: true }, duration: 0.5 });
};
</script>


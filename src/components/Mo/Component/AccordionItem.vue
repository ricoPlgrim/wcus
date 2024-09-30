<template>
  <dl :class="['accordion-item', { active: visible }]">
    <dt>
      <button class="js_accordion" @click="toggle">
        <p>{{ props.title }}</p>
      </button>
    </dt>
    <transition @enter="enter" @leave="leave">
      <dd v-show="visible" :class="{ active: visible }" ref="content">
        <slot></slot>
      </dd>
    </transition>
  </dl>
</template>

<script setup lang="ts">
import { inject, ref, computed, onMounted } from 'vue';
import { gsap, Power0 } from 'gsap';

interface AccordionContext {
  count: number;
  active: number | null;
}

// Props 정의
const props = defineProps<{
  title: string;
}>();

// Accordion 컨텍스트 주입
const Accordion = inject<AccordionContext>('Accordion');

if (!Accordion) {
  throw new Error('Accordion context not provided');
}

const index = ref<number | null>(null);
const content = ref<Element | null>(null);

const visible = computed(() => {
  return index.value === Accordion.active;
});

const toggle = () => {
  if (visible.value) {
    Accordion.active = null;
  } else {
    Accordion.active = index.value;
  }
};


const enter = (el: Element, done: () => void) => {
  gsap.fromTo(el,
    { height: 0, opacity: 0 },
    { height: el.scrollHeight, opacity: 1, margin:"1.25rem 0",  duration: 0.1, ease: Power0.easeInOut, onComplete: done }
  );
};

const leave = (el: Element, done: () => void) => {
  gsap.fromTo(el,
    { height: el.scrollHeight, opacity: 1,  margin:"1.25rem 0", },
    { height: 0, opacity: 0, duration: 0.1, margin:0,  ease: Power0.easeInOut, onComplete: done }
  );
};

onMounted(() => {
  index.value = Accordion.count++;
});
</script>
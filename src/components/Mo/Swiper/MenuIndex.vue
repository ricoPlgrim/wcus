<template>
  <!-- Swiper 컴포넌트 - 'v1' 타입 -->
  <swiper v-if="type === 'v1'" ref="swiperRef" class="menu-swiper v1" :slides-per-view="'auto'" :prevent-clicks="true"
    :prevent-clicks-propagation="false" :observer="true" :observe-parents="true">
    <swiper-slide v-for="(menuItem, index) in menus" :key="index" :class="{ active: activeIndex.v1 === index }">
      <a href="javascript:;" @click="handleClick('v1', index, $event)" :data-text="menuItem"
        :class="{ active: activeIndex.v1 === index }">{{ menuItem }}</a>
    </swiper-slide>
  </swiper>

  <!-- Swiper 컴포넌트 - 'v2' 타입 (유사한 구조 반복) -->
  <swiper v-else-if="type === 'v2'" ref="swiperRef" class="menu-swiper v2" :slides-per-view="'auto'"
    :prevent-clicks="true" :prevent-clicks-propagation="false" :observer="true" :observe-parents="true">
    <swiper-slide v-for="(menuItem, index) in menus" :key="index" :class="{ active: activeIndex.v2 === index }">
      <a href="javascript:;" @click="handleClick('v2', index, $event)" :data-text="menuItem"
        :class="{ active: activeIndex.v2 === index }">{{ menuItem }}</a>
    </swiper-slide>
  </swiper>

  <!-- Swiper 컴포넌트 - 'v3' 타입 (유사한 구조 반복) -->
  <swiper v-else-if="type === 'v3'" ref="swiperRef" class="menu-swiper v3" :slides-per-view="'auto'"
    :prevent-clicks="true" :prevent-clicks-propagation="false" :observer="true" :observe-parents="true">
    <swiper-slide v-for="(menuItem, index) in menus" :key="index" :class="{ active: activeIndex.v3 === index }">
      <a href="javascript:;" @click="handleClick('v3', index, $event)" :data-text="menuItem"
        :class="{ active: activeIndex.v3 === index }">{{ menuItem }}</a>
    </swiper-slide>
  </swiper>

  <!-- Swiper 컴포넌트 - 'v4' 타입 -->
  <swiper v-if="type === 'v4'" ref="swiperRef" class="menu-swiper v4" :slides-per-view="'auto'" :prevent-clicks="true"
    :prevent-clicks-propagation="false" :observer="true" :observe-parents="true">
    <swiper-slide v-for="(menuItem, index) in menus" :key="index" :class="{ selected: activeIndex.v4 === index }">
      <a href="javascript:;" @click="handleClick('v4', index, $event)" :data-text="menuItem"
        :class="{ active: activeIndex.v4 === index }">{{ menuItem }}</a>
    </swiper-slide>
  </swiper>

  <!-- Swiper 컴포넌트 - 'v5' 타입 (이미지 포함) -->
  <swiper v-if="type === 'v5'" ref="swiperRef" class="menu-swiper v5 " :slides-per-view="'auto'" :prevent-clicks="true"
    :prevent-clicks-propagation="false" :observer="true" :observe-parents="true">
    <swiper-slide v-for="(menuItem, index) in menuObj" :key="index" :class="{ active: activeIndex.v5 === index }">
      <a href="javascript:;" @click="handleClick('v5', index, $event)" :data-text="menuItem.name"
        :class="{ active: activeIndex.v5 === index }">
        <div class="img-box">
          <div class="circle-box">
            <img :src="menuItem.imgSrc" class="img" />
          </div>
        </div>
        <p>{{ menuItem.name }}</p>
      </a>
    </swiper-slide>
  </swiper>

  <!-- Swiper 컴포넌트 - 'v6' 원형 타입  -->
  <swiper v-if="type === 'v6'" ref="swiperRef" :class="['menu-swiper v6', customClass]" :slides-per-view="'auto'" :prevent-clicks="true"
    :prevent-clicks-propagation="false" :observer="true" :observe-parents="true">
    <swiper-slide v-for="(menuItem, index) in menus" :key="index" :class="{ active: activeIndex.v6 === index }">
      <a href="javascript:;" @click="handleClick('v6', index, $event)" :class="{ active: activeIndex.v6 === index }" :data-text="menuItem"
      class="tag-type2">{{ menuItem }}</a>
    </swiper-slide>
  </swiper>

  <!--key word swiper-->
  <swiper v-if="type === 'v7'" ref="swiperRef" :class="['menu-swiper v7', customClass]" :slides-per-view="'auto'" :prevent-clicks="true"
    :prevent-clicks-propagation="false" :observer="true" :observe-parents="true">
    <swiper-slide v-for="(menuItem, index) in menus" :key="index" :class="{ active: activeIndex.v7 === index }">
      <a href="javascript:;" @click="handleClick('v7', index, $event)" :class="{ active: activeIndex.v7 === index }" :data-text="menuItem"
      class="tag-type2">{{ menuItem }}</a>
    </swiper-slide>
  </swiper>


</template>

<script setup lang="ts">
import { ref, defineExpose, nextTick, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';


// 컴포넌트에서 사용할 props 정의
const props = defineProps<{
  menus?: string[];  // 메뉴 이름 배열
  menuObj?: Array<{ name: string; imgSrc: string }>;  // 이미지와 함께 사용하는 메뉴 객체 배열
  type: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6'  | 'v7';  // Swiper 타입 
  initialIndex?: number;  //선택 인덱스
  customClass?:string
}>();


// 메뉴와 관련된 데이터 초기화
const menus = props.menus ?? [];  // 기본적으로 빈 배열로 초기화
const menuObj = props.menuObj ?? [];  // 기본적으로 빈 배열로 초기화

// Swiper 이벤트 발생 시 부모 컴포넌트에 전달하기 위한 emit 정의
const emit = defineEmits(['menuClick']);
const swiperRef = ref<InstanceType<typeof Swiper> | null>(null);
const activeIndex = ref({ v1: 0, v2: 0, v3: 0, v4: 0, v5: 0, v6: 0, v7: 0 }); // 각 타입별로 활성화된 인덱스 관리





// 요소의 위치를 계산하는 함수
const getOffsetPosition = (element: HTMLElement) => {
  let offsetTop = 0;
  let offsetLeft = 0;

  while (element) {
    offsetTop += element.offsetTop;
    offsetLeft += element.offsetLeft;
    element = element.offsetParent as HTMLElement;
  }

  return { top: offsetTop, left: offsetLeft };
};

// 슬라이드의 너비와 마진을 계산하는 함수
const getSlideWidthWithMargin = (slide: HTMLElement) => {
  const style = window.getComputedStyle(slide);
  const marginLeft = parseFloat(style.marginLeft || '0');
  const marginRight = parseFloat(style.marginRight || '0');
  return slide.offsetWidth + marginLeft + marginRight;
};

// 클릭된 요소를 중앙으로 맞추는 함수
const muCenter = (target: HTMLElement) => {
  const snbwrap = target.closest('.swiper-wrapper') as HTMLElement;
  if (!snbwrap) {
    console.error('muCenter: .swiper-wrapper not found');
    return;
  }

  const targetPos = getOffsetPosition(target);
  const box = document.querySelector(`.menu-swiper.${props.type}`) as HTMLElement;
  if (!box) {
    console.error('muCenter: .menu-swiper not found');
    return;
  }

  const boxHalf = box.offsetWidth / 2;
  let pos: number;
  let listWidth = 0;

  snbwrap.querySelectorAll('.swiper-slide').forEach((slide) => {
    const slideWidth = getSlideWidthWithMargin(slide as HTMLElement);
    listWidth += slideWidth;
  });

  const boxPos = getOffsetPosition(box);
  const selectTargetPos = targetPos.left + (target.offsetWidth / 2) - boxPos.left;



  if (selectTargetPos <= boxHalf) {
    pos = 0;
  } else if (listWidth - selectTargetPos <= boxHalf) {
    pos = listWidth - box.offsetWidth;
  } else {
    pos = selectTargetPos - boxHalf;
  }


  if (listWidth > box.offsetWidth) {
    setTimeout(() => {
      snbwrap.style.transform = `translate3d(${-pos}px, 0, 0)`;
      snbwrap.style.transitionDuration = '500ms';
    }, 200);
  }
};

// 메뉴 클릭 시 호출되는 함수
const handleClick = async (type: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7',  index: number, event?: Event) => {
  onMenuClick(type, index, event);
  emit('menuClick', index);
  
};

// 메뉴 클릭 시 내부 로직을 처리하는 함수
const onMenuClick = async (type: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7', index: number, event?: Event) => {
  activeIndex.value[type] = index;

  let target: HTMLElement | null = null;

  if (event) {
    event.preventDefault();
    target = event.target as HTMLElement;
  } else if (swiperRef.value) {
    await nextTick();
    const slides = swiperRef.value.$el.querySelectorAll('.swiper-slide');
    target = slides[index]?.querySelector('a') as HTMLElement;
  } else {
    // console.error('onMenuClick: swiperRef is null');
    return;
  }
  if (target) {
    muCenter(target);
  } else {
    // console.error('onMenuClick: target is null or undefined');
  }
};

// 초기 설정 인덱스를 감시하고 설정
watch(
  () => props.initialIndex,
  (newIndex) => {
    if (newIndex !== undefined && props.type) {
      activeIndex.value[props.type] = newIndex;
      onMenuClick(props.type, newIndex);  // 초기 인덱스에 맞게 Swiper 설정
    }
  },
  { immediate: true }
);


// 부모 컴포넌트에서 호출할 수 있도록 내부 함수를 노출
defineExpose({
  onMenuClick,
  swiperInstance: swiperRef,
});
</script>

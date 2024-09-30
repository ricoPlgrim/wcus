<template>
  <div :class="['pop-option', { 'is-visible': isVisible, 'active': isActive }]" v-if="isVisible" id="pop-option">
    <div class="dim" @click="closePopup"></div>
    <div class="pop-wrap">
      <div class="pop-bar" @click="closePopup"></div>
      <!-- box-open과 info-open 클래스를 상태에 따라 변경 -->
      <div :class="['pop-content', 'option-wrap', 'bottom', { 'box-open': !isInfoOpen, 'info-open': isInfoOpen }]">
        <div class="option-title">
          <h4 class="title-type3">Option</h4>
          <span class="side-box">
            <a href="javascript:;" class="btn-type4 v3 btn-size" @click="emitSizePopup">Size Guide</a>
            <a href="javascript:;" class="btn-close" @click="closePopup"><i class="ico-close">닫기</i></a>
          </span>
        </div>
        <div class="option-inner">
          <div class="option-box">
            <div class="option-list">
              <!-- 첫번째옵션 (s) -->
              <div :class="['option-item', { active: activeIndex === 0 }]" @click="toggleActive(0)" index="0">
                <div class="title">Color <em class="selected">{{ selectedOptions.color || 'Select Color' }}</em></div>
                <ul class="option-cont custom-scroll">
                  <li>
                    <div :class="['chk-box', { selected: selectedOptions.color === 'Pink (Low Stock)' }]">
                      <input type="radio" id="color1" name="color" @change="selectOption(0, 'Pink (Low Stock)')">
                      <label class="checkbox" for="color1"></label>
                      <label for="color1">Pink (Low Stock)</label>
                    </div>
                  </li>
                  <li>
                    <div :class="['chk-box', { selected: selectedOptions.color === 'Blue' }]">
                      <input type="radio" id="color2" name="color" @change="selectOption(0, 'Blue')">
                      <label class="checkbox" for="color2"></label>
                      <label for="color2">Blue</label>
                    </div>
                  </li>
                  <li>
                    <div :class="['chk-box', { selected: selectedOptions.color === 'Beige' }]">
                      <input type="radio" id="color3" name="color" @change="selectOption(0, 'Beige')">
                      <label class="checkbox" for="color3"></label>
                      <label for="color3">Beige (+<b>$5</b>)</label>
                    </div>
                  </li>
                  <li>
                    <div class="chk-box disabled">
                      <input type="radio" id="color4" name="color" :disabled="true">
                      <label class="checkbox" for="color4"></label>
                      <label for="color4">Black</label>
                    </div>
                    <button type="button" class="btn-type4 v5"  @click.stop="restockPopup">Notify
                      me<i class="ico-email"><span class="hidden">email</span></i></button>
                  </li>
                </ul>
              </div>
              <!-- //첫번째옵션 (e) -->

              <!-- 두번째옵션 (s) -->
              <div :class="['option-item', { active: activeIndex === 1 }]" @click="toggleActive(1)" index="1">
                <div class="title">Size <em class="selected">{{ selectedOptions.size || 'Select Size' }}</em></div>
                <ul class="option-cont custom-scroll">
                  <li>
                    <div :class="['chk-box', { selected: selectedOptions.size === 'One Size(XS-M)' }]">
                      <input type="radio" id="size1" name="size" @change="selectOption(1, 'One Size(XS-M)')">
                      <label class="checkbox" for="size1"></label>
                      <label for="size1">One Size(XS-M)</label>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- //두번째옵션 (e) -->

              <!-- 세번째옵션 (s) -->
              <div :class="['option-item', { active: activeIndex === 2 }]" @click="toggleActive(2)" index="2">
                <div class="title">OPTION3 <em class="selected">{{ selectedOptions.option3 || 'Select Option' }}</em>
                </div>
                <ul class="option-cont custom-scroll">
                  <li>
                    <div :class="['chk-box', { selected: selectedOptions.option3 === 'option1' }]">
                      <input type="radio" id="etc1" name="option3" @change="selectOption(2, 'option1')">
                      <label class="checkbox" for="etc1"></label>
                      <label for="etc1">option1</label>
                    </div>
                  </li>
                  <li>
                    <div :class="['chk-box', { selected: selectedOptions.option3 === 'option2' }]">
                      <input type="radio" id="etc2" name="option3" @change="selectOption(2, 'option2')">
                      <label class="checkbox" for="etc2"></label>
                      <label for="etc2">option2</label>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- //세번째옵션 (e) -->
            </div>
          </div>
          <div class="option-info" v-if="allOptionsSelected">
            <button type="button" class="btn-type2 v2" @click="optionOpenClick">Selected Option</button>
            <div class="option-value">
              <span>{{ selectedOptions.color }}</span>
              <span>{{ selectedOptions.size }}</span>
              <span>{{ selectedOptions.option3 }}</span>
            </div>
            <div class="price-box">
              <em><b>$148.00</b></em>
            </div>
          </div>
        </div>
        <div class="btn-fixed-wrap v2">
          <a href="" class="btn-type v3">ADD TO CART</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineExpose, nextTick, defineEmits } from 'vue';


// 팝업 상태
const isVisible = ref(false);
const isActive = ref(false);
const isInfoOpen = ref(false);  // 추가된 상태: info-open 여부
const isToggleAllowed = ref(false);  // 옵션 토글 허용 여부

// 선택된 옵션 상태
const selectedOptions = ref({
  color: null,
  size: null,
  option3: null,
});

// 현재 활성화된 옵션 인덱스
const activeIndex = ref(0);

// 모든 옵션이 선택되었는지 계산
const allOptionsSelected = computed(() => {
  return selectedOptions.value.color && selectedOptions.value.size && selectedOptions.value.option3;
});

// 옵션 선택 처리
const selectOption = (index, value) => {
  if (index === 0) {
    selectedOptions.value.color = value;
  } else if (index === 1) {
    selectedOptions.value.size = value;
  } else if (index === 2) {
    selectedOptions.value.option3 = value;
  }

  // 선택된 옵션에 따라 다음 옵션 활성화
  if (index < 2) {
    activeIndex.value = index + 1;
  } else {
    // 마지막 옵션이 선택되었을 때 info-open으로 전환
    nextTick(() => {
      isInfoOpen.value = true;
      isToggleAllowed.value = true;  // 옵션 항목 클릭을 허용
    });
  }
};

// Emits 정의
const emit = defineEmits(['openSizePopup', 'openRestockPopup']);

const emitSizePopup = () => {
  emit('openSizePopup');
};


const restockPopup = () => {
  emit('openRestockPopup');
};


// 옵션 항목 클릭 시 active 상태를 토글
const toggleActive = (index: number) => {
  // 토글 허용 상태일 때만 active 상태를 토글 가능
  if (isToggleAllowed.value) {
    if (activeIndex.value === index) {
      activeIndex.value = -1;  // 동일한 옵션 클릭 시 비활성화
    } else {
      activeIndex.value = index;
    }
  }
};

// 버튼 클릭 시 box-open을 info-open으로 전환
const optionOpenClick = () => {
  isInfoOpen.value = false;
  activeIndex.value = 0; // 다시 첫번째 옵션값 활성화
  isToggleAllowed.value = true;  // 옵션 항목 클릭을 허용
};

// 팝업 열기
const openPopup = () => {
  isVisible.value = true;
  setTimeout(() => {
    isActive.value = true;
  }, 100);
};

// 팝업 닫기
const closePopup = () => {
  isActive.value = false;
  setTimeout(() => {
    isVisible.value = false;
  }, 300);
};

// 스크롤 방지 처리
watch(isVisible, (newVal) => {
  document.body.style.overflow = newVal ? 'hidden' : '';
});

defineExpose({ openPopup, closePopup });
</script>

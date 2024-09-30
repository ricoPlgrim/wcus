<template>
  <AsideNav />
  <div class="page-guide-content">
    <h2 class="page-guide-title">LAYER POPUP</h2>
    <h3 class="page-guide-title2">basic popup</h3>
    <div class="page-guide-box">
      <div class="text">
        <!-- selId와 st 문자열로 전달<br> -->
        열기 :@click="openPopup('팝업 컴포넌트')"<br>
        닫기 :컴포넌트내 (closePopup);
      </div>
      <div class="btn-wrap">
        <button @click="openPopup('basicPopup')" class="btn-type">basic</button>
        <button @click="openPopup('buttonPopup')" class="btn-type">button</button>
        <button @click="openPopup('imgPopup')" class="btn-type">img</button>
      </div>
      <BasicPopupLayer ref="basicPopup" title="Notice of delivery delay"
        description="Delivery may be delayed in some areas<br />due to strikes." checkText="CONFIRM" />
      <ButtonPopupLayer ref="buttonPopup" title="WCONCEPT NOTICE"
        description="The latest version has been released. Please<br/>use it after updating to the new version."
        checkText="CONFIRM" executionText="UPDATE" />
      <ImgPopupLayer ref="imgPopup" imgSrc="https://beeimg.com/images/h26180623163.jpg" imgAlt="테스트 이미지"
        checkText="DO NOT OPEN TODAY" executionText="CLOSE" />
    </div>
    <h3 class="page-guide-title2">full popup</h3>
    <div class="page-guide-box">
      <div class="btn-wrap">
        <button @click="openPopup('fullPopup')" class="btn-type">full</button>
        <button @click="openPopup('fullBottomPopup')" class="btn-type">button</button>
      </div>
      <FullPopupLayer ref="fullPopup" />
      <PullBottomPopupLayer ref="fullBottomPopup" title="title"
        contentData="content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>content<br>"
        checkText="OK" />
    </div>
    <h3 class="page-guide-title2">bottom popup</h3>
    <div class="page-guide-box">
      <div class="btn-wrap">
        <button @click="openPopup('bottomPopup')" class="btn-type">bottom</button>
        <button @click="openPopup('bottomImgPopup')" class="btn-type">bottom2</button>
        <button @click="openPopup('bottomMarketingPopup')" class="btn-type">bottom3</button>
      </div>
      <BottomPopupLayer ref="bottomPopup" title="Install the WCONCEPT app<br>and get more benefits."
        description="Automatic issuance of 7 types of coupon<br>packs exclusively for APP!" buttonName="Button Name"
        todayTitle="DO NOT OPEN TODAY" closeText="CLOSE" />
      <BottomImgPopupLayer ref="bottomImgPopup" imgSrc="https://beeimg.com/images/h26180623163.jpg" imgAlt="테스트 이미지"
        todayTitle="DO NOT OPEN TODAY" closeText="CLOSE" />
      <BottomMarketingPopupLayer ref="bottomMarketingPopup" />
      <div class="btn-wrap">
        <button type="button" class="btn-option" @click="openPopup('selectPopup')">
          <span id="optValue">{{ selectedOption || 'Select Option' }}</span>
        </button>
      </div>
      <SelectPopupLayer ref="selectPopup" @update:selectedOption="handleOptionSelected" />
    </div>
    <h3 class="page-guide-title2">토스트</h3>
    <div class="page-guide-box">
      <div class="text">
        mounted 이후 showToastPopup함수 사용
      </div>
      <ToastPopupLayer ref="toastPopup" title=" The status has been changed to consent." :duration="3000" />
    </div>


    <div class="page-guide-box">
      <div class="product-top">
        <div class="prd-mode">
          <div class="chk-box">
            <input type="checkbox" id="saleChk" />
            <label class="checkbox" for="saleChk"></label>
            <label for="saleChk">Sale Only</label>
          </div>
          <!-- <button type="button" class="btn-mode">2개</button> -->
          <!-- <button type="button" class="btn-mode mode4">4개</button> -->
          <span class="count"><em>99</em> items</span>
        </div>
        <div class="prd-type">
          <button type="button"  @click="openPopup('filterPopup')">Filter<i class="ico-filter"></i></button>
          <button type="button">Sort<i class="ico-sort"></i></button>
        </div>

        <FilterPopupLayer ref="filterPopup"  :selectedItems="selectedItems" />
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AsideNav from '../Gnb/AsideNav.vue';
import BasicPopupLayer from '../../../../components/Mo/Popup/BasicPopup.vue';
import ButtonPopupLayer from '../../../../components/Mo/Popup/ButtonPopup.vue';
import ImgPopupLayer from '../../../../components/Mo/Popup/ImgPopup.vue';
import FullPopupLayer from '../../../../components/Mo/Popup/PullPopup.vue';
import PullBottomPopupLayer from '../../../../components/Mo/Popup/PullBottomPopup.vue';
import BottomPopupLayer from '../../../../components/Mo/Popup/BottomPopup.vue';
import BottomImgPopupLayer from '../../../../components/Mo/Popup/BottomImgPopup.vue';
import BottomMarketingPopupLayer from '../../../../components/Mo/Popup/BottomMarketingPopup.vue';
import SelectPopupLayer from '../../../../components/Mo/Popup/SelectPoup.vue';
import ToastPopupLayer from '../../../../components/Mo/Popup/ToastPopup.vue';
import FilterPopupLayer from '../../../../components/Mo/Popup/FilterPopup.vue'


const basicPopup = ref<InstanceType<typeof BasicPopupLayer> | null>(null);
const buttonPopup = ref<InstanceType<typeof ButtonPopupLayer> | null>(null);
const imgPopup = ref<InstanceType<typeof ImgPopupLayer> | null>(null);
const fullPopup = ref<InstanceType<typeof FullPopupLayer> | null>(null);
const fullBottomPopup = ref<InstanceType<typeof PullBottomPopupLayer> | null>(null);
const bottomPopup = ref<InstanceType<typeof BottomPopupLayer> | null>(null);
const bottomImgPopup = ref<InstanceType<typeof BottomImgPopupLayer> | null>(null);
const bottomMarketingPopup = ref<InstanceType<typeof BottomMarketingPopupLayer> | null>(null);
const selectPopup = ref<InstanceType<typeof SelectPopupLayer> | null>(null);
const toastPopup = ref<InstanceType<typeof ToastPopupLayer> | null>(null);
const selectedOption = ref<string | null>(null);
const filterPopup = ref<InstanceType<typeof FilterPopupLayer> | null>(null);
const selectedItems = ref<{ label: string; selected: boolean }[]>([]); // 선택된 항목 관리

const openPopup = (popupName: string) => {
  switch (popupName) {
    case 'basicPopup':
      if (basicPopup.value) basicPopup.value.openPopup();
      break;
    case 'buttonPopup':
      if (buttonPopup.value) buttonPopup.value.openPopup();
      break;
    case 'imgPopup':
      if (imgPopup.value) imgPopup.value.openPopup();
      break;
    case 'fullPopup':
      if (fullPopup.value) fullPopup.value.openPopup();
      break;
    case 'fullBottomPopup':
      if (fullBottomPopup.value) fullBottomPopup.value.openPopup();
      break;
    case 'bottomPopup':
      if (bottomPopup.value) bottomPopup.value.openPopup();
      break;
    case 'bottomImgPopup':
      if (bottomImgPopup.value) bottomImgPopup.value.openPopup();
      break;
    case 'bottomMarketingPopup':
      if (bottomMarketingPopup.value) bottomMarketingPopup.value.openPopup();
      break;
    case 'selectPopup':
      if (selectPopup.value) selectPopup.value.openPopup();
      break;
    case 'filterPopup':
      if (filterPopup.value) filterPopup.value.openPopup();
      break;
  }
};

const handleOptionSelected = (option: string) => {
  selectedOption.value = option;
};

const showToastPopup = () => {
  if (toastPopup.value) toastPopup.value.showPopup();
};

onMounted(() => {
  showToastPopup();
});
</script>
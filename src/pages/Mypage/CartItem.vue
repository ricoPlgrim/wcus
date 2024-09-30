<template>
  <li class="cart-box">
    <div class="cart-top">
      <div class="chk-box" :class="{ selected: isSelected }" @click="toggleSelectAll">
        <!-- 전체 선택 체크박스 -->
        <input type="checkbox" :id="item.selectAllId" @click.stop />
        <label class="checkbox" :for="item.selectAllId"></label>
        <label :for="item.selectAllId">Select All</label>
      </div>
    </div>
    <!-- 개별 제품 리스트 -->
    <div v-for="(product, index) in item.products" :key="index" class="cart-item">
      <div class="product-state">
        <!-- 개별 제품 선택 체크박스 -->
        <div class="chk-box" :class="{ selected: product.isSelected }" @click="toggleSelectProduct(product)">
          <input type="checkbox" :id="product.checkboxId" @click.stop />
          <label class="checkbox" :for="product.checkboxId"></label>
          <label :for="product.checkboxId">{{ product.status }}</label>
        </div>
      </div>
      <!-- 제품 정보 -->
      <div class="product-type">
        <div class="product-model">
          <a :href="product.link">
            <div class="img-box">
              <!-- 제품 이미지 -->
              <img :src="product.imageSrc" alt="" />
            </div>
          </a>
        </div>
        <div class="product-info">
          <!-- 제품 제목 -->
          <div class="product-title">
            <h3 class="brand">{{ product.brand }}</h3>
            <p class="title">{{ product.title }}</p>
          </div>
          <!-- 제품 옵션 -->
          <div class="product-option">
            <ul class="list">
              <li>{{ product.color }}</li>
              <li>{{ product.size }}</li>
              <li>Qty : <b>{{ product.quantity }}</b></li>
            </ul>
          </div>
          <!-- 제품 가격 -->
          <div class="product-price">
            <span class="price"><b>{{ product.price }}</b></span>
          </div>
        </div>
      </div>
      <div v-if="product.hasReturnOption" class="form-item">
        <label class="input-label">
          Reason to Return<span class="required">*</span>
        </label>
        <!-- 반품 사유 선택 버튼 -->
        <div class="btn-wrap" style="margin-top: 0;">
          <button type="button" class="btn-option" @click="openPopup(index)">
            <span id="optValue">{{ selectedOptions[index] || 'Select Option' }}</span>
          </button>
        </div>
        <SelectPopupLayer :ref="el => popupRefs[index] = el as InstanceType<typeof SelectPopupLayer>"
          @update:selectedOption="option => handleOptionSelected(option, index)" />
      </div>

    </div>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SelectPopupLayer from '../../components/Mo/Popup/SelectPoup.vue';
import { Product, CartItem } from './ProductTypes'; // 인터페이스 임포트

const popupRefs = ref<InstanceType<typeof SelectPopupLayer>[]>([]);
const selectedOptions = ref<string[]>([]);

const props = defineProps<{
  item: CartItem;
}>();

const isSelected = ref(false);

// 전체 선택/해제 토글 함수
function toggleSelectAll() {
  isSelected.value = !isSelected.value;
  props.item.products.forEach(product => {
    product.isSelected = isSelected.value;
  });
}

// 개별 제품 선택/해제 토글 함수
function toggleSelectProduct(product: Product) {
  product.isSelected = !product.isSelected;
  updateSelectAllStatus();
}

// 전체 선택 상태 업데이트 함수
function updateSelectAllStatus() {
  isSelected.value = props.item.products.every(product => product.isSelected);
}

// 팝업 열기 함수
const openPopup = (index: number) => {
  if (popupRefs.value[index]) {
    popupRefs.value[index].openPopup();
  }
};

// 옵션 선택 핸들러
const handleOptionSelected = (option: string, index: number) => {
  selectedOptions.value[index] = option;
};

</script>
<template>
    <component :is="dynamicComponent" :headerBgColor="headerBgColor" :title="pageTitle" @openSearch="showSearchLayer"
        v-if="!isSearchLayerVisible" />

    <div class="sub" id="container">
        <div class="content-wrap order-wrap">
            <section class="request-wrap">
                <ul class="step-area v2">
                    <li>
                        <div class="box-type2">
                            <dl>
                                <dt>Order #</dt>
                                <dd>WU323051500001</dd>
                            </dl>
                        </div>
                    </li>

                    <CartItem :item="cartItemData" />

                    <li>
                        <div class="form-item">
                            <label class="input-label">
                                Reason to Cancel<span class="required">*</span>
                            </label>
                            <button type="button" class="btn-option"
                                onclick="WC_UI.layerPopUp({selId:'#pop-select', value:'optReason'})">
                                <span id="optReason">Select</span>
                            </button>
                        </div>
                    </li>
                    <li>
                        <div class="payment-type">
                            <div class="title-wrap">
                                <h2 class="title-type3">Refund Information</h2>
                            </div>
                            <!-- 2023-10-31 수정(s)  -->
                            <div class="box-type">
                                <dl>
                                    <dt>Subtotal</dt>
                                    <dd><span><b>$164.00</b></span></dd>
                                </dl>
                                <dl>
                                    <dt>Discount</dt>
                                    <dd><span class="focus"><b>- $8.00</b></span></dd>
                                </dl>
                                <dl>
                                    <dt>Shipping Fee</dt>
                                    <dd><span><b>$10.00</b></span></dd>
                                </dl>
                                <dl>
                                    <dt><strong>Grand Total</strong></dt>
                                    <dd><strong><b>$164.00</b></strong></dd>
                                </dl>
                            </div>
                            <div class="box-type fee">
                                <dl>
                                    <dt>Tax</dt>
                                    <dd><span><b>$14.41</b></span></dd>
                                </dl>
                            </div>
                            <div class="box-type total">
                                <dl>
                                    <!-- 2023-10-04 문구수정 -->
                                    <dt>Estimated Refund</dt>
                                    <dd><span><b>$486.00</b></span></dd>
                                </dl>
                                <!-- 회원(s) -->
                                <p class="desc">Loyalty points refunded to customer(183)</p>
                                <!-- 회원(e) -->
                            </div>
                            <!-- 2023-10-31 수정(e)  -->
                        </div>
                        <div class="notice-box">
                            <strong>Cancellation Policy Notice <em class="focus">*</em></strong>
                            <p>By completing and submitting your return request, you agree to W Concept's
                                cancellation policy and terms of use.</p>
                            <div class="chk-box">
                                <input type="checkbox" id="agree" />
                                <label class="checkbox" for="agree"></label>
                                <label for="agree">I agree to the cancellation policy and terms of use.</label>
                            </div>
                        </div>
                        <div class="btn-wrap">
                            <a href="#" class="btn-type btn-full disabled">REQUEST CANCELLATION</a>
                            <!-- 활성화 -->
                            <!-- <a href="#" class="btn-type btn-full v3">REQUEST CANCELLATION</a> -->
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    </div>
    <Quick />
    <Navigation :NaviBgColor="NaviBgColor" />
    <Footer />
    <SearchLayer v-if="isSearchLayerVisible" @close="hideSearchLayer" />
</template>
        
<script setup lang="ts">
import { ref, computed, } from 'vue';
import { useRoute } from 'vue-router';
import SubHeader from "../../components/Mo/Header/SubHeader.vue";
import MainHeader from "../../components/Mo/Header/MainHeader.vue";
import Navigation from "../../components/Mo/Navigation/NavigationComponent.vue";
import Quick from "../../components/Mo/Quick/QuickComponent.vue";
import Footer from "../../components/Mo/Footer/FooterComponent.vue";
import SearchLayer from "../../components/Mo/Header/SearchLayerPopup.vue";
import CartItem from './CartItem.vue'; 
import DemoImg from '../../assets/mo/images/temp//@temp_prd_image.png'

//router
const route = useRoute();
//메인header 체크
const isMain = computed(() => route.path === '/main');
// 동적 컴포넌트 설정
const dynamicComponent = computed(() => isMain.value ? MainHeader : SubHeader);
//헤더 배경값
const headerBgColor = '';
//네비게이션 배경값
const NaviBgColor = '';
// 페이지 타이틀
const pageTitle = "Me";

// 검색 레이어 표시 상태
const isSearchLayerVisible = ref(false);

// 검색 레이어 표시 함수
const showSearchLayer = () => {
    isSearchLayerVisible.value = true;
};

// 검색 레이어 숨김 함수 (필요시)
const hideSearchLayer = () => {
    isSearchLayerVisible.value = false;
};


//장바구니 아이템 데이터
const cartItemData = ref({
  selectAllId: 'test1',  // 전체 선택 체크박스 ID
  products: [
    {
      checkboxId: 'test2',  // 제품 개별 체크박스 ID
      status: 'Delivered',  // 제품 상태 (예: 배송 완료)
      link: '#',  // 제품 상세 페이지 링크
      imageSrc: DemoImg,  // 제품 이미지 경로
      brand: 'BRAND',  // 제품 브랜드명
      title: 'Over fit round Dewy Double Jacket Big pockets',  // 제품 제목
      color: 'Black',  // 제품 색상
      size: 'One Size(XS~M)',  // 제품 사이즈
      quantity: 1,  // 주문 수량
      price: '$245.00',  // 제품 가격
      hasReturnOption: false,  // 반품 옵션 여부 (true: 반품 가능, false: 반품 불가)
      reasonPopupId: 'pop-select',  // 반품 사유 선택 팝업 ID
      reasonId: 'optReason',  // 선택된 반품 사유 ID
      reasonText: 'Select',  // 기본 반품 사유 텍스트
    },
    {
      checkboxId: 'test3',  // 제품 개별 체크박스 ID
      status: 'Ordered',  // 제품 상태 (예: 주문 완료)
      link: '#',  // 제품 상세 페이지 링크
      imageSrc: DemoImg,  // 제품 이미지 경로
      brand: 'BRAND',  // 제품 브랜드명
      title: 'Over fit round Dewy Double Jacket Big pockets',  // 제품 제목
      color: 'Black',  // 제품 색상
      size: 'One Size(XS~M)',  // 제품 사이즈
      quantity: 1,  // 주문 수량
      price: '$245.00',  // 제품 가격
      hasReturnOption: false,  // 반품 옵션 여부 (true: 반품 가능, false: 반품 불가)
      reasonPopupId: 'pop-select2',  // 반품 사유 선택 팝업 ID
      reasonId: 'optReason2',  // 선택된 반품 사유 ID
      reasonText: 'Wrong Item was Sent',  // 기본 반품 사유 텍스트
    },
  ],
});

</script>
    
    
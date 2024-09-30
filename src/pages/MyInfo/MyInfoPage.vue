<template>
  <component :is="dynamicComponent" :headerBgColor="headerBgColor" :title="pageTitle" :showSearchButton="showSearchButton"
    :showShareButton="showShareButton" :showCartButton="showCartButton" :showHomeButton="showHomeButton" />

  <div class="sub" id="container">
    <div class="content-wrap mypage-wrap">
      <section class="account-dashboard me">
        <ul class="step-area v2">
          <li class="intro-box"><strong class="title">Sign in<br>for tailored shopping experience</strong>
            <div class="btn-wrap v2"><a href="#" class="btn-type2">Create An Account</a><a href="#" class="btn-type2">Sign
                in</a></div>
            <div class="btn-wrap"><a href="#" class="btn-type4 v3">Track Order</a></div>
          </li>
          <li>
            <dl class="box-type3">
              <dt>Shopping Preference</dt>
              <dd>
                <div class="chk-group">
                  <div class="chk-box"><input type="radio" id="radio" name="radio"><label class="checkbox"
                      for="radio"></label><label for="radio">Women</label></div>
                  <div class="chk-box selected"><input type="radio" id="radio2" name="radio" checked=""><label
                      class="checkbox" for="radio2"></label><label for="radio2">Men</label></div>
                </div>
              </dd>
            </dl>
            <dl class="box-type3">
              <dt>Country</dt>
              <dd><x-select-country text="United States of America" tooltip="Select shipping country"></x-select-country>
              </dd>
            </dl>
            <dl class="box-type3">
              <dt>Customer Service</dt>
              <dd>
                <ul class="menu-list">
                  <li><a>Loyalty Program</a></li>
                  <li><a href="#">Track Order</a></li>
                  <li><a>Order &amp; Shipping</a></li>
                  <li><a>Return &amp; Exchange</a></li>
                  <li><a>FAQ</a></li>
                  <li><a>News</a></li>
                  <li><a>Contact Us</a></li>
                  <li><a>About Us</a></li>
                  <li><a>Student Discount</a></li>
                  <li><a>Community Discount</a></li>
                </ul>
              </dd>
            </dl>
            <dl class="box-type3">
              <dt>Sign Up for Our Newsletter</dt>
              <dd class="form-wrap">
                <div class="form-item form-col">
                  <div class="col v2 input-text"><input type="text" name="mbrEmail" id="mbrEmail"
                      placeholder="Email Address">
                    <div class="form-btns"><button type="button" class="btn-clear"><span
                          class="hidden">Clear</span></button></div>
                  </div><button class="btn-type2">SUBSCRIBE</button>
                </div>
              </dd>
            </dl>
            <dl class="box-type3">
              <dt>Get Updates with Text Alerts</dt>
              <dd class="form-wrap">
                <div class="form-item">
                  <div class="col v2 input-text phone"><span class="country-code">+1</span><input type="number" name=""
                      id="name5" placeholder="US, Canada Phone Number ONLY">
                    <div class="form-btns"><button type="button" class="btn-clear"><span
                          class="hidden">Clear</span></button></div>
                  </div><button class="btn-type2">SUBSCRIBE</button>
                </div>
                <p class="desc">By signing up you agree to receive recurring automated marketing text messages from W
                  Concept. Msg &amp; data rates may apply. View our <a
                    href="/mypage/customer-service/terms/MBR_PLC_STPLAT.html">Terms &amp; Privacy</a>.</p>
              </dd>
            </dl>
          </li>
        </ul>
      </section>
    </div>
  </div>
  <Quick />
  <Navigation :NaviBgColor="NaviBgColor" />
  <Footer />
</template>
      
<script setup lang="ts">
import { ref, computed, } from 'vue';
import { useRoute } from 'vue-router';
import SubHeader from "../../components/Mo/Header/SubHeader.vue";
import MainHeader from "../../components/Mo/Header/MainHeader.vue";
import Navigation from "../../components/Mo/Navigation/NavigationComponent.vue";
import Quick from "../../components/Mo/Quick/QuickComponent.vue";
import Footer from "../../components/Mo/Footer/FooterComponent.vue";


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

// 버튼 가시성 제어 플래그 설정
const showSearchButton = ref(true); //검색 버튼 표시
const showShareButton = ref(false);  // 공유 버튼 표시
const showCartButton = ref(true);  // 장바구니 버튼 표시
const showHomeButton = ref(false);  // 홈 버튼 미표시




</script>
  
  
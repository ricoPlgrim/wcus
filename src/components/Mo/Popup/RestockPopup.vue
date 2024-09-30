<template>
    <div :class="['pop-full', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-restock">
        <div class="dim" @click="closePopup"></div>
        <div class="pop-wrap">
            <div class="pop-title2">
                <h3 class="title-type">Restock Notification</h3>
                <button class="pop-close" @click="closePopup">
                    <i class="ico-close"></i><span class="hidden">닫기</span>
                </button>
            </div>

            <div class="pop-content">
                <div class="restock-wrap">
                    <div class="restock-form form-wrap">
                        <div class="form-item form-title">
                            <div class="title-type4">Double Button Cotton Shorts _ 3 Colors Cube Linen Cardigan</div>
                            <!-- 옵션 선택 버튼들 -->
                            <div class="btns-wrap">
                                <button type="button" class="btn-option" @click="triggerPopup('option1')">
                                    <span id="optValue1">{{ option1Label }}</span>
                                </button>
                                <button type="button" class="btn-option" @click="triggerPopup('option2')">
                                    <span id="optValue2">{{ option2Label }}</span>
                                </button>
                                <button type="button" class="btn-option" @click="triggerPopup('option3')">
                                    <span id="optValue3">{{ option3Label }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- 로그인 상태에 따른 템플릿 분기 -->
                        <div v-if="!userLogin">
                            <!-- 로그인 전 템플릿 -->
                            <div class="form-item">
                                <div class="title-type4">Please Enter Your Email Address To Receive Restock Notifications.</div>
                                <label class="input-label">Email</label>
                                <div class="col v2 input-text">
                                    <input type="email" id="email" placeholder="Email" required>
                                    <div class="form-btns">
                                        <button type="button" class="btn-clear">
                                            <span class="hidden">Clear</span>
                                        </button>
                                    </div>
                                </div>
                                <button class="btn-type2">SUBMIT</button>
                                <p class="msg">error msg</p>
                            </div>
                            
                            <!-- 로그인 전 추가 메시지 및 로그인 버튼 -->
                            <div class="title-type5">
                                If You Are A Member, Please Log In And Sign Up For Restock Notification. A Restock Notification Email Will Be Sent To The Account You Signed Up For.
                            </div>
                            <div class="btn-wrap">
                                <button type="submit" class="btn-type v3">SIGN IN</button>
                            </div>
                        </div>
                        
                        <div v-else>
                            <!-- 로그인 후 템플릿 -->
                            <div class="form-item">
                                <div class="title-type4">Please Enter Your Email Address To Receive Restock Notifications.</div>
                                <label class="input-label">Email</label>
                                <div class="input-text">
                                    <input type="email" id="email" placeholder="Email" required>
                                    <div class="form-btns">
                                        <button type="button" class="btn-clear">
                                            <span class="hidden">Clear</span>
                                        </button>
                                    </div>
                                </div>
                                <p class="msg">error msg</p>
                            </div>
                            
                            <!-- 로그인 후 제출 버튼 -->
                            <div class="btn-wrap">
                                <button class="btn-type v3 btn-full">SUBMIT</button>
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

// 팝업 상태 관리 (팝업이 보이는지 여부)
const isVisible = ref(false);

// 로그인 상태 관리 (현재 로그인 상태, 예시로 false로 설정)
const userLogin = ref(false);

const emit = defineEmits(['open-popup']);

// 옵션 선택 시 팝업을 여는 함수
const triggerPopup = (popupType: string) => {
    emit('open-popup', popupType);
};

// 각 옵션의 라벨을 관리하는 상태
const option1Label = ref('Select Option');
const option2Label = ref('Select Option');
const option3Label = ref('Select Option');

// 팝업 열기 함수
const openPopup = () => {
  isVisible.value = true;
};

// 팝업 닫기 함수
const closePopup = () => {
  isVisible.value = false;
};

// 옵션 라벨을 업데이트하는 함수 (옵션 선택 후 라벨 업데이트)
const updateOptionLabel =  (popupType: string, selectedOption: string) => {
    if (popupType === 'option1') {
        option1Label.value = selectedOption;
    } else if (popupType === 'option2') {
        option2Label.value = selectedOption;
    } else if (popupType === 'option3') {
        option3Label.value = selectedOption;
    }
}

// 팝업이 열렸을 때 스크롤 방지 처리
watch(isVisible, (newVal) => {
    document.body.style.overflow = newVal ? 'hidden' : '';
});

// 외부에서 호출할 수 있도록 메서드를 노출
defineExpose({ openPopup, closePopup, updateOptionLabel });

</script>

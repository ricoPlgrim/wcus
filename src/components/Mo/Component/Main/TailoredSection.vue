<template>
    <!-- isVisible이 true일 때만 표시되는 섹션 -->
    <section v-if="isVisible" class="tailored-wrap">
          <!-- 닫기 버튼 -->
        <a href="javascript:;" class="btn-close" @click="closeComponent">
            <i class="ico-close"><span class="hidden">close</span></i>
        </a>
        <p>Let's Get Personal <br>Sign In For Tailored Shopping Experience.</p>
         <!-- 두 개의 버튼을 표시하는 BtnType2Components 컴포넌트 -->
        <BtnType2Components :buttons="[
            { href: '#', text: 'Create an account', classes: 'btn-type2' },
            { href: '#', text: 'Sign in', classes: 'btn-type2' },
        ]" />
    </section>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import BtnType2Components from '../../Buttons/BtnType2.vue';

// 컴포넌트 표시 여부를 제어하는 상태 변수
const isVisible = ref(true);

// 닫기 버튼 클릭 시 호출되는 함수
const closeComponent = () => {
    isVisible.value = false;  // isVisible 값을 false로 설정하여 컴포넌트를 숨김
}
</script>
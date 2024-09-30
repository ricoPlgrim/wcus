<template>
    <div class="sub etc-wrap" id="container">
        <div class="error-wrap inner-box">
            <i class="ico-attention"><span class="hidden">attention</span></i>
            <div class="text-box">
                <div class="title-type3">{{ title }}</div>
                <p>{{ description }}</p>
            </div>
            <div class="btn-wrap">
                <BtnType2Components :buttons="buttons" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed  } from 'vue';
import BtnType2Components from '../../components/Mo/Buttons/BtnType2.vue';



// 텍스트 변수 설정
const title = ref('OOPS!');
const description = ref('You have entered an invalid promotion.');


// 버튼 설정
const buttons = computed(() => [
    { href: '/', text: 'HOME', classes: 'btn-type2 v2' },
]);


</script>
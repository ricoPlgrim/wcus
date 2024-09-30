<template>
  <div class="scr-item plan-email">
    <div class="title">{{ formProps.title }}</div>
    <div class="form-item">
      <div 
        class="input-text" 
        v-for="(input, index) in formProps.inputs" 
        :key="index" 
        :class="{ focus: inputFocus[index] || inputValues[index] }"
      >
        <input 
          :type="input.type" 
          :placeholder="input.placeholder" 
          :required="input.required" 
          v-model="inputValues[index]" 
          @focus="handleFocus(index)" 
          @blur="handleBlur(index)"
        >
        <div class="form-btns">
          <button type="button" class="btn-clear" @click="clearInput(index)"
            :style="{ display: inputValues[index] ? 'block' : 'none' }">
            <span class="hidden">Clear</span>
          </button>
        </div>
      </div>
      <div class="btn-wrap">
        <BtnType2Components :buttons="[
			  { href: 'javascript:;', text: formProps.buttonText, classes: 'btn-type btn-full' }
			]" />
        
      </div>
      <ul class="list-type">
        <li v-for="(item, index) in formProps.listItems" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BtnType2Components from '../../components/Mo/Buttons/BtnType2.vue'

// Props 정의
const props = defineProps<{
  formProps: {
    title: string;
    buttonText: string;
    inputs: {
      placeholder: string; 
      type: string; 
      required: boolean;
    }[];
    listItems: string[];
  };
}>();

// 상태 관리 변수
const inputValues = ref<string[]>(props.formProps.inputs.map(() => ''));
const inputFocus = ref<boolean[]>(props.formProps.inputs.map(() => false));

// 인풋 포커스 핸들러
const handleFocus = (index: number) => {
  inputFocus.value[index] = true;
};

// 인풋 블러 핸들러
const handleBlur = (index: number) => {
  inputFocus.value[index] = false;
};

// 인풋 초기화 핸들러
const clearInput = (index: number) => {
  inputValues.value[index] = '';
};
</script>

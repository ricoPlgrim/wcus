<template>
  <div>
    <AddressBox 
      v-for="(address, index) in props.addresses" 
      :key="index" 
      :address="address" 
      :isActive="address.isActive"
      :isDefault="address.isDefault" 
      :type="address.type" 
      @delete="handleDelete(address)" 
      @edit="handleEdit(address)" 
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import AddressBox from './AddressBox.vue';

// Address 타입 정의
interface Address {
  name: string;
  company?: string;  // company 필드가 선택적임을 명시
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  tel: string;
  isActive: boolean;
  isDefault: boolean;
  type: string;
}


// Props 정의: 부모로부터 주소 리스트를 받음
const props = defineProps<{
  addresses: Address[];  // Address 타입의 배열
}>();

// 부모로 이벤트 전달을 위한 emit 정의
const emit = defineEmits(['delete', 'edit']);

// 삭제 처리 함수: address의 타입을 Address로 명시
const handleDelete = (address: Address) => {
  emit('delete', address);
};

// 수정 처리 함수: address의 타입을 Address로 명시
const handleEdit = (address: Address) => {
  emit('edit', address);
};
</script>

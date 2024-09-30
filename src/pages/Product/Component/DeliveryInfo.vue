<template>
  <!-- 배송 옵션을 표시하는 박스 -->
  <div class="delivery-box">
    <!-- 배송 옵션을 리스트 형식으로 반복하여 표시 -->
    <ul class="list-type">
      <li v-for="(option, index) in props.deliveryText" :key="index">{{ option.text }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">

// DeliveryOption 인터페이스 정의 (배송 옵션에 대한 타입 정의)
interface DeliveryOption {
  text: string;  // 각 배송 옵션의 텍스트
}

// 부모 컴포넌트로부터 전달받을 props 정의 (배송 옵션 목록)
const props = defineProps<{
  deliveryText: DeliveryOption[];  // DeliveryOption 타입의 배열을 props로 받음
}>();
</script>

<template>
    <div>
        <button :class="['btn-toggle', { active: isOpen }]"   @click="toggleContent">
            Shipping Fee<i class="ico-arr2"></i>
        </button>
        <p id="fee" class="toggle-box desc" v-if="isOpen">Coupon Code : TXCMV67890123490</p>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
// isOpen 상태 정의
const isOpen = ref(false);

// toggleContent 함수 정의
const toggleContent = () => {
    isOpen.value = !isOpen.value;
};
</script>
<style lang="scss" scoped>
@import '../../../assets/mo/css/common/mixin.scss';

.btn-toggle {
    font-size: toRem(12px);

    .ico-arr2 {
        margin-left: toRem(6px);
    }
    &.active {
        .ico-arr2 {
            transform: rotate(180deg);
        }
    }
}
.toggle-box {
    font-size: toRem(10px);
    padding-top: toRem(6px);
}
</style>

  
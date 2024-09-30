<template>
  <!-- 메세지 박스를 구성하는 div -->
  <div class="msg-box">
    <!-- ToolTip 컴포넌트 사용, props를 전달 -->
    <ToolTip
      :btnText="props.btnText"
      :tooltipContents="props.tooltipContents"
      :tooltipSub="props.tooltipSub"
      :tooltipSubText="props.tooltipSubText"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'; // defineProps 함수 import
import ToolTip from '../../../components/Mo/Tooltip/ToolTipComponent.vue'; // ToolTip 컴포넌트 import

// MsgBox에서 사용할 props 인터페이스 정의
interface MsgBoxProps {
  btnText: string;            // 버튼에 표시될 텍스트
  tooltipContents: string;     // 툴팁에 표시될 내용
  tooltipSub: boolean;        // 툴팁에 서브 내용이 포함되는지 여부
  tooltipSubText: string;     // 서브 텍스트 내용
}

// MsgBox에서 부모 컴포넌트로부터 props로 데이터를 받음
const props = defineProps<MsgBoxProps>();
</script>

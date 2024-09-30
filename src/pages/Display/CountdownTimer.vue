<template>
    <div class="scr-item plan-count">
      <p class="title">{{ timerProps.title }}</p>
      <div class="count-list">
        <div class="count-item">
          <div class="number">{{ days }}</div>
          <div class="label">DAYS</div>
        </div>
        <div class="count-colon">:</div>
        <div class="count-item">
          <div class="number">{{ hours }}</div>
          <div class="label">HRS</div>
        </div>
        <div class="count-colon">:</div>
        <div class="count-item">
          <div class="number">{{ minutes }}</div>
          <div class="label">MINS</div>
        </div>
        <div class="count-colon">:</div>
        <div class="count-item">
          <div class="number">{{ seconds }}</div>
          <div class="label">SECS</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  
  // Props 정의
  const props = defineProps<{
    timerProps: {
      title: string;  // 타이머 제목
      timer: string;  // 목표 날짜 (형식: YYYYMMDD)
    };
  }>();
  
  // 상태 관리 변수
  const days = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);
  
  let countdownInterval: ReturnType<typeof setInterval> | null = null;
  let alertTriggered = false; // 얼럿창 플래그값 추가
  
  // 날짜 문자열을 Date 객체로 변환하는 함수
  const parseDate = (dateString: string): Date => {
    const year = parseInt(dateString.slice(0, 4));
    const month = parseInt(dateString.slice(4, 6)) - 1; // 월은 0부터 시작
    const day = parseInt(dateString.slice(6, 8));
    return new Date(year, month, day, 0, 0, 0);
  };
  
  // 타이머 업데이트 함수
  const updateTimer = () => {
    const targetDate = parseDate(props.timerProps.timer);
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();
  
    if (timeDifference <= 0) {
      if (countdownInterval !== null) {
        clearInterval(countdownInterval);
      }
      days.value = 0;
      hours.value = 0;
      minutes.value = 0;
      seconds.value = 0;
  
      if (!alertTriggered) { // alert가 이미 호출되지 않았는지 확인
        alert('Time is up!'); // 시간이 끝났을 때 알림 표시
        alertTriggered = true; // 플래그 설정
      }
      return;
    }
  
    days.value = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((timeDifference % (1000 * 60)) / 1000);
  };
  
  // 컴포넌트가 마운트될 때 카운트다운 시작
  onMounted(() => {
    updateTimer(); // 초기 타이머 업데이트
    countdownInterval = setInterval(updateTimer, 1000); // 1초마다 타이머 업데이트
  });
  
  // 컴포넌트가 언마운트될 때 인터벌 정리
  onUnmounted(() => {
    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
    }
  });
  </script>
  
<template>
	<div ref="datepickerRef" class="input-text">
		<Datepicker v-model="selectedDate" :clearable="false" :week-start="0" :translations="translations"
			:enable-time-picker="false" auto-apply />
		<p class="form input-date">{{ formattedDate }}</p>
		<!-- https://lollaziest.tistory.com/228 사용설명서 -->
	</div>
</template>
  
<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

defineOptions({
	name: 'DatepickerComponent'
});

const selectedDate = ref<Date | null>(null);
const translations = {
	days: ['일', '월', '화', '수', '목', '금', '토'],
};
const datepickerRef = ref<HTMLElement | null>(null);
const monthNames = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

const formattedDate = computed(() => {
	if (selectedDate.value) {
		const date = new Date(selectedDate.value);
		const day = String(date.getDate()).padStart(2, '0');
		const month = monthNames[date.getMonth()]; // 영어 월 이름
		const year = date.getFullYear();
		return `${month} ${day}, ${year}`;
	}
	return '';
});

watch(selectedDate, (newValue) => {
	const element = datepickerRef.value;
	if (element) {
		if (newValue) {
			element.classList.add('focus');
		} else {
			element.classList.remove('focus');
		}
	}
});
</script>
  

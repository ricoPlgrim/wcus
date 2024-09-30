<template>
	<div :class="['pop-full', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-setting">
		<div class="dim" @click="closePopup"></div>
		<div class="pop-wrap">
			<div class="pop-title">
				<h3 class="title-type">APP Setting</h3>
				<button class="pop-close" @click="closePopup">
					<i class="ico-close"></i><span class="hidden">닫기</span>
				</button>
			</div>
			<div class="pop-content">
				<div class="setting-box">
					<div class="title-box">
						<button type="button" class="title-type4">Push Alarm Setting</button>
					</div>
					<div class="text-box">
						<p>Shopping Alarm</p>
						<p class="v2">You can quickly find various events and shopping information.</p>
					</div>
				</div>
				<div class="setting-box">
					<div class="title-box">
						<button type="button" class="title-type4">Set video autoplay</button>
					</div>
					<div class="text-box">
						<p>Play environment setting</p>
						<p class="v2">You can set the auto-play environment for videos running APP.</p>
					</div>
				</div>
				<div class="setting-box">
					<div class="title-box">
						<div class="title-type4">App Setting</div>
					</div>
					<div class="text-box">
						<p>Cash Delete</p>
						<p class="v2">Delete cached information stored on the device.<br>Current version 1.00 / latest
							version 1.01</p>
					</div>
					<div class="btn-box">
						<a href="#">Delete</a>
						<a href="#">Update</a>
					</div>
				</div>
				<div class="setting-box">
					<div class="title-box">
						<div class="title-type4">Device Feauture</div>
					</div>
					<div class="text-box">
						<p>Device Information</p>
						<p class="v2">iPhone 11 Pro</p>
					</div>
					<div class="text-box">
						<p>OS Information</p>
						<p class="v2">16.0.1</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, defineExpose } from 'vue';

const isVisible = ref(false);

const openPopup = () => {
	isVisible.value = true;
};

const closePopup = () => {
	isVisible.value = false;
};

watch(isVisible, (newVal) => {
	document.body.style.overflow = newVal ? 'hidden' : '';
});

defineExpose({ openPopup, closePopup });
</script>

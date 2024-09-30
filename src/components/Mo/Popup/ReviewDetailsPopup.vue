<template>
	<div :class="['pop-full', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-reviewImg">
		<div class="dim"></div>
		<div class="pop-wrap">
			<div class="pop-title2">
				<h3 class="title-type">View Details</h3>
				<button class="pop-close" @click="closePopup">
					<i class="ico-close"></i>
					<span class="hidden">Close</span>
				</button>
			</div>
			<div class="pop-content">
				<div class="swiper review-pop-swiper">
					<div class="swiper-wrapper">
						<div v-for="(image, idx) in review.images" :key="idx" class="swiper-slide"
							v-show="idx === selectedImageIndex">
							<img :src="image" alt="Selected Review Image" />
						</div>
					</div>
					<div class="swiper-pagination"></div>
				</div>

				<div class="review-wrap">
					<div class="review-item">
						<div class="item-option">
							<div class="name-box">
								<div class="star-rating">
									<div class="star" :style="{ width: `${review?.rating * 20}%` }">star</div>
								</div>
								<div class="name">{{ review?.name }}</div>
							</div>
							<div class="option-box">
								<span>Fit : <em>{{ review?.fit }}</em></span>
								<span>Purchased Size : <em>{{ review?.purchasedSize }}</em></span>
								<span>My Usual Size : <em>{{ review?.usualSize }}</em></span>
							</div>
						</div>
						<div class="item-cont">
							<div class="title">{{ review?.title }}</div>
							<div class="content">{{ review?.content }}</div>
						</div>
						<div class="item-reaction">
							<span class="date">{{ review?.date }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
  
  
<script setup lang="ts">
import { ref, watch, defineExpose, defineProps } from 'vue';

// Define props to receive the selected review from the parent component
const props = defineProps({
	review: {
		type: Object,
		required: true,
	},
	selectedImageIndex: {
		type: Number,
		required: true,
	}
});



// State to control the popup visibility
const isVisible = ref(false);

// Method to open the popup
const openPopup = () => {
	isVisible.value = true;
};

// Method to close the popup
const closePopup = () => {
	isVisible.value = false;
};

// Watch the popup state to manage body scroll lock when popup is visible
watch(isVisible, (newVal) => {
	document.body.style.overflow = newVal ? 'hidden' : '';
});

watch(() => props.review, (newReview) => {
	console.log("New review received:", newReview);
	if (newReview) {
		// Handle any logic when the review is set
	}
}, { immediate: true }); // The immediate option triggers the watcher immediately on component load.



// Expose methods so that the parent component can trigger opening and closing
defineExpose({ openPopup, closePopup });
</script>
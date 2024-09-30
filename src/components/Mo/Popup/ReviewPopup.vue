<template>
	<div :class="['pop-full', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-review">
		<div class="dim"></div>
		<div class="pop-wrap">
			<div class="pop-title2">
				<h3 class="title-type">{{ props.title }}</h3>
				<button class="pop-close" @click="closePopup">
					<i class="ico-close"></i>
					<span class="hidden">Close</span>
				</button>
			</div>
			<div class="pop-content">
				<div class="review-wrap">
					<div class="review-form form-wrap">
						<div class="form-item form-title">
							<label class="input-label">{{ props.contentData }}</label>
							<CustomScrollBox :customClass="customClass">
								<!-- <div class="chk-wrap custom-scroll"> -->
								<!-- 제품 옵션 출력 -->
								<div v-for="option in props.productOptions" :key="option.id"
									:class="['chk-box', { selected: option.selected }]">
									<input type="radio" :id="option.id" name="prdOption" :checked="option.selected"
										@change="selectOption(option.id)">
									<label class="checkbox" :for="option.id"></label>
									<label :for="option.id">{{ option.label }}</label>
								</div>
								<!-- </div> -->
							</CustomScrollBox>
						</div>
						<div :class="['form-item', 'form-rating', { 'selected': rating > 0 }]">
							<div class="star-wrap3 review">
								<label v-for="n in 5" :key="n" :aria-label="`${n} star`"
									:class="['label_star', { 'is-active': n <= rating }]">
									<i class="rating-star ico-star3"></i>
									<input class="input-star" type="radio" :id="`rating3-${n * 10}`" name="rating3"
										:value="n" v-model="rating" />
								</label>
							</div>
						</div>
						<div :class="['form-item', { 'error': nicknameError }]">
							<label class="input-label">
								Nickname<span class="required">*</span>
							</label>
							<div class="input-text">
								<input type="text" name="" id="nickname" v-model="nickname" placeholder="Nickname"
									:required="true" maxlength="10">
								<div class="form-btns">
									<button type="button" class="btn-clear" v-if="nickname" @click="clearInput('nickname')">
										<span class="hidden">Clear</span>
									</button>
								</div>
							</div>
							<p class="msg">{{ nicknameError }}</p>
						</div>
						<div :class="['form-item', { 'error': titleError }]">
							<label class="input-label">
								Title<span class="required">*</span>
							</label>
							<div class="input-text">
								<input type="text" name="" id="title" v-model="title" placeholder="Title" :required="true"
									maxlength="40">
								<div class="form-btns">
									<button type="button" class="btn-clear"  v-if="title" @click="clearInput('title')">
										<span class="hidden">Clear</span>
									</button>
								</div>
							</div>
							<p class="msg">{{ titleError }}</p>
						</div>
						<div :class="['form-item', { 'error': reviewTextError }]">
							<label class="input-label">
								Review<span class="required">*</span>
							</label>
							<div class="textarea-type">
								<textarea cols="30" rows="5" id="textarea" v-model="reviewText" maxlength="1000"
									placeholder="Review"></textarea>
								<span class="count">(<em>{{ reviewText.length }}</em>/<span
										class="maximum">1000</span>)</span>
							</div>
							<p class="msg">{{ reviewTextError }}</p>
						</div>
						<div :class="['form-item', { 'error': sizePurchasedError }]">
							<label class="input-label">
								Size Purchased
							</label>
							<div class="input-text">
								<input type="text" name="" id="size" v-model="sizePurchased" placeholder="Size Purchased"
									maxlength="10">
								<div class="form-btns">
									<button type="button" class="btn-clear" v-if="sizePurchased"  @click="clearInput('sizePurchased')">
										<span class="hidden">Clear</span>
									</button>
								</div>
							</div>
							<p class="msg">{{ sizePurchasedError }}</p>
						</div>
						<div :class="['form-item', { 'error': usualSizeError }]">
							<label class="input-label">
								My Usual Size
							</label>
							<div class="input-text">
								<input type="text" name="" id="size2" v-model="usualSize" placeholder="My Usual Size"
									maxlength="10">
								<div class="form-btns">
									<button type="button" class="btn-clear"  v-if="usualSize" @click="clearInput('usualSize')">
										<span class="hidden">Clear</span>
									</button>
								</div>
							</div>
							<p class="msg">{{ usualSizeError }}</p>
						</div>
						<div class="form-item">
							<label class="input-label">
								Fit<span class="required">*</span>
							</label>
							<div class="chk-box" v-for="fitOption in fitOptions" :key="fitOption.id">
								<input type="radio" :id="fitOption.id" name="fit" v-model="selectedFit"
									:value="fitOption.label">
								<label class="checkbox" :for="fitOption.id"></label>
								<label :for="fitOption.id">{{ fitOption.label }}</label>
							</div>
						</div>
						<div class="form-item">
							<label class="input-label">
								Image
							</label>
							<FileUpload />

							<ul class="list-type2">
								<li>Post a photo or video. Up to 4 files are possible including one video file.</li>
								<li>Text Review : 50 W Points (Worth $0.5 USD)</li>
								<li>Image Review : 200 W Points (Worth $2 USD)</li>
							</ul>
						</div>
						<div class="form-item">
							<div :class="['chk-box', { 'selected': agree }]">
								<input type="checkbox" id="agree" v-model="agree">
								<label class="checkbox" for="agree"></label>
								<label for="agree">{{ props.checkText }}</label>
							</div>
						</div>
					</div>
					<div class="btn-wrap">
						<button type="submit" class="btn-type v3" @click.prevent="submitReview">SUBMIT</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script setup lang="ts">
import { ref, watch, defineProps, defineExpose } from 'vue';
import CustomScrollBox from '../../../components/Mo/CustomScrollBox/CustomScrollBox.vue';
import FileUpload from '../../../components/Mo/Input/FileUpload.vue'

// props 정의
const props = defineProps<{
	title: string;
	contentData: string;
	checkText: string;
	productOptions: Array<{ id: string; label: string; selected: boolean }>;
}>();

// 팝업 보이기/숨기기 상태
const isVisible = ref(false);

// 별점 상태
const rating = ref(0);

// 리뷰 폼 데이터
const nickname = ref('');
const title = ref('');
const reviewText = ref('');
const sizePurchased = ref('');
const usualSize = ref('');
const selectedFit = ref('');
const agree = ref(false);

// 에러 메시지 상태
const nicknameError = ref('');
const titleError = ref('');
const reviewTextError = ref('');
const sizePurchasedError = ref('');
const usualSizeError = ref('');

// 옵션 선택 상태
const selectedOption = ref('');

// 핏 옵션 데이터
const fitOptions = [
	{ id: 'fit1', label: 'Runs Small' },
	{ id: 'fit2', label: 'True To size' },
	{ id: 'fit3', label: 'Runs Large' },
	{ id: 'fit4', label: 'No size Variation' }
];


// 옵션 선택 처리
const selectOption = (optionId: string) => {
	selectedOption.value = optionId;
};

// 팝업 열기 메서드
const openPopup = () => {
	isVisible.value = true;
};

// 팝업 닫기 메서드
const closePopup = () => {
	isVisible.value = false;
};

// 폼 초기화
const clearInput = (field: string) => {
	switch (field) {
		case 'nickname':
			nickname.value = '';
			break;
		case 'title':
			title.value = '';
			break;
		case 'sizePurchased':
			sizePurchased.value = '';
			break;
		case 'usualSize':
			usualSize.value = '';
			break;
	}
};


//커스텀 스크롤 클래스 추가

const customClass = "word-swiper";

// 리뷰 제출 로직
const submitReview = () => {

    // Nickname 검증
    if (!nickname.value) {
        nicknameError.value = 'Nickname is required.';
    } else {
        nicknameError.value = '';
    }

    // Title 검증
    if (!title.value) {
        titleError.value = 'Title is required.';
    } else {
        titleError.value = '';
    }

    // Review text 검증
    if (!reviewText.value) {
        reviewTextError.value = 'Review text is required.';
    } else {
        reviewTextError.value = '';
    }

    // 모든 에러가 없을 경우에만 폼을 제출하고 팝업을 닫음
    if (!nicknameError.value && !titleError.value && !reviewTextError.value) {
        alert('Review submitted successfully!');
        closePopup(); // 폼 제출 후 팝업 닫기
    }
};

watch(isVisible, (newVal) => {
	document.body.style.overflow = newVal ? 'hidden' : '';
});



defineExpose({ openPopup, closePopup });
</script>



<template>
  <div id="reviews" class="cont-box">
    <!-- 리뷰 상단 UI -->
    <div class="title-wrap">
      <h4 class="title-type3">Reviews</h4>
      <p>Leave your review to get up to 200 w points!</p>
    </div>

    <!-- 평균 평점 및 FIT 정보 -->
    <div class="prd-review-box">
      <!-- 평균 평점 표시 -->
      <div class="rating-wrap">
        <div class="star-rating2">
          <div class="star" :style="{ width: `${reviewData.averageRating * 20}%` }">star</div>
        </div>
        <div class="average">
          <span>{{ reviewData.averageRating.toFixed(1) }}</span>
        </div>
      </div>

      <!-- FIT 정보 표시 -->
      <div class="fit-wrap">
        <div class="title">
          FIT<i class="ico-fit"></i>
        </div>
        <div class="fit-info">
          <dl v-for="fit in reviewData.fitData" :key="fit.label">
            <dt>{{ fit.label }}</dt>
            <dd>{{ fit.percentage }}%</dd>
          </dl>
        </div>
      </div>

      <!-- 리뷰 작성 버튼 -->
      <button type="button" class="btn-type2 btn-write" @click="writeReview">WRITE REVIEW</button>

      <!-- 리뷰 목록 -->
      <div v-if="reviewData.reviews.length" class="review-wrap">
        <!-- 리뷰 상단 필터 및 정렬 -->
        <div class="review-top">
          <!-- 사진/비디오 보기 필터 -->
          <div :class="['chk-box', { selected: viewPhotos }]">
            <input type="checkbox" id="Photo" v-model="viewPhotos">
            <label class="checkbox" for="Photo"></label>
            <label for="Photo">View Photo/Video</label>
          </div>

          <!-- 정렬 팝업 열기 버튼 -->
          <button type="button" class="btn-sort" @click="openPopup('selectPopup')">
            <span>{{ selectedOption }}</span>
          </button>
          <SelectPopupLayer ref="selectPopup" :title="'Sort By'" :initialCheckedOptions="checkedOptions"
            @update:selectedOption="handleOptionSelected" />
        </div>

        <!-- 리뷰 항목들 -->
        <div class="review-list">
          <div v-for="(review, index) in filteredReviews" :key="review.id"
            :class="['review-item', { active: review.expanded }]">

            <!-- 리뷰 작성자 정보 및 별점 -->
            <div class="item-option">
              <div class="name-box">
                <div class="star-rating">
                  <div class="star" :style="{ width: `${review.rating * 20}%` }">star</div>
                </div>
                <div class="name">{{ review.name }}</div>
              </div>
              <!-- 제품 정보 -->
              <div class="option-box">
                <span>Fit : <em>{{ review.fit }}</em></span>
                <span>Purchased Size : <em>{{ review.purchasedSize }}</em></span>
                <span>My Usual Size : <em>{{ review.usualSize }}</em></span>
              </div>
            </div>

            <!-- 리뷰 내용 -->
            <div class="item-cont">
              <div class="title">{{ review.title }}</div>
              <div :class="['content', { more: isLongContent[index] }]" :ref="el => setContentRef(el, index)">
                {{ review.content }}
                <button v-if="isLongContent[index]" type="button" class="btn-more" @click="expandReview(review)">
                  {{ review.expanded ? 'Less' : 'More' }}
                </button>
              </div>
            </div>

            <!-- 이미지 및 비디오 렌더링 -->
            <div v-if="(review.images && review.images.length) || (review.videos && review.videos.length)"
              class="item-img">
              <div class="review-img">
                <ul>
                  <!-- 이미지 및 비디오 리스트를 순회하며 렌더링 -->
                  <li v-for="(media, idx) in getMediaList(review)" :key="idx">
                    <div class="img-box">
                      <a href="javascript:;" @click="openReviewDetailPopup(review, idx)">
                        <img v-if="media.type === 'image'" :src="media.src" />
                        <img v-else-if="media.type === 'video'" :src="media.videoImg || 'default-thumbnail.jpg'" />
                        <span v-if="media.type === 'video'" class="tag-type video-type"><i
                            class="ico-play v2">Video</i></span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 관리자 답변 -->
            <div v-if="review.reply" class="item-reply">
              <div class="title">Admin</div>
              <div class="content">
                {{ review.reply }}
              </div>
            </div>

            <!-- 리뷰 반응 및 유용한 버튼 -->
            <div class="item-reaction">
              <span class="date">{{ review.date }}</span>
              <div class="helpful">
                <button type="button" class="btn-helpful" :class="{ active: review.isHelpfulActive }"
                  @click="toggleHelpful(review)">
                  Helpful
                </button>
                <em>{{ review.helpful }}</em>
              </div>
            </div>
          </div>
        </div>

        <!-- 페이지네이션 -->
        <PaginationComponents :totalPages="5" />
      </div>
    </div>

    <!-- 팝업 및 알림 컴포넌트 -->
    <ReviewAlert ref="basicPopup" description="You must own this item to write a customer review." checkText="OK" />
    <ReviewPopup ref="reviewPopup" :title="reviewWriteData.title" :contentData="reviewWriteData.contentData"
      :checkText="reviewWriteData.checkText" :productOptions="reviewWriteData.productOptions" />
    <ReviewDetailPopup ref="reviewDetailPopup" v-if="selectedReview && selectedImageIndex !== null" :review="selectedReview"
      :selectedImageIndex="selectedImageIndex" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, nextTick, ComponentPublicInstance } from 'vue';
import PaginationComponents from '../../../components/Mo/Paging/PaginationComponent.vue';
import ReviewAlert from '../../../components/Mo/Popup/BasicPopup.vue';
import ReviewPopup from '../../../components/Mo/Popup/ReviewPopup.vue';
import SelectPopupLayer from '../../../components/Mo/Popup/SortPopup.vue';
import ReviewDetailPopup from '../../../components/Mo/Popup/ReviewDetailsPopup.vue';

// 리뷰 정렬 옵션 타입 정의
type OptionKey = 'Newest' | 'Most Helpful' | 'Highest Rated' | 'Lowest Rated';

// Review 인터페이스 정의
interface Review {
  id: number;
  name: string;
  rating: number;
  fit: string;
  purchasedSize: string;
  usualSize: string;
  title: string;
  content: string;
  expanded: boolean;
  images: string[];
  date: string;
  helpful: number;
  reply?: string;
  videos: { src: string; videoImg?: string }[];
  isHelpfulActive?: boolean;
}

// props로 reviewData 수신
const props = defineProps<{
  reviewData: {
    averageRating: number;
    fitData: { label: string, percentage: number }[];
    reviews: Review[];
  };
}>();

// 상태 관리
const viewPhotos = ref(false); // 사진/비디오 필터링
const isLongContent = ref<boolean[]>([]); // 긴 내용 관리

// 로그인 여부 관리
const loginCheck = ref(false); // false는 로그인 상태를 의미

// 리뷰 작성 데이터
const reviewWriteData = ref({
  title: 'Write a Review',
  contentData: 'Please select your purchased product and write your review.',
  checkText: 'Subject to data protection regulations, I agree to the use of name for account identification and communication purposes.',
  productOptions: [
    { id: 'prdOption1', label: 'Option1, Option2, Option3', selected: false },
    { id: 'prdOption2', label: 'L, Blue, City', selected: false },
    { id: 'prdOption3', label: 'XL, Pink, City', selected: false },
    { id: 'prdOption4', label: 'M, Green, City', selected: false },
    { id: 'prdOption5', label: 'S, Black, City', selected: false }
  ]
});

// 미디어 리스트 생성 함수
const getMediaList = (review: Review) => {
  const images = review.images.map((src: string) => ({ type: 'image', src }));
  const videos = review.videos.map((video) => ({
    type: 'video',
    src: video.src,
    videoImg: video.videoImg || 'default-thumbnail.jpg'
  }));
  return [...images, ...videos];
};

// 리뷰 작성 팝업 열기
const writeReview = () => {
  if (loginCheck.value) {
    if (basicPopup.value) {
      basicPopup.value.openPopup();
    }
  } else {
    if (reviewPopup.value) {
      reviewPopup.value.openPopup();
    }
  }
};

// 리뷰 확장 토글
const expandReview = (review: Review) => {
  review.expanded = !review.expanded;
};

// 유용한 버튼 토글
const toggleHelpful = (review: Review) => {
  review.helpful += review.isHelpfulActive ? -1 : 1;
  review.isHelpfulActive = !review.isHelpfulActive;
};

// 긴 내용 여부 확인
const setContentRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  const element = (el as HTMLElement | null);
  if (element && element instanceof HTMLElement) {
    nextTick(() => {
      const lineHeight = parseInt(getComputedStyle(element).lineHeight, 10);
      const lines = Math.floor(element.scrollHeight / lineHeight);
      isLongContent.value[index] = lines > 4;
    });
  }
};

// 팝업 컴포넌트 참조
const basicPopup = ref<InstanceType<typeof ReviewAlert> | null>(null);
const reviewPopup = ref<InstanceType<typeof ReviewPopup> | null>(null);
const selectPopup = ref<InstanceType<typeof SelectPopupLayer> | null>(null);
const reviewDetailPopup = ref<InstanceType<typeof ReviewDetailPopup> | null>(null);

// 리뷰 필터링
const filteredReviews = computed(() => {
  return props.reviewData.reviews.filter((review) => !viewPhotos.value || (review.images && review.images.length > 0));
});

// 선택된 정렬 옵션
const selectedOption = ref<OptionKey>('Newest');

// 정렬 옵션 초기 값 설정
const checkedOptions = ref<Record<OptionKey, boolean>>({
  'Newest': true,
  'Most Helpful': false,
  'Highest Rated': false,
  'Lowest Rated': false,
});

// 정렬 옵션 선택 시 처리
const handleOptionSelected = (option: OptionKey) => {
  selectedOption.value = option;
  for (const key in checkedOptions.value) {
    checkedOptions.value[key as OptionKey] = key === option;
  }
};

// 팝업 열기
const openPopup = (popupName: string) => {
  if (popupName === 'selectPopup') {
    selectPopup.value?.openPopup();
  }
};

// 리뷰 상세 팝업 열기
const selectedReview = ref<Review | null>(null);
const selectedImageIndex = ref<number | null>(null);

const openReviewDetailPopup = (review: Review, mediaIndex: number) => {
  selectedReview.value = review;
  selectedImageIndex.value = mediaIndex;
  reviewDetailPopup.value?.openPopup();
};

</script>

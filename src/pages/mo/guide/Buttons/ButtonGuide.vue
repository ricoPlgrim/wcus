<template>
	<AsideNav />
	<div class="page-guide-content">
		<h2 class="page-guide-title">BUTTON</h2>
		<h3 class="page-guide-title2">btn-type</h3>
		<div class="page-guide-box">
			<p class="text">* button / a 태그 구분해서 사용하기</p>
			<p class="text">* height 50px</p><br>
			<BtnType1Components :buttons="[{ href: '#', text: 'Button 1', classes: 'btn-type btn-full' }]" />
			<BtnType1Components :buttons="[{ href: '#', text: 'Button 2', classes: 'btn-type btn-full v2' }]" />
			<BtnType1Components :buttons="[{ href: '#', text: 'Button 3', classes: 'btn-type btn-full v3' }]" />
			<BtnType1Components :buttons="[{ href: '#', text: 'Button 4', classes: 'btn-type btn-full v4' }]" />
			<BtnType1Components :buttons="[{ href: '#', text: 'Button 5', classes: 'btn-type btn-full disabled' }]" />
			<BtnType1Components :buttons="[
				{ href: '#', text: 'half 1', classes: 'btn-type' },
				{ href: '#', text: 'half 2', classes: 'btn-type v3' }
			]" />
			<BtnType1Components :buttons="[
				{ href: '#', text: 'half 1', classes: 'btn-type' },
				{ href: '#', text: 'half 2', classes: 'btn-type v3' }
			]" />
		</div>

		<h3 class="page-guide-title2">btn-type2</h3>
		<div class="page-guide-box">
			<p class="text">* height 40px</p><br>

			<BtnType2Components :buttons="[
				{ href: '#', text: 'Button 1', classes: 'btn-type2' },
				{ href: '#', text: 'Button 2', classes: 'btn-type2 v3' },
				{ href: '#', text: 'Button 3', classes: 'btn-type2 disabled' }
			]" />

			<BtnType2Components :buttons="[
				{ href: '#', text: 'Button 1', classes: 'btn-type2 v2' },
				{ href: '#', text: 'Button 2', classes: 'btn-type2 v5' }
			]" wrapperClass="btn-wrap v2" />

			<BtnType2Components :buttons="[
				{ href: '#', text: 'Button 1', classes: 'btn-type2 disabled' },
				{ href: '#', text: 'Button 2', classes: 'btn-type2 v5' }
			]" wrapperClass="btn-wrap v2" />

			<BtnType2Components :buttons="[
				{ href: '#', text: 'Button 1', classes: 'btn-type2 v2' }
			]" />

			<BtnType2Components :buttons="[
				{ href: '#', text: 'Button 1', classes: 'btn-type2' }
			]" />

			<BtnType2Components :buttons="[
				{ href: '#', text: 'Button 1', classes: 'btn-type2 v2' },
				{ href: '#', text: 'Button 2', classes: 'btn-type2 v2' },
				{ href: '#', text: 'Button 3', classes: 'btn-type2' }
			]" wrapperClass="btn-wrap v2" />

			<BtnType2Components :buttons="[
				{ href: '#', text: 'Button 1', classes: 'btn-type2 v2' },
				{ href: '#', text: 'Button 2', classes: 'btn-type2' }
			]" wrapperClass="btn-wrap v2" />

		</div>

		<h3 class="page-guide-title2">btn-type3 fixed</h3>
		<div class="page-guide-box">

			<FixedBtnComponents buttonText="ADD TO CART" buttonClass="btn-type3 v3" :style="{ position: 'relative' }" />
			<br>
			<FixedBtnComponents buttonText="OUT OF STOCK" buttonTextSecondLine="Restock Notification"
				buttonClass="btn-type3 v3" buttonClasses="v2" :style="{ position: 'relative' }" />
			<br>
			<FixedBtnComponents buttonText="CURRENTLY UNAVAILABLE" buttonClass="btn-type3 disabled" :isDisabled="true"
				:style="{ position: 'relative' }" />
			<br>
			<FixedBtnComponents buttonText="" buttonClass="btn-type3 v3" :showWishButton="false" total="total of 6"
				order="$255,000 Order" :style="{ position: 'relative' }" />

		</div>

		<h3 class="page-guide-title2">btn-type4</h3>

		<div class="page-guide-box">
			<a href="#" class="btn-type4">
				<span>Join membership</span>
				<i class="ico-arr2 right"><span class="hidden">Next</span></i>
			</a><br>
			<a href="#" class="btn-type4 v2">Find ID<span>Find ID</span></a><br>
			<a href="#" class="btn-type4 v3">Non-member order check</a><br>
			<a href="#" class="btn-type4 v4">i'll get it later</a><br>
			<a href="#" class="btn-type4 v5">later</a><br>
			<a href="#" class="btn-type4 bd">View the entire exhibition</a>
		</div>

		<h3 class="page-guide-title2">btn-type5</h3>
		<div class="page-guide-box">
			<p class="text">* popup 안에 사용하는 버튼</p><br>

			<BtnType5Components buttonText1="First Button" buttonText2="Second Button" />

		</div>

		<h3 class="page-guide-title2">tab</h3>
		<div class="page-guide-box">
			<h3 class="page-guide-title3">tab-type</h3>
			<!-- tab -->
			<TabComponent :tabs="detailsTabs" tabClass="tab-type" />

			<br><br>
			<h3 class="page-guide-title3">tab-type2</h3>

			<TabComponent :tabs="categoryTabs" tabClass="tab-type2" />

			<h3 class="page-guide-title3">tab-type2 v2</h3>

			<TabComponent :tabs="itemTabs" tabClass="tab-type2 v2" />

		</div>


		<h3 class="page-guide-title2">paging</h3>
		<div class="page-guide-box">

			<PaginationComponents :totalPages="1" />
			<PaginationComponents :totalPages="1" :active="true" /> <!--active true일 경우 disabled 추가-->
			<PaginationComponents :totalPages="5" />

			<MoreTotalComponents :currentNum="1" :totalPage="8" />

		</div>
	</div>
</template>
    
<script setup lang="ts">
import { ref } from 'vue';
import AsideNav from '../Gnb/AsideNav.vue';
import BtnType1Components from '../../../../components/Mo/Buttons/BtnType1.vue';
import BtnType2Components from '../../../../components/Mo/Buttons/BtnType2.vue';
import FixedBtnComponents from '../../../../components/Mo/Buttons/FixedBtn.vue';
import BtnType5Components from '../../../../components/Mo/Buttons/BtnType5.vue';
import TabComponent from '../../../../components/Mo/Buttons/TabBtn.vue';
import PaginationComponents from '../../../../components/Mo/Paging/PaginationComponent.vue';
import MoreTotalComponents from '../../../../components/Mo/Buttons/MoreBtn.vue';

// 탭 인터페이스 정의
interface Tab {
	href: string;
	text: string;
	dataText?: string;
	count?: number;
}

defineOptions({
	name: 'ButtonGuide'
});

// 탭 데이터 정의
const detailsTabs = ref<Tab[]>([
	{ href: 'javascript:;', text: 'Details', dataText: 'Details' },
	{ href: 'javascript:;', text: 'Reviews', dataText: 'Reviews', count: 80 },
	{ href: 'javascript:;', text: 'Recommend', dataText: 'Recommend' },
]);

const categoryTabs = ref<Tab[]>([
	{ href: '#women', text: 'WOMEN', dataText: 'WOMEN' },
	{ href: '#men', text: 'MEN', dataText: 'MEN' },
	{ href: '#kbeauty', text: 'K-BEAUTY', dataText: 'K-BEAUTY' },
	{ href: '#life', text: 'LIFE', dataText: 'LIFE' },
]);

const itemTabs = ref<Tab[]>([
	{ href: '#item', text: 'ITEM', dataText: 'ITEM' },
	{ href: '#brand', text: 'BRAND', dataText: 'BRAND' },
	{ href: '#style', text: 'STYLE', dataText: 'STYLE' },
	{ href: '#feed', text: 'FEED', dataText: 'FEED' },
]);
</script>
<template>
	<AsideNav />
	<div class="page-guide-content">
		<h2 class="page-guide-title">FORM</h2>

		<h3 class="page-guide-title2">text</h3>
		<div class="page-guide-box form-wrap">

			<div class="form-item">
				<label class="input-label">name<span class="required">*</span></label>
				<div class="input-text">
					<div class="input-text">
						<input type="text" name="" id="name" value="sally">
						<div class="form-btns">
							<button type="button" class="btn-clear">
								<span class="hidden">Clear</span>
							</button>
						</div>
					</div>
				</div>
				<p class="msg">error msg</p>
			</div>

			<div class="form-item error">
				<label class="input-label">name<span class="required">*</span></label>
				<div class="input-text">
					<input type="text" name="" id="name2" value="sall^^^^y!">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
				</div>
				<p class="msg">error msg</p>
			</div>

			<div class="form-item">
				<label class="input-label">
					Email Address<span class="required">*</span>
				</label>
				<div class="input-text">
					<input type="email" name="" id="email" value="" placeholder="email" required="">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
				</div>
				<p class="msg">error msg</p>
			</div>

			<div class="form-item">
				<label class="input-label">
					name<span class="required">*</span>
				</label>
				<div class="input-text">
					<input type="text" name="" id="name3" value="No coupons available" disabled="">
				</div>
			</div>

			<div class="form-item">
				<label class="input-label">
					name<span class="required">*</span>
				</label>
				<div class="input-text">
					<input type="text" name="" id="name4" value="sally" placeholder="Name">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
				</div>
				<p class="msg">error msg</p>
			</div>

			<div class="form-item error">
				<label class="input-label">
					PASSWORD
				</label>
				<div class="input-text">
					<input type="password" name="" id="password" value="123456789!" placeholder="Password">
					<div class="form-btns">
						<button type="button" class="btn-clear" style="display:inline-block">
							<span class="hidden">Clear</span>
						</button>
						<button type="button" class="btn-eye" style="display:inline-block">
							<span class="hidden">Eye</span>
						</button>
					</div>
				</div>
				<ul class="msg list-type">
					<li>Include at least 3 classes : uppercase, lowercase, digits, special characters</li>
					<li>8-20 characters</li>
					<li>No spaces</li>
				</ul>
			</div>

			<div class="form-item">
				<label class="input-label">
					PASSWORD
				</label>
				<div class="input-text">
					<input type="password" name="" id="password" value="123456789!" placeholder="Password">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
						<button type="button" class="btn-eye">
							<span class="hidden">Eye</span>
						</button>
					</div>
				</div>
				<p class="msg">error msg</p>
			</div>

			<div class="form-item">
				<label class="input-label tooltip-text">
					<span>PHONE NUMBER<em class="required">*</em></span>
					<span class="tooltip-btn"><i class="ico-info"></i></span>
				</label>
				<div class="tooltip-box">
					Subject to data protection regulations
				</div>
				<div class="input-text phone">
					<span class="country-code">+1</span>
					<input type="number" name="" id="name5" placeholder="US Phone Number ONLY">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
				</div>
				<p class="msg">error msg</p>
			</div>
			<div class="form-item date">
				<label class="input-label">
					DATE
				</label>
				<div class="input-text">
					<input type="date" name="" id="date" value="" placeholder="yyyy-mm-dd" lang="en-us" required="">
				</div>
				<p class="msg">error msg</p>
			</div>
			<div class="form-item">
				<div class="textarea-type">
					<textarea cols="30" rows="5" id="textarea" maxlength="500" placeholder="Leave a comment"></textarea>
					<span class="count">(<em class="current">0</em>/<span class="maximum">500</span>)</span>
				</div>
				<p class="msg">error msg</p>
			</div>
			<div class="form-item">
				<div class="textarea-type">
					<textarea cols="30" rows="5" id="textarea" maxlength="500" placeholder="Leave a comment"
						disabled="">It's very good, it's cool~ It's a good fit, and I want to give it to my friends as a gift.</textarea>
				</div>
			</div>
		</div>
		<h3 class="page-guide-title2">text group</h3>
		<div class="page-guide-box form-wrap">
			<h4>col form</h4>
			<div class="form-item">
				<label class="input-label">
					NAME
				</label>
				<div class="col input-text">
					<input type="text" name="name" id="name" value="" placeholder="First Name" required="">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
				</div>
				<div class="col input-text">
					<input type="text" name="name2" id="name2" value="" placeholder="Last Name" required="">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
				</div>
				<p class="msg">error msg</p>
			</div>
			<div class="form-item error">
				<div class="col input-text">
					<input type="text" name="name" id="name" value="" placeholder="First Name" required="">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
				</div>
				<div class="col input-text">
					<input type="text" name="name2" id="name2" value="" placeholder="Last Name" required="">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
				</div>
				<p class="msg">error msg</p>
			</div>
			<div class="form-item">
				<div class="col v2 input-text">
					<input type="text" name="name" id="name" value="form-item > col v2" placeholder="fffffffff">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
				</div>
				<button class="btn-type2 v3">Apply</button>
				<p class="msg">error msg</p>
			</div>
		</div>

		<h3 class="page-guide-title2">select</h3>
		<div class="page-guide-box">
			<h4>basic</h4>
			<CustomSelect :options="selectOptions" :disabled="false" initialSelected="newst" type="native"
				typeClass="select-type" @change="handleSelectChange" />
			<br><br>
			<h4>ul li: type 1</h4>
			<CustomSelect :options="selectOptionsWithDisabled" :disabled="false" initialSelected="newst" type="custom"
				typeClass="select-type2" @change="handleSelectChange" />
			<br>
			<CustomSelect :options="selectOptionsWithDisabled" :disabled="true" initialSelected="newst" type="custom"
				typeClass="select-type2" @change="handleSelectChange" />
			<br><br>
			<h4>ul li: type 2</h4>
			<CustomSelect :options="selectOptions" :disabled="false" initialSelected="newst" type="custom"
				typeClass="select-type3" @change="handleSelectChange" />
		</div>

		<h3 class="page-guide-title2">check box</h3>
		<div class="page-guide-box">
			<div class="chk-box">
				<input type="checkbox" id="test2">
				<label class="checkbox" for="test2"></label>
				<label for="test2">ckeck1</label>
			</div>
			<div class="chk-box">
				<input type="checkbox" id="test6">
				<label class="checkbox" for="test6"></label>
				<label for="test6">Msg&amp;data rates may apply. I agree to receive marketing messages that may be generated
					by an automated dialer from w concept to this number. Consent is not required to make a purchase.
					Account Information will be automatically updated with this number.</label>
			</div>
			<div class="chk-box selected">
				<input type="checkbox" id="test">
				<label class="checkbox" for="test"></label>
				<label for="test">ckeck2</label>
			</div>
			<div class="chk-box">
				<input type="checkbox" id="test3" >
				<label class="checkbox" for="test3"></label>
				<label for="test3">disabled ckeck</label>
			</div>
			<br><br>
			<div class="chk-box2">
				<input type="checkbox" id="test4">
				<label class="checkbox" for="test4"></label>
				<label for="test4">ckeck4</label>
			</div>
			<div class="chk-box2 selected">
				<input type="checkbox" id="test5" checked="">
				<label class="checkbox" for="test5"></label>
				<label for="test5">ckeck5</label>
			</div>
		</div>

		<h3 class="page-guide-title2">radio</h3>
		<div class="page-guide-box">
			<div class="chk-box">
				<input type="radio" id="radio" name="radio">
				<label class="checkbox" for="radio"></label>
				<label for="radio">radio1</label>
			</div>
			<div class="chk-box selected">
				<input type="radio" id="radio2" name="radio" checked="">
				<label class="checkbox" for="radio2"></label>
				<label for="radio2">radio2</label>
			</div>
			<div class="chk-box">
				<input type="radio" id="radio3" name="radio" disabled="">
				<label class="checkbox" for="radio3"></label>
				<label for="radio3">disabled radio</label>
			</div>
		</div>

		<h3 class="page-guide-title2">switch</h3>
		<div class="page-guide-box">
			<div class="switch-box">
				<input type="checkbox" id="switch">
				<label class="checkbox" for="switch"></label>
			</div>
		</div>
		<div class="page-guide-box">
			<div class="switch-box2">
				<input type="checkbox" id="switch2">
				<label class="checkbox" for="switch2"></label>
			</div>
		</div>

		<h3 class="page-guide-title2">quantity</h3>
		<QuantityControl />
		<QuantityControl :disabled="true" />
		<QuantityControl class="disabled" />
		<QuantityControl class="full" />

		<h3 class="page-guide-title2">file upload</h3>
		<div class="page-guide-box">
			<FileUpload />
		</div>

		<h3 class="page-guide-title2">search</h3>
		<div class="page-guide-box">
			<div class="search-form form-item">
				<div class="input-text">
					<input type="text" name="" id="sch" value="" placeholder="Search">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
						<button type="button" class="btn-search">
							<span class="hidden">Search</span>
						</button>
					</div>
				</div>
			</div>
			<div class="search-form form-item v2">
				<div class="input-text">
					<input type="text" name="" id="sch" value="" placeholder="Search">
					<div class="form-btns">
						<button type="button" class="btn-clear">
							<span class="hidden">Clear</span>
						</button>
					</div>
					<button type="button" class="btn-search">
						<span class="hidden">Search</span>
					</button>
				</div>
			</div>
		</div>

		<h3 class="page-guide-title2">datepicker</h3>
		<div class="page-guide-box">
			<div class="form-item datepicker">
				<label class="input-label">Date of Birth</label>
				<Datepicker />
			</div>
		</div>
	</div>
</template>
    
<script setup lang="ts">
	import { ref } from 'vue';
	import AsideNav from '../Gnb/AsideNav.vue';
	import QuantityControl from '../../../../components/Mo/Quantity/QuantityGuide.vue';
	import CustomSelect from '../../../../components/Mo/Select/CustomSelect.vue';
	import FileUpload from '../../../../components/Mo/Input/FileUpload.vue';
	import Datepicker from '../../../../components/Mo/Input/DatepickerComponent.vue';

	const selectOptions = ref([
	  { label: 'Newst', value: 'newst' },
	  { label: 'Oldest', value: 'oldest' },
	]);

	const selectOptionsWithDisabled = ref([
	  { label: 'Newst', value: 'newst' },
	  { label: 'Oldest', value: 'oldest', disabled: true },
	  { label: 'Most Popular', value: 'most_popular' },
	]);

	const handleSelectChange = (value: string) => {
	  console.log('Selected value:', value);
	};
</script>
<style scoped></style>
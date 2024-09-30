<template>
    <AsideNav />
    <div class="page-guide-content">
        <h2 class="page-guide-title">component</h2>

        <h3 class="page-guide-title2">toggle</h3>
        <div class="page-guide-box">
            <ToggleList />
        </div>

        <div class="page-guide-box">
            <ToggleEtc />
        </div>

        <h3 class="page-guide-title2">accordian</h3>
        <div class="page-guide-box">
            <AccordionComponent>
                <AccordionItem title="T-Shirts">
                    여기가 텍스트 나오는 곳
                </AccordionItem>
                <AccordionItem title="T-Shirts type2">
                    여기가 텍스트 나오는 곳
                </AccordionItem>
            </AccordionComponent>
        </div>

        <h3 class="page-guide-title2">star</h3>
        <div class="page-guide-box">
            <h4>basic : width 0~100%</h4>
            <div class="star-rating">
                <div class="star" style="width:0%">star</div>
            </div>
            <div class="star-rating">
                <div class="star" style="width:30%">star</div>
            </div>
            <div class="star-rating">
                <div class="star" style="width:50%">star</div>
            </div>
            <div class="star-rating">
                <div class="star" style="width:80%">star</div>
            </div>
            <div class="star-rating">
                <div class="star" style="width:100%">star</div>
            </div>

            <br /><br />
            <div class="star-rating2">
                <div class="star" style="width:0%">star</div>
            </div>
            <div class="star-rating2">
                <div class="star" style="width:30%">star</div>
            </div>
            <div class="star-rating2">
                <div class="star" style="width:50%">star</div>
            </div>
            <div class="star-rating2">
                <div class="star" style="width:80%">star</div>
            </div>
            <div class="star-rating2">
                <div class="star" style="width:90%">star</div>
            </div>
            <div class="star-rating2">
                <div class="star" style="width:100%">star</div>
            </div>

            <br /><br />
            <h4>click star rating</h4>
            <div class="star-wrap">
                <input class="input-star input-star-none" name="rating" id="rating-0" value="0" type="radio" />
                <label aria-label="0 stars" class="label_star" for="rating-0"></label>

                <label aria-label="0.5 stars" class="label_star label_star_half" for="rating-05"><i
                        class="rating-star ico-star-half"></i></label>
                <input class="input-star" name="rating" id="rating-05" value="0.5" type="radio" />

                <label aria-label="1 star" class="label_star" for="rating-10"><i class="rating-star ico-star"></i></label>
                <input class="input-star" name="rating" id="rating-10" value="1" type="radio" />

                <label aria-label="1.5 stars" class="label_star label_star_half" for="rating-15"><i
                        class="rating-star ico-star-half"></i></label>
                <input class="input-star" name="rating" id="rating-15" value="1.5" type="radio" checked />

                <label aria-label="2 stars" class="label_star" for="rating-20"><i class="rating-star ico-star"></i></label>
                <input class="input-star" name="rating" id="rating-20" value="2" type="radio" />

                <label aria-label="2.5 stars" class="label_star label_star_half" for="rating-25"><i
                        class="rating-star ico-star-half"></i></label>
                <input class="input-star" name="rating" id="rating-25" value="2.5" type="radio" />

                <label aria-label="3 stars" class="label_star" for="rating-30"><i class="rating-star ico-star"></i></label>
                <input class="input-star" name="rating" id="rating-30" value="3" type="radio" />

                <label aria-label="3.5 stars" class="label_star label_star_half" for="rating-35"><i
                        class="rating-star ico-star-half"></i></label>
                <input class="input-star" name="rating" id="rating-35" value="3.5" type="radio" />

                <label aria-label="4 stars" class="label_star" for="rating-40"><i class="rating-star ico-star"></i></label>
                <input class="input-star" name="rating" id="rating-40" value="4" type="radio" />

                <label aria-label="4.5 stars" class="label_star label_star_half" for="rating-45"><i
                        class="rating-star ico-star-half"></i></label>
                <input class="input-star" name="rating" id="rating-45" value="4.5" type="radio" />

                <label aria-label="5 stars" class="label_star" for="rating-50"><i class="rating-star ico-star"></i></label>
                <input class="input-star" name="rating" id="rating-50" value="5" type="radio" />
            </div>

            <br /><br />
            <div class="star-wrap2 selected">
                <input class="input-star input-star-none" name="rating2" id="rating2-0" value="0" type="radio" />
                <label aria-label="0 stars" class="label_star" for="rating2-0"></label>

                <label aria-label="1 star" class="label_star" for="rating2-10"><i class="rating-star ico-star2"></i></label>
                <input class="input-star" name="rating2" id="rating2-10" value="1" type="radio" />

                <label aria-label="2 stars" class="label_star" for="rating2-20"><i
                        class="rating-star ico-star2"></i></label>
                <input class="input-star" name="rating2" id="rating2-20" value="2" type="radio" />

                <label aria-label="3 stars" class="label_star" for="rating2-30"><i
                        class="rating-star ico-star2"></i></label>
                <input class="input-star" name="rating2" id="rating2-30" value="3" type="radio" />

                <label aria-label="4 stars" class="label_star" for="rating2-40"><i
                        class="rating-star ico-star2"></i></label>
                <input class="input-star" name="rating2" id="rating2-40" value="4" type="radio" />

                <label aria-label="5 stars" class="label_star" for="rating2-50"><i
                        class="rating-star ico-star2"></i></label>
                <input class="input-star" name="rating2" id="rating2-50" value="5" type="radio" checked />
            </div>

            <br /><br />
            <div class="star-wrap3 selected">
                <input class="input-star input-star-none" name="rating3" id="rating3-0" value="0" type="radio" />
                <label aria-label="0 stars" class="label_star" for="rating3-0"></label>

                <label aria-label="1 star" class="label_star" for="rating3-10"><i class="rating-star ico-star3"></i></label>
                <input class="input-star" name="rating3" id="rating3-10" value="1" type="radio" />

                <label aria-label="2 stars" class="label_star" for="rating3-20"><i
                        class="rating-star ico-star3"></i></label>
                <input class="input-star" name="rating3" id="rating3-20" value="2" type="radio" />

                <label aria-label="3 stars" class="label_star" for="rating3-30"><i
                        class="rating-star ico-star3"></i></label>
                <input class="input-star" name="rating3" id="rating3-30" value="3" type="radio" />

                <label aria-label="4 stars" class="label_star" for="rating3-40"><i
                        class="rating-star ico-star3"></i></label>
                <input class="input-star" name="rating3" id="rating3-40" value="4" type="radio" />

                <label aria-label="5 stars" class="label_star" for="rating3-50"><i
                        class="rating-star ico-star3"></i></label>
                <input class="input-star" name="rating3" id="rating3-50" value="5" type="radio" checked />
            </div>
        </div>

        <h3 class="page-guide-title2">product list</h3>
        <div class="page-guide-box">
            <div class="product-top">
                <div class="prd-mode">
                    <div class="chk-box">
                        <input type="checkbox" id="saleChk" />
                        <label class="checkbox" for="saleChk"></label>
                        <label for="saleChk">Sale Only</label>
                    </div>
                    <!-- <button type="button" class="btn-mode">2개</button> -->
                    <!-- <button type="button" class="btn-mode mode4">4개</button> -->
                    <span class="count"><em>99</em> items</span>
                </div>
                <div class="prd-type">
                    <button type="button" @click="openPopup('filterPopup')">Filter<i class="ico-filter"></i></button>
                    <button type="button">Sort<i class="ico-sort"></i></button>
                </div>
            </div>
            <ProductList  :showPromotion="true" :products="products" :showRanking="false"  />
            <FilterPopupLayer ref="filterPopup"  :selectedItems="selectedItems" />
        </div>

        <h3 class="page-guide-title2">cart list</h3>
        <div class="page-guide-box">
            <CartList :items="cartItems" />
        </div>

        <h3 class="page-guide-title2">address list</h3>
        <div class="page-guide-box">
            <h3 class="page-guide-title3">type 1</h3>
            <AddressList :addresses="addresses" @delete="handleDelete" @edit="handleEdit" />
        </div>

        <h3 class="page-guide-title2">page</h3>
        <h3 class="page-guide-title3">error</h3>
        <div class="page-guide-box">
            <p class="text">* 본 작업에서는 .error-wrap { min-height: 100vh } 으로 수정하기</p>
            <ErrorPage />
        </div>

        <h3 class="page-guide-title3">no-data type 1</h3>
        <div class="page-guide-box">
            <NodataWrapComponent />
        </div>
        <h3 class="page-guide-title3">no-data type2</h3>
        <div class="page-guide-box">
            <NodataWrap2Component />
        </div>

        <h3 class="page-guide-title3">no-data type2 v2</h3>
        <div class="page-guide-box">
            <NodataWrap3Component :searchQuery="searchQuery" />
        </div>

        <h3 class="page-guide-title2">loading</h3>
        <div class="page-guide-box">
            <Loading />
        </div>

        <h3 class="page-guide-title2">custom scroll</h3>
        <div class="page-guide-box">
            <CustomScrollBox :customStyle="customBoxStyle" customClass="customClass">
                scroll 있을 경우 custom~~~~<br />
                높이값은 그때 그때 알아서 추가 하는 시스템으로 갑시다<br />
                scroll 있을 경우 custom~~~~<br />
                높이값은 그때 그때 알아서 추가 하는 시스템으로 갑시다<br />
                scroll 있을 경우 custom~~~~<br />
                높이값은 그때 그때 알아서 추가 하는 시스템으로 갑시다<br />
                scroll 있을 경우 custom~~~~<br />
                높이값은 그때 그때 알아서 추가 하는 시스템으로 갑시다<br />
                scroll 있을 경우 custom~~~~<br />
                높이값은 그때 그때 알아서 추가 하는 시스템으로 갑시다<br />
                scroll 있을 경우 custom~~~~<br />
                높이값은 그때 그때 알아서 추가 하는 시스템으로 갑시다<br />
                scroll 있을 경우 custom~~~~<br />
                높이값은 그때 그때 알아서 추가 하는 시스템으로 갑시다<br />
                scroll 있을 경우 custom~~~~<br />
                높이값은 그때 그때 알아서 추가 하는 시스템으로 갑시다<br />
                scroll 있을 경우 custom~~~~<br />
                높이값은 그때 그때 알아서 추가 하는 시스템으로 갑시다<br />
            </CustomScrollBox>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import AsideNav from '../Gnb/AsideNav.vue';
import ToggleList from '../../../../components/Mo/Component/ToggleList.vue';
import ToggleEtc from '../../../../components/Mo/Component/ToggleEtc.vue';
import AccordionComponent from '../../../../components/Mo/Component/AccordionComponent.vue';
import AccordionItem from '../../../../components/Mo/Component/AccordionItem.vue';
import ProductList from '../../../../components/Mo/Component/Product/ProductList.vue';
import { Product } from '../../../../components/Mo/Component/Product/ProductTypes';
import DemoImage from '@/assets/mo/images/temp/@temp_prd_image.png';
import CartList from '../../../../components/Mo/Component/Cart/CartList.vue';
import { CartItemType } from '../../../../components/Mo/Component/Cart/CartItemTypes';
import AddressList from '../../../../components/Mo/Component/Address/AddressList.vue';
import ErrorPage from '../../../../components/Mo/Error/ErrorComponent.vue';
import NodataWrapComponent from '../../../../components/Mo/Nodata/NodataWrap.vue';
import NodataWrap2Component from '../../../../components/Mo/Nodata/NodataWrap2.vue';
import NodataWrap3Component from '../../../../components/Mo/Nodata/NodataWrap3.vue';
import Loading from '../../../../components/Mo/Loading/LoadingComponent.vue';
import CustomScrollBox from '../../../../components/Mo/CustomScrollBox/CustomScrollBox.vue';


import FilterPopupLayer from '../../../../components/Mo/Popup/FilterPopup.vue'

defineOptions({
    name: 'ComponentGuide'
});

const products = ref<Product[]>([
    {
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjacketsjacketsjackets',
        image: DemoImage,
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
        tags: ['Priority Shipping', 'exclusive'],
        likes: 237,
        colors: '12 Colors',
        wished: false,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: 'High Collar Blouson',
        image: DemoImage,
        specialPrice: '$245.00',
        sale: '10%',
        likes: 1,
        colors: '5 Colors',
        wished: false,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: '',
        image: DemoImage,
        originalPrice: 'IDR100,487,999.72',
        specialPrice: 'IDR100,279,999.76',
        sale: '10%',
        tags: ['Priority Shipping'],
        likes: 0,
        colors: '2 Colors',
        wished: false,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: 'Top Top toptoptoptotp',
        image: DemoImage,
        originalPrice: 'IDR100,487,999.72',
        specialPrice: 'IDR20,279',
        sale: '80%',
        tags: ['Priority Shipping'],
        likes: 0,
        colors: '',
        wished: false,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: '',
        image: DemoImage,
        specialPrice: 'IDR100,279,999.76',
        sale: '',
        tags: ['Priority Shipping'],
        likes: 127,
        colors: '7 Colors',
        wished: true,
        soldout: false
    },
    {
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjacketsjacketsjackets',
        image: DemoImage,
        originalPrice: '$10.100.245.00',
        specialPrice: '$10.100.245.00',
        sale: '90%',
        likes: 8,
        colors: '',
        wished: false,
        soldout: true
    },
    {
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjacketsjacketsjackets',
        image: DemoImage,
        originalPrice: '$10.100.245.00',
        specialPrice: '$10.100.245.00',
        sale: '90%',
        likes: 8,
        colors: '',
        wished: false,
        soldout: true
    }
]);

const cartItems = ref<CartItemType[]>([
    {
        brand: 'BRAND',
        title: 'Over fit round Dewy Double Jacket Big pockets detail with raglan',
        image: DemoImage,
        color: 'Black',
        size: 'One Size(XS~M)',
        quantity: 1,
        specialPrice: '$245.00',
        originalPrice: '$400.00',
        soldout: false,
        couponApplied: true,
        notifications: [
            'Estimated Delivery : May 11 - May 23',
            'Non-cancelable item',
            'Final Sale : Non-returnable item'
        ],
        tags: ['Final Sale', 'Exclusive'],
        tooltip: {
            text: 'Final Sale',
            description: 'Non-returnable item'
        }
    },
    {
        brand: 'BRAND',
        title: 'Over fit round Dewy Double Jacket Big pockets detail with raglan',
        image: DemoImage,
        color: 'Black',
        size: 'One Size(XS~M)',
        quantity: 1,
        specialPrice: '$245.00',
        originalPrice: '$400.00',
        soldout: false,
        tags: ['Priority Shipping', 'Low Stock']
    },
    {
        brand: 'BRAND',
        title: 'Over fit round Dewy Double Jacket Big pockets detail with raglan',
        image: DemoImage,
        color: 'Black',
        size: 'One Size(XS~M)',
        quantity: 1,
        specialPrice: '',
        soldout: true,
        version: 1
    },
    {
        brand: 'BRAND',
        title: 'Over fit round Dewy Double Jacket Big pockets detail with raglan',
        image: DemoImage,
        color: 'Black',
        size: 'One Size(XS~M)',
        quantity: 1,
        specialPrice: '',
        soldout: true,
        version: 2
    }
]);

const searchQuery = ref('검색결과');

const customBoxStyle = {
    height: '200px',
    padding: '10px',
    border: '1px solid #000',
    fontSize: '13px',
    lineHeight: '20px'
};

const filterPopup = ref<InstanceType<typeof FilterPopupLayer> | null>(null);
const selectedItems = ref<{ label: string; selected: boolean }[]>([]); // 선택된 항목 관리

const openPopup = (popupName: string) => {
    if (popupName === 'filterPopup' && filterPopup.value) {
        filterPopup.value.openPopup();
    }
};

// 페이지 타이틀
interface Address {
    name: string;
    company?: string;  // 선택적 필드로 설정
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    tel: string;
    isActive: boolean;
    isDefault: boolean;
    type: string;
}

// 주소 데이터 정의
const addresses = ref<Address[]>([
    {
        name: 'Paul Lee',
        company: 'Disneyland Inc.', // 회사 필드 추가
        street: '1313 Disneyland Dr',
        city: 'Anaheim',
        state: 'California',
        zip: '92802',
        country: 'United States',
        tel: '7147814636',
        isActive: true,
        isDefault: true,
        type: 'Billing'
    },
    // 이 항목에는 company 필드가 없음
    {
        name: 'Paul Lee',
        street: '1313 Disneyland Dr',
        city: 'Anaheim',
        state: 'California',
        zip: '92802',
        country: 'United States',
        tel: '7147814636',
        isActive: false,
        isDefault: false,
        type: ''
    }
]);
// 삭제 이벤트 처리 함수
const handleDelete = (address: Address) => {
    const index = addresses.value.findIndex(a => a === address);
    if (index !== -1) {
        addresses.value.splice(index, 1); // 배열에서 해당 주소 삭제
    }
};

// 수정 이벤트 처리 함수
const handleEdit = (address: Address) => {
    console.log('Edit address:', address);
    // 여기에 수정 로직 추가
};


</script>
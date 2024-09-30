<template>
    <component :is="dynamicComponent" :headerBgColor="headerBgColor" :title="pageTitle" @openSearch="showSearchLayer"
        v-if="!isSearchLayerVisible" />

    <div class="sub" id="container">
        <div class="content-wrap account-wrap">
            <!-- 주소 목록이 없을 경우 -->
            <section class="address-wrap" v-if="addressCheck">
                <div class="inner-box">
                    <div class="nodata-wrap2">
                        <p>You don't have any saved address</p>
                        <div class="btn-wrap">
                            <BtnType1Components
                                :buttons="[{ href: '#', text: 'Add New Address', classes: 'btn-type4 v5' }]" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- 주소 목록이 있을 경우 -->
            <section class="address-wrap" v-else>
                <div class="inner-box">
                    <!-- AddressList 컴포넌트에 addresses 데이터와 이벤트 전달 -->
                    <AddressList :addresses="addresses" @delete="handleDelete" @edit="handleEdit" />
                </div>
                <div class="btn-wrap">
                    <BtnType1Components :buttons="[{ href: '#', text: 'Add New Address', classes: 'btn-type4 v5' }]" />
                </div>
            </section>

        </div>
    </div>
    <Quick />
    <Navigation :NaviBgColor="NaviBgColor" />
    <Footer />
    <SearchLayer v-if="isSearchLayerVisible" @close="hideSearchLayer" />
</template>
        
<script setup lang="ts">
import { ref, computed, } from 'vue';
import { useRoute } from 'vue-router';
import SubHeader from "../../components/Mo/Header/SubHeader.vue";
import MainHeader from "../../components/Mo/Header/MainHeader.vue";
import Navigation from "../../components/Mo/Navigation/NavigationComponent.vue";
import Quick from "../../components/Mo/Quick/QuickComponent.vue";
import Footer from "../../components/Mo/Footer/FooterComponent.vue";
import SearchLayer from "../../components/Mo/Header/SearchLayerPopup.vue";

//버튼 컴포넌트
import BtnType1Components from '../../components/Mo/Buttons/BtnType1.vue';
//주소 리스트 
import AddressList from '../../components/Mo/Component/Address/AddressList.vue';

//router
const route = useRoute();
//메인header 체크
const isMain = computed(() => route.path === '/main');
// 동적 컴포넌트 설정
const dynamicComponent = computed(() => isMain.value ? MainHeader : SubHeader);
//헤더 배경값
const headerBgColor = '';
//네비게이션 배경값
const NaviBgColor = '';
// 페이지 타이틀
const pageTitle = "Addresses";

// 검색 레이어 표시 상태
const isSearchLayerVisible = ref(false);

// 검색 레이어 표시 함수
const showSearchLayer = () => {
    isSearchLayerVisible.value = true;
};

// 검색 레이어 숨김 함수 (필요시)
const hideSearchLayer = () => {
    isSearchLayerVisible.value = false;
};


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

// 주소 데이터가 없는지 확인 (computed로 변경)
const addressCheck = computed(() => true);

</script>
    
    
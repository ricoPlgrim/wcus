<template>
    <div :class="['scr-item plan-category', customClass]">
        <h3 class="scr-title">{{ props.categoryTitle }}</h3>
        <menuSwiperComponent type="v6" :menus="categories" customClass="sticky-box" ref="tabMenu"
            @menuClick="handleClick('v6', $event)" />
        <productHtml :htmlContent="htmlContent" />
        <div class="plan-tab-view">
            <productHtml :htmlContent="htmlContent" />
            <ProductList :products="products" :showPromotion="false" />
            <MoreTotalComponents :currentNum="1" :totalPage="7" moreTotalClass="btn-type4 bd" />
        </div>
        <div class="plan-tab-view">
            <productHtml :htmlContent="htmlContent2" />
            <ProductList :products="products" :showPromotion="false" />
            <MoreTotalComponents :currentNum="1" :totalPage="7" moreTotalClass="btn-type4 bd" />
        </div>
        <div class="plan-tab-view">
            <productHtml :htmlContent="htmlContent" />
            <ProductList :products="products" :showPromotion="false" />
            <MoreTotalComponents :currentNum="1" :totalPage="7" moreTotalClass="btn-type4 bd" />
        </div>
        <div class="plan-tab-view">
            <productHtml :htmlContent="htmlContent" />
            <ProductList :products="products" :showPromotion="false" />
            <MoreTotalComponents :currentNum="1" :totalPage="7" moreTotalClass="btn-type4 bd" />
        </div>

    </div>
</template>
  
<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, type ComponentPublicInstance } from 'vue';
import { gsap } from 'gsap';
import { useScroll } from '../../utils/useScroll';
import menuSwiperComponent from '../../components/Mo/Swiper/MenuIndex.vue';
import ProductList from "../../components/Mo/Component/Product/ProductList.vue";  // ProductItem 컴포넌트 임포트
import { Product } from '../../components/Mo/Component/Product//ProductTypes';  // Product 타입 임포트
import MoreTotalComponents from '../../components/Mo/Buttons/MoreBtn.vue';

import productHtml from './ProductHtml.vue'




import htmlImg from '@/assets/mo/images/temp/@temp_html_img_01.png';
import htmlImg2 from '@/assets/mo/images/temp/@temp_html_img_04.png';

// Props 정의
const props = defineProps<{
    categoryTitle: string;
    categories: string[];
    customClass?: string,
}>();

const emit = defineEmits(['update:tabMenuRef']);

// HTML 콘텐츠 정의
const htmlContent = `<img src="${htmlImg}" alt="Custom HTML Content" />`;
const htmlContent2 = `<img src="${htmlImg2}" alt="Custom HTML Content" />`;



import DemoImage from '@/assets/mo/images/temp/@temp_prd_image.png';

//product 인터페이스 정의
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
]);

const tabMenu = ref<MenuSwiperInstance | null>(null); // 올바른 타입으로 선언
const previousScrollY = ref(window.scrollY); // 이전 스크롤 위치를 저장하는 ref
const activeIndex = ref({ v6: 0 }); // 현재 활성화된 인덱스 추적


const handleClick = (type: string, event: Event) => {
    const customEvent = event as CustomEvent<number>;
    const index = customEvent;

    // customClass가 있고, 'v6' 타입이며, 유효한 index일 경우에만 처리
    if (props.customClass && typeof index === 'number' && type === 'v6') {
        const planTabViews = document.querySelectorAll('.plan-tab-view');

        if (index < planTabViews.length && planTabViews[index]) {
            const targetElement = planTabViews[index];
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const isScrollingDown = targetPosition > previousScrollY.value;

            const headerElement = document.querySelector('header');
           console.log( "targetPosition", targetPosition );
            gsap.to(window, {
                scrollTo: {
                    y: targetPosition,
                },
                duration: 1,
                ease: 'power1.inOut',
                onComplete: () => {
                    // 스크롤이 위로 이동 중이고, 헤더에 'down' 클래스가 없고, index가 0일 경우
                    if (!isScrollingDown && headerElement && !headerElement.classList.contains('down') && index === 0) {
                        gsap.to(window, {
                            scrollTo: {
                                y: window.scrollY - 110, // 필요에 따라 값 수정
                            },
                            duration: 0.2,
                            ease: 'power1.out',
                        });
                    }
                }
            });

            // 현재 스크롤 위치를 이전 스크롤 위치로 업데이트
            previousScrollY.value = targetPosition;
            activeIndex.value.v6 = index; // 활성화된 인덱스 업데이트
        }
    }
};


type MenuSwiperInstance = ComponentPublicInstance & {
    onMenuClick: (type: string, index: number) => void;
};


// 스크롤 이벤트 핸들러 정의
const handleScroll = () => {
    const planTabViews = document.querySelectorAll('.plan-tab-view');

    planTabViews.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < (window.innerHeight || document.documentElement.clientHeight);

        if (isVisible && tabMenu.value && index !== activeIndex.value.v6) { // 중복 호출 방지
            tabMenu.value.onMenuClick('v6', index);
            activeIndex.value.v6 = index; // 활성화된 인덱스 업데이트
        }
    });
};


onMounted(() => {
    const tabMenuElement = document.querySelector('.sticky-box') as HTMLElement | null;
    emit('update:tabMenuRef', tabMenuElement);
});


// 스크롤을 사용할 수 있게 하는 커스텀 훅 사용
useScroll({
    handleScroll,    // 스크롤 시 항상 호출되는 함수
});




</script>
  

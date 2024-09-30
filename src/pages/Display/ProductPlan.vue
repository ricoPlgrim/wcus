<template>
    <div class="scr-item plan-product">
        <h3 class="scr-title">{{ props.title }}</h3>
        <p class="src-subtitle">{{ props.subtitle }}</p>

        <template v-if="isSwiper">
            <SwiperComponent type="recom"  :loop="false" :showBottomInfo="true" :slides="recommendSlides" />
        </template>
        <template v-else>
            <ProductList :products="products" :showPromotion="false" />
            <MoreTotalComponents :currentNum="1" :totalPage="7" moreTotalClass="btn-type4 bd" />
        </template>


    </div>

</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import ProductList from "../../components/Mo/Component/Product/ProductList.vue";  // ProductItem 컴포넌트 임포트
import { Product } from '../../components/Mo/Component/Product//ProductTypes';  // Product 타입 임포트
import SwiperComponent from '../../components/Mo/Swiper/SwiperComponent.vue';   //swiper 컴포넌트
import MoreTotalComponents from '../../components/Mo/Buttons/MoreBtn.vue';     //더보기 컴포넌트


import DemoImage from '@/assets/mo/images/temp/@temp_prd_image.png';   //더미 이미지


// props 정의
const props = defineProps<{
    title: string;
    subtitle: string;
    isSwiper: boolean;
}>();


//recom 더미 데이터
const recommendSlides = ref([
    {
        imageSrc: DemoImage,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
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
        imageSrc: DemoImage,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
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
        imageSrc: DemoImage,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
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
        imageSrc: DemoImage,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
        tags: ['Priority Shipping', 'exclusive'],
        likes: 237,
        colors: '12 Colors',
        wished: false,
        soldout: false
    },
]);

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

</script>

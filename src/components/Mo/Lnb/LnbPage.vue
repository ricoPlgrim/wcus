<template>
    <div :class="['pop-full', { 'is-visible': isVisible }]" v-if="isVisible" id="pop-setting">
        <div class="nav-wrap">
            <dl class="nav-skip">
                <dt>skip menu</dt>
                <dd><a href="#content">본문 영역 바로가기(Go to content)</a></dd>
                <dd><a href="#bnb">메인 메뉴 영역 바로가기(Go to main menu)</a></dd>
                <dd><a href="#footer">하단 영역 바로가기(Go to footer)</a></dd>
            </dl>
            <div id="lnb" class="lnb-wrap">
                <header class="lnb-header-wrap">
                    <h2 class="title-type">Category</h2>
                    <button type="button" class="btn-back" @click="closePopup">
                        <i class="ico-close"><span class="hidden">Back</span></i>
                    </button>
                </header>

                <div class="lnb-inner type2">
                    <div class="tab-wrap">
                        <TabComponent :tabs="categoryTabs" tabClass="tab-type2" @update:activeIndex="handleTabChange" />
                        <div v-for="(tab, index) in categoryTabs" :key="index"
                            :class="{ 'tab-content': true, 'active': index === activeIndex }" :id="tab.href.slice(1)">
                            <ul class="lnb-list">
                                <li><a href="#">MAIN</a></li>
                                <li><a href="#">NEW</a></li>
                                <li class="accordion-list_menu" v-for="(accordion, idx) in accordions" :key="idx"
                                    :data-tab-index="index" :data-index="idx">
                                    <dl class="accordion-item" :class="{ 'active': getActiveAccordion(index) === idx }">
                                        <dt>
                                            <h3 class="js_accordion" @click="toggleAccordion(index, idx)">
                                                {{ accordion.title }}
                                            </h3>
                                        </dt>
                                        <dd ref="depthHeight">       
                                            <div class="depth2-wrap" :ref="el => setAccordionRef(index, idx, el as HTMLDivElement | null)">
                                                <ul class="depth2-list">
                                                    <li v-for="item in accordion.items" :key="item">
                                                        <a href="#" class="menu-item">{{ item }}</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </dd>
                                    </dl>
                                </li>
                                <li><a href="#">SALE</a></li>
                                <li><a href="#">TOP SELLERS</a></li>
                                <li><a href="#">THE HIGHLIGHTS</a></li>
                                <li><a href="#">BRANDS</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="lnb-box inner-box">
                    <TagBoxComponent title="Shop by Edits" :tags="[
                        'THE LIGHT BAGS THE LIGHT BAGS THE LIGHT BAGS THE LIGHT BAGS',
                        'THIS WEEK\'S DEAL: TRUNK PROJECT',
                        'RAIVE SUMMER23',
                        'KOMOREBI MUSEUM SUMMER\'23'
                    ]" />
                </div>

                <div class="lnb-box">
                    <h4 class="title-type3 inner-box">Discover</h4>
                    <CardSwiper :slides="slides" />
                </div>

                <div class="lnb-box v2">
                    <h4 class="title-type3 inner-box">Best Brands</h4>
                    <CricleSwiper :slides="brandSlides" />
                </div>

                <div class="lnb-box">
                    <CountSwiper :slides="eventSlides"  className="lbanner-swiper" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref,  defineExpose, nextTick } from 'vue';
import TabComponent from '../Buttons/TabBtn.vue';
import TagBoxComponent from '../TagBox/TagBoxComponent.vue';
import CardSwiper from '../Swiper/CardSwiper.vue';
import CricleSwiper from '../Swiper/CricleSwiper.vue';
import CountSwiper from '../Swiper/CountSwiper.vue';
import DemoImg from '../../../assets/mo/images/temp/@temp_discover2.png';
import BrandImg from '../../../assets/mo/images/temp/@temp_brand.png';
import NoImg from '../../../assets/mo/images/no_image2.png';
import TempImg from '../../../assets/mo/images/temp/@temp_banner.png';

// 탭과 아코디언 인터페이스 정의
interface Tab {
    href: string;
    text: string;
    dataText?: string;
    count?: number;
}

interface Accordion {
    title: string;
    items: string[];
}

// 슬라이드 데이터 정의
const slides = ref([
    { imgSrc: DemoImg, caption: 'HERVE SUMMER\'23' },
    { imgSrc: DemoImg, caption: 'HERVE SUMMER\'23' },
    { imgSrc: DemoImg, caption: 'HERVE SUMMER\'23' },
    { imgSrc: DemoImg, caption: 'HERVE SUMMER\'23' },
    { imgSrc: DemoImg, caption: 'HERVE SUMMER\'23' },
]);

const brandSlides = ref([
    { imgSrc: NoImg, caption: 'OSOI' },
    { imgSrc: BrandImg, caption: 'OSOI2' },
    { imgSrc: BrandImg, caption: 'OSOI3' },
    { imgSrc: BrandImg, caption: 'OSOI4' },
    { imgSrc: BrandImg, caption: 'OSOI5' },
    { imgSrc: BrandImg, caption: 'OSOI6' },
]);



interface VisualItem {
    type: 'image' | 'video';
    src: string;
    alt?: string;
    link: string;
}



const eventSlides = ref<VisualItem[]>([
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
    {
        type: 'image',
        src: TempImg,
        alt: 'visual',
        link: '/'
    },
]);

// 팝업 표시 여부
const isVisible = ref(false);
const activeIndex = ref(0);
const activeAccordion = ref<{ [key: number]: number | null }>({});

// 아코디언 데이터 정의
const accordions: Accordion[] = [
    { title: 'CLOTHING', items: ['All Clothing', 'Tops', 'Knitwear', 'Dress & Jumpsuits', 'Pants', 'Jeans', 'Skirts', 'Loungewear', 'TestMenu'] },
    { title: 'SHOES', items: ['All Clothing', 'Tops', 'Knitwear', 'Dress & Jumpsuits', 'Pants', 'Jeans', 'Skirts', 'Loungewear', 'TestMenu22'] },
    { title: 'BAGS', items: ['All Clothing', 'Tops', 'Knitwear', 'Dress & Jumpsuits', 'Pants', 'Jeans', 'Skirts', 'Loungewear', 'TestMenu22', 'TestMenu5555'] },
    { title: 'ACCESSORIES', items: ['All Clothing', 'Tops', 'Knitwear', 'Dress & Jumpsuits', 'Pants', 'Jeans', 'Skirts', 'Loungewear', 'TestMenu4545', 'TestMenu1005'] }
];

// 팝업 열기
const openPopup = async () => {
    isVisible.value = true;
};

// 팝업 닫기
const closePopup = () => {
    isVisible.value = false;
};

// 카테고리 탭 데이터 정의
const categoryTabs = ref<Tab[]>([
    { href: '#women', text: 'WOMEN', dataText: 'WOMEN' },
    { href: '#men', text: 'MEN', dataText: 'MEN' },
    { href: '#kbeauty', text: 'K-BEAUTY', dataText: 'K-BEAUTY' },
    { href: '#life', text: 'LIFE', dataText: 'LIFE' }
]);


// 탭 변경 시 호출되는 함수
const handleTabChange = async (index: number) => {
    activeIndex.value = index;
    if (!(index in activeAccordion.value)) {
        activeAccordion.value[index] = null;
    }
    
    await nextTick();
};

// 아코디언 참조 관리
const accordionRefs = ref<Map<number, Map<number, HTMLDivElement | null>>>(new Map());


const setAccordionRef = (tabIndex: number, index: number, element: HTMLDivElement | null) => {
    if (!accordionRefs.value.has(tabIndex)) {
        accordionRefs.value.set(tabIndex, new Map());
    }
    const tabAccordions = accordionRefs.value.get(tabIndex);
    if (tabAccordions) {
        tabAccordions.set(index, element);
    }
};


// 아코디언 열고 닫기 토글 함수
const toggleAccordion = async (tabIndex: number, index: number) => {
    await nextTick(); 
    
    const accordionElement = accordionRefs.value.get(tabIndex)?.get(index);
    const ddElement = document.querySelector(`[data-tab-index="${tabIndex}"][data-index="${index}"] dd`) as HTMLElement | null;

    if (accordionElement && ddElement) {
        const contentHeight = accordionElement.scrollHeight;
        // 현재 아코디언 항목의 활성화 상태를 확인
        const currentActiveIndex = activeAccordion.value[tabIndex];
         // 현재 아코디언 항목의 활성화 상태를 확인
        const isActive = currentActiveIndex === index;
        
        // 아코디언 항목이 활성화된 경우(이미 열려있는 경우), 닫기
        if (isActive) {
            ddElement.style.maxHeight = '0px';
            activeAccordion.value[tabIndex] = null;
        } else {
            // 다른 아코디언 항목이 열려있다면 닫기
            if (currentActiveIndex !== null) {
                // 현재 활성화된 아코디언을 닫기
                const currentDdElement = document.querySelector(`[data-tab-index="${tabIndex}"][data-index="${currentActiveIndex}"] dd`) as HTMLElement | null;
                if (currentDdElement) {
                    currentDdElement.style.maxHeight = '0px';
                }
            }

            ddElement.style.maxHeight = `${contentHeight}px`;
            activeAccordion.value[tabIndex] = index;
        }
    } 
};

// 현재 활성화된 아코디언 인덱스를 반환하는 함수
const getActiveAccordion = (tabIndex: number) => {
    return activeAccordion.value[tabIndex];
};

// 외부에서 이 컴포넌트의 openPopup 및 closePopup 함수를 사용할 수 있게 정의
defineExpose({ openPopup, closePopup });
</script>
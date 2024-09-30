<template>
    <div class="search_wrap">
        <div class="dimd"></div>
        <div class="search_content">
            <div class="contents">
                <button class="btn-search-close" @click="closeSearchLayer"></button>
                <div class="search_header">
                    <div class="search_bar">
                        <form class="search-form">
                            <input type="text" v-model="searchText" placeholder="Search" @input="onInputChange">
                            <button class="submit" type="submit">Search</button>
                            <button class="clear" type="button" :class="{ 'is-active': isClearActive }"
                                @click="clearInput">clear</button>
                        </form>
                    </div>
                </div>
                <div v-if="!isClearActive" class="search_suggestion">
                    <h2>Popular Searches</h2>
                    <ul>
                        <li><router-link to="">Bag</router-link></li>
                        <li><router-link to="">Dress</router-link></li>
                        <li><router-link to="">Cardigan</router-link></li>
                        <li><router-link to="">Tops</router-link></li>
                        <li><router-link to="">Shirt</router-link></li>
                    </ul>
                </div>
                <div v-if="isClearActive" class="search_menu-container">
                    <div class="menu">
                        <ul>
                            <li class="active">
                                <a href="javascript:;">All</a>
                            </li>
                            <li>
                                <a href="javascript:;">WOMEN</a>
                            </li>
                            <li>
                                <a href="javascript:;">MEN</a>
                            </li>
                            <li>
                                <a href="javascript:;">K-BEAUTY</a>
                            </li>
                            <li>
                                <a href="javascript:;">LIFE</a>
                            </li>
                        </ul>
                    </div>
                    <div class="sale-container">
                        <ul>
                            <li>
                                <button :class="{ 'active': isSaleOnly }" @click="toggleSaleOnly">Sale Only</button>
                            </li>
                        </ul>
                    </div>
                    <div class="menu-suggestions">
                        <h3>Top Suggestions</h3>
                        <ul>
                            <li>
                                <router-link to="/">BAGGU</router-link>
                            </li>
                            <li>
                                <router-link to="/">bagsinbag</router-link>
                            </li>
                            <li>
                                <router-link to="/">shoulder </router-link>
                            </li>
                            <li>
                                <router-link to="/">Crossbody bags</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="search-results">
                        <router-link to="">See All Results</router-link>
                    </div>
                    <div class="swiper-conents">
                        <SwiperComponent type="recom" :loop="false" :showBottomInfo="true"  :slides="recommendSlides" />
                    </div>
                    <!--검색결과 없을 경우-->
                    <div class="search-noresults" v-if="noresults">
                        <h3>
                            Unfortunately,<br />
                            there are no results matching your request.
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SwiperComponent from '../../../components/Mo/Swiper/SwiperComponent.vue';
import slideImage2 from '@/assets/mo/images/temp/@temp_prd_image.png';
import slideImage3 from '@/assets/mo/images/temp/@temp_product.jpg';

const searchText = ref('');
const isClearActive = ref(false);
const isSaleOnly = ref(false);
const noresults = ref(false);

watch(searchText, (newVal) => {
    isClearActive.value = newVal.length > 0;
});

const onInputChange = () => {
    isClearActive.value = searchText.value.length > 0;
    // 추가 로직: 검색 결과가 없을 때 noresults를 true로 설정
    // noresults.value = 검색 로직에 따라 결과가 없는 경우 true로 설정
};



const clearInput = () => {
    searchText.value = '';
    isClearActive.value = false;
};
const toggleSaleOnly = () => {
    isSaleOnly.value = !isSaleOnly.value;
};


const recommendSlides = ref([
    {
        imageSrc: slideImage2,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
    },
    {
        imageSrc: slideImage3,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
    },
    {
        imageSrc: slideImage2,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
    },
    {
        imageSrc: slideImage3,
        altText: 'Recommend Slide 1',
        brand: 'LEMAIRE',
        title: 'High Collar Blouson jackets jackets jackets jacketsjackets',
        originalPrice: '$400.00',
        specialPrice: '$245.00',
        sale: '10%',
    },
    // 다른 슬라이드 추가
]);
const emit = defineEmits(['close']);
const closeSearchLayer = () => {
    emit('close');
};

</script>

<style lang="scss" scoped>
@import '../../../assets/mo/css/common/mixin.scss';

.search_wrap {
    position: relative;
    z-index: 300;

    .dimd {
        background: #fff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        height: 100vh;
    }

    .search_content {
        min-height: 556px;
        padding: toRem(0 20px 20px);
        width: 100%;
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11;
        max-height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;

        .contents {
            margin: 0 auto;
            position: relative;

            .btn-search-close {
                box-shadow: none !important;
                width: auto;
                top: 13px;
                right: 0;
                background-color: rgba(0, 0, 0, 0);
                border: 0;
                height: 24px;
                position: absolute;
                padding: toRem(0);


                &:before {
                    display: block;
                    content: "Cancel";
                    transform: none;
                    background: rgba(0, 0, 0, 0);
                    position: static;
                    width: auto;
                    height: auto;
                    color: #fff;
                    font-weight: normal;
                }
            }

            .search_header {
                display: flex;
                flex-direction: column;
                margin: 0 -20px;

                .search_bar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #222;
                    height: 48px;
                    padding: 0;
                    margin-bottom: 5px;

                    .search-form {
                        display: flex;
                        flex: 1;
                        margin-right: 64px;
                        position: relative;

                        >input {
                            background-color: rgba(0, 0, 0, 0);
                            color: #fff;
                            height: 48px;
                            border-radius: 0;
                            padding-left: 46px;
                            padding-right: 40px;
                            border: 0;
                        }

                        >button {
                            cursor: default;
                            background: url("../../../assets/mo/images/icon/ico_search.svg") center center no-repeat;
                            position: absolute;
                            top: 50%;
                            left: 10px;
                            transform: translate3d(0, -50%, 0);
                            box-shadow: none !important;
                            text-indent: -9999px;
                            width: 30px;
                            height: 30px;

                            &.clear {
                                display: none;
                                background-color: rgba(0, 0, 0, 0);
                                width: 16px;
                                height: 16px;
                                top: 50%;
                                right: 20px;
                                left: auto;
                                transform: translate3d(0, -50%, 0);
                                background-image: url( "../../../assets/mo/images/icon/ico_darkerclose.svg");

                                &.is-active {
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }

            .search_suggestion {
                padding-top: 30px;

                h2 {
                    text-transform: uppercase;
                    font-weight: 500;
                    font-size: 14px;
                    font-style: normal;
                    line-height: 21px;
                    margin-bottom: 11px;
                }

                ul {
                    li {
                        font-size: 14px;
                        line-height: 21px;
                        font-weight: 400;
                        font-weight: normal;
                        padding: 12px 0;
                        margin-bottom: 0;
                    }
                }
            }

            .search_menu-container {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 24px;
                flex-direction: column;

                .menu {
                    display: flex;
                    justify-content: space-between;
                    width: calc(100% + 40px);
                    margin-left: -20px;
                    margin-right: -20px;
                    margin-bottom: 14px;

                    ul {
                        padding: 0 20px;
                        margin-bottom: 20px;
                        width: 100%;
                        display: flex;
                        list-style-type: none;
                        border-bottom: 1px solid rgba(0, 0, 0, .2);

                        li {
                            position: relative;
                            margin-bottom: 0;
                            margin-right: 20px;
                            line-height: 21px;
                            padding: 12px 0;

                            a {
                                display: block;
                                color: rgba(0, 0, 0, .6);
                                font-size: 14px;
                                font-weight: 400;
                            }

                            &.active {
                                a {
                                    opacity: 1;
                                    font-weight: 500;
                                    color: #000;
                                }

                                &:after {
                                    content: "";
                                    display: block;
                                    width: 100%;
                                    height: 1px;
                                    background-color: #000;
                                    position: absolute;
                                    bottom: -1px;
                                    left: 0;
                                }
                            }
                        }
                    }
                }

                .sale-container {
                    width: auto;
                    margin-bottom: 0;
                    margin-left: 0;
                    display: block;
                    position: absolute;
                    top: 77px;
                    right: 20px;

                    button {
                        padding-left: 30px;

                        &:after {
                            content: '';
                            display: block;
                            width: 20px;
                            height: 20px;
                            border-radius: 0;
                            box-shadow: none;
                            position: absolute;
                            top: 0;
                            left: 0;
                            border: 0;
                            background: url("../../../assets/mo/images/icon/ico_checkbox.svg") rgba(0, 0, 0, 0) no-repeat center center;
                        }

                        &.active {
                            &:after {
                                background-image: url("../../../assets/mo/images/icon/ico_checked.svg"); 
                            }
                        }
                    }
                }

                .menu-suggestions {
                    width: 100%;

                    h3 {
                        color: inherit;
                        font-weight: 500;
                        text-transform: uppercase;
                        margin-bottom: 16px;
                        font-size: 14px;
                    }

                    ul {
                        max-width: 100%;
                        margin-bottom: 0;

                        li {

                            margin-bottom: 0;
                            max-width: 100%;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;

                            a {
                                display: block;
                                font-size: 13px;
                                font-weight: 400;
                                line-height: 21px;
                                padding: 12px 0;
                                font-weight: normal;
                            }
                        }
                    }
                }
            }

            .search-results {
                width: 100%;
                text-align: right;
                margin-bottom: 20px;

                a {
                    font-size: 12px;
                    text-decoration: underline;
                }
            }

            .swiper-conents {
                width: 100%;
            }

            .search-noresults {
                display: flex;
                padding-top: 58px;
                max-height: 50vh;
                justify-content: center;
                align-items: center;

                h3 {
                    text-align: center;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 21px;
                    margin: 0;
                }
            }
        }
    }
}
</style>

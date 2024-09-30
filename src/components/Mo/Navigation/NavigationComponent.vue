<template>
    <nav class="bnb-wrap" id="bnb" :style="{ backgroundColor: NaviBgColor }" ref="bnbElement">
        <ul>
            <li v-for="link in navLinks" :key="link.path">
                <button v-if="link.path === '/categories'" @click="openPopup('lnbPopup')" class="nav-link">
                    <i :class="link.icon"></i>
                    <p>{{ link.name }}</p>
                </button>
                <router-link v-else :to="link.path" class="nav-link" active-class="active">
                    <i :class="link.icon"></i>
                    <p>{{ link.name }}</p>
                </router-link>
            </li>
        </ul>
    </nav>

    <lnbPopupLayer ref="lnbPopup" />
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useScroll } from '../../../utils/useScroll';
// import FullPopupLayer from '../../../../components/Mo/Popup/PullPopup.vue';
import lnbPopupLayer from '../../../components/Mo/Lnb/LnbPage.vue';

const lnbPopup = ref<InstanceType<typeof lnbPopupLayer> | null>(null);
const props = defineProps<{
    NaviBgColor?: string;
}>();

const NaviBgColor = computed(() => props.NaviBgColor || '#000');
interface NavLink {
    path: string;
    name: string;
    icon: string;
}

const navLinks = ref<NavLink[]>([
    { path: '/categories', name: 'Categories', icon: 'ico-menu' },
    { path: '/favorites', name: 'Favorites', icon: 'ico-heart' },
    { path: '/main', name: 'Home', icon: 'ico-home' },
    { path: '/me', name: 'Me', icon: 'ico-my' },
    { path: '/brands', name: 'Brands', icon: 'ico-brand' }
]);

const bnbElement = ref<HTMLElement | null>(null);

const onScrollDown = () => {
    if (bnbElement.value) {
        bnbElement.value.classList.add('down');
    }
};

const onScrollUp = () => {
    if (bnbElement.value) {
        bnbElement.value.classList.remove('down');
    }
};


const openPopup = (popupName: string) => {
    switch (popupName) {
        case 'lnbPopup':
            if (lnbPopup.value) lnbPopup.value.openPopup();
            break;

    }
};


useScroll({
  onScrollDown,
  onScrollUp,
});

</script>
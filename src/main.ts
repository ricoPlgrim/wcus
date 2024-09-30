import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/mo/css/fonts.css';            //폰트 정의
import './assets/mo/scss/common.scss';         //공통 css 
import './assets/mo/scss/guide.scss';         //가이드 css

createApp(App).use(router).mount('#app');  
 
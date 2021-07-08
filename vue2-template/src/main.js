
import 'src/utils/es6-promise'

import Vue from 'vue'
import App from './App.vue'
import { Toast } from 'vant'

import router from './router'
import store from './store'
import i18n from './locale'

Vue.config.productionTip = false;

// 将所有 loading Toast 设置为背景不可点击
Toast.setDefaultOptions('loading', { forbidClick: true });
Vue.use(Toast);

(s => s.keys().forEach(k => Vue.use(s(k).default)))(require.context('./plugins', true, /\.js$/));

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')

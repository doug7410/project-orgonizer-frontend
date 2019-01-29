import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import store from './store';
import router from './router'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import VueAuth from '@websanova/vue-auth'
import SlideUpDown from 'vue-slide-up-down'
import VueSweetalert2 from 'vue-sweetalert2'
import capitalize from './filters/capitalize'
import Bearer from '@websanova/vue-auth/drivers/auth/bearer'
import AxiosDriver from '@websanova/vue-auth/drivers/http/axios.1.x'
import VueRouterDriver from '@websanova/vue-auth/drivers/router/vue-router.2.x'

Vue.config.devtools = process.env.VUE_APP_DEVTOOLS
axios.defaults.baseURL = process.env.VUE_APP_API

Vue.use(VueRouter);
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2);
Vue.component('slide-up-down', SlideUpDown)
Vue.router = router
Vue.filter(capitalize.name, capitalize.filter)

Vue.use(VueAuth, {
    auth: Bearer,
    http: AxiosDriver,
    router: VueRouterDriver,
});

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

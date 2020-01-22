import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import axios from 'axios';
import env from './env';
import store from './store';
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.css';
import 'bootstrap/dist/js/bootstrap';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';

Object.keys(rules).forEach((rule) => {
    extend(rule, {
        ...rules[rule],
        message: messages[rule]
    });
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

axios.defaults.baseURL = env.fetch_url;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
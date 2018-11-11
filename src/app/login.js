//Archivo para renderizar el login
import Vue from 'vue';
import App from './components/Login.vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
new Vue({
    render: h => h(App)
}).$mount('#app-login');
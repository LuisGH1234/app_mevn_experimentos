//Archivo root del front end
import Vue from 'vue';
import Router from 'vue-router';
//importamos los componenentes .vue
import App from './components/App.vue';
import Login from './components/Login.vue';
import Playlist from './components/Playlist.vue';
import Home from './components/Home.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            name: 'playlists',
            path: '/playlists',
            component: Playlist
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'home',
            path: '/Home',
            component: Home
        }
    ]
});

/*new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});*/
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
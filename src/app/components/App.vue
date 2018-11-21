<template>
    <div>
        <div id="navigation">
            <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
                <router-link class="navbar-brand" to="/home" v-if="logged == true">MovieNight</router-link>
                <router-link class="navbar-brand" to="/login" v-if="logged == false">MovieNight</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-item nav-link" to="/home" v-if="logged == true" id="homeRoute">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-item nav-link" to="/playlists" v-if="logged == true" id="playlistRoute">Playlists</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-item nav-link" to="/login" v-if="logged == false" id="loginRoute">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="btn btn-warning" @click="logout" v-if="logged == true" id="logoutRoute">Logout</button>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>

        <template v-if="logged == false">
            <v-login @new="setLogged" vprp=" Test"></v-login>
        </template>

        <router-view v-if="logged == true"></router-view>

    </div>
</template>

<script>
import Login from './Login.vue'
import Vue from 'vue';

Vue.component('v-login', Login);

export default { 

    data(){
        return {
            logged: false
        }
    },
    methods: {
        setLogged(obj) {
            console.log(obj);
            if (obj.log === true) {
                this.$router.push({ name:'home' });
                this.logged = true;
            } else {
                this.logged = false;
            }
        },
        logout() {
            //this.$router.push({ name:'login' });
            this.logged = false;
        }
    }
}
</script>


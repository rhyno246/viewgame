<template>
    <div class="nav">
        <div class="top-nav">
            <div class="logo">
                <router-link to="/"><img src="../assets/logo2.png" alt="" class="img-res"></router-link>
            </div>
            <search-slug></search-slug>
            <ul class="user" v-if="isLogin">
                <li>
                    <span class="mr-2 first-name" :style="{ backgroundImage: 'url(' + getPhoto + ')' }">
                        <i class="font-bol" v-if="nameNull">{{ subStringName }}</i>
                    </span> 
                    <router-link :to="`/profile`" class="profile"><span>{{ nameUser }}</span></router-link>
                </li>
                <li><v-icon @click="signOut" class="logout">mdi-logout</v-icon></li>
            </ul>
            <ul class="control-connect" v-else>
                <li><router-link to="/sign-up">SIGN UP</router-link></li>
                <li><router-link to="/login" class="login">LOGIN</router-link></li>
            </ul>
        </div>
        <div class="main-nav" v-if="!routeDetail">
            <v-card width="100%" class="show-mobile" @click="handleToggleMobile">
                <div class="control"><span class="name-menu-mobile">{{ nameMenu }}</span><v-icon class="icon">mdi-arrow-down-drop-circle</v-icon></div>
            </v-card>
            <div class="slug-menu">
                <slug-item
                    v-for="(slug , index) in getSlug"
                    :key="index"
                    :id="slug.id"
                    :name="slug.name"
                    :slug="slug.slug"
                >
                </slug-item>
            </div>
        </div>
    </div>
</template>


<script>
import SearchSlug from './SearchSlug.vue';
import SlugItem from './SlugItem.vue';
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage';
export default {
    components: {SearchSlug, SlugItem },

    data(){
        return {
            nameNull : true
        }
    },
    watch : {
        getPhoto : {
            immediate : true,
            handler(val){
                if(val){
                    this.$nextTick(() => {
                        this.nameNull = false
                    })
                }
            }
        }
    },

    async mounted(){
        await this.$store.dispatch('game/getSlug'); 
    },
    created(){
        // refresh page no out account
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                user.providerData.forEach((profile) => {
                    const name = profile.displayName
                    const email = profile.email
                    this.$store.commit('game/setUserName' , name);
                    this.$store.commit('game/setEmailUser' , email);
                });
            }
            this.$store.state.game.isLogin = !!user;
        })
    },
    methods : {
        handleToggleMobile(){
            var parent = document.querySelector('.slug-menu')
            var icon = document.querySelector('.icon')
            parent.classList.toggle('active-mobile')
            icon.classList.toggle('active-icon')
        },
        async signOut(){
            try {
                const data = firebase.auth().signOut();
                this.nameNull = true
                this.$store.commit('game/setPhoto' , null)
                this.$router.push('/game');
            } catch (err) {
                console.log(err);
            }
        }
    },
    computed : {
        getSlug(){
            return this.$store.getters['game/getSlug'];
        },
        nameMenu(){
            return this.$store.state.game.params.game
        },
        routeDetail(){
            return this.$route.name === "GameDetail" || this.$route.name === "Search" || this.$route.name === "SignUp" || this.$route.name === "Login" || this.$route.name === "Profile"
        },
        isLogin(){
            return this.$store.state.game.isLogin
        },
        nameUser(){
            return this.$store.getters['game/getNameUser']
        },
        subStringName(){
            const name = this.nameUser;
            return name.substring(0,1).toUpperCase();
        },
        getPhoto(){
            return this.$store.state.game.photo
        }
    }
}
</script>


<style lang="scss">
    .font-bol{
        font-style: normal;
    }
    .nav{
        padding: 2rem 0;
        .top-nav {
            display: flex;
            align-items: center;
            @media (max-width: 767px) {
                flex-wrap: wrap;
            }
            .logo{
                @media (max-width: 768px) {
                    margin-right: 2rem;
                }
                @media (max-width: 767px) {
                    order: 2;
                    width: 40%;
                }
            }
            form {
                width: 100%;
                max-width: 70rem;
                margin-left: 5rem;
                @media (max-width: 767px) {
                    order: 3;
                    margin-left: 0;
                    margin-top: 2rem;
                }
            }
            .control-connect, .user{
                padding-left: 0;
                list-style: none;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                margin-left: 2.5rem;
                width: 40%;
                @media (max-width: 767px) {
                    order: 2;
                    width: 52%;
                    margin-left: 0;
                }
                li{
                    background: transparent;
                    margin: 0  20px 0 0;
                    @media (max-width: 767px) {
                        margin: 0  10px 0 0;
                        width: auto;
                    }
                    &:last-child{
                        margin: 0;
                    }
                    a{
                        font-weight: 700;
                        color: #fff;
                        text-decoration: none;
                        font-size: 1.4rem;
                        text-transform: uppercase;
                    }
                }
            }
            .user{
                li{
                    background: transparent;
                    display: flex;
                    align-items: center;
                    .first-name{
                        background: #fff;
                        color: #333;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 35px;
                        height: 35px;
                        background-size: cover;
                        background-position: center center;
                    }
                    .profile{
                        text-transform: inherit;
                        font-weight: normal;
                    }
                    span{
                        font-size: 1.5rem;
                    }
                }
            }
        }
    }
    .main-nav{
        padding-left: 0 !important;
        list-style: none;
        margin: 2rem 0 0 0;
        @media screen and (max-width: 1024px){
            display: flex;
            flex-wrap: wrap;
            position: relative;
        }
        .slug-menu{
            @media screen and (max-width: 1024px){
                position: absolute;
                top: 50px;
                z-index: 999999;
                display: none;
            }
        }
        .active-mobile{
            @media screen and (max-width: 1024px){
                display: block;
            }
        }
        .show-mobile{
            display: none;
            @media screen and (max-width: 1024px){
                display: block;
            }
        }
        .control{
            font-size: 1.6rem;
            width: 100%;
            padding: 1rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            .name-menu-mobile{
                text-transform: uppercase;
            }
            .active-icon{
                transition: all .3s ease;
                transform: rotate(180deg);
            }
        }
        li{
            margin-right: 1.2rem;
            display : inline-block;
            font-size: 1.4rem;
            &:nth-child(16){
                margin-right: 0;
            }
            @media screen and (max-width: 1024px){
                margin-right: 0;
                margin-top: -1px;
            }
            a{
                font-size: 1.4rem;
            }
        }
    }
</style>
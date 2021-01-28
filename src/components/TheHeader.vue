<template>
    <div class="nav">
        <div class="top-nav">
            <div class="logo">
                <router-link to="/"><img src="../assets/logo2.png" alt="" class="img-res"></router-link>
            </div>
            <search-slug></search-slug>
        </div>
        <div class="main-nav" v-if="!routeDetail">
            <v-card width="100%" class="show-mobile">
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
export default {
    components: {SearchSlug, SlugItem },
    async mounted(){
        await this.$store.dispatch('game/getSlug');
        //menu-----mobile
        var element = document.querySelector('.show-mobile');
        var parent = document.querySelector('.slug-menu');
        var icon = document.querySelector('.icon');
        element.addEventListener('click' , function(){
            parent.classList.toggle('active-mobile')
            icon.classList.toggle('active-icon')
        });
        parent.addEventListener('click' , function(){
            this.classList.remove('active-mobile');
            icon.classList.remove('active-icon')
        }); 
    },
    computed : {
        getSlug(){
            return this.$store.getters['game/getSlug'];
        },
        nameMenu(){
            return this.$store.state.game.params.game
        },
        routeDetail(){
            return this.$route.name === "GameDetail" || this.$route.name === "Search"
        }
    }
}
</script>


<style lang="scss">
    .nav{
        padding: 2rem 0;
        .top-nav {
            display: flex;
            align-items: center;
            .logo{
                @media (max-width: 768px) {
                    margin-right: 2rem;
                }
            }
            form {
                width: 100%;
                max-width: 70rem;
                margin-left: 5rem;
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
            @media screen and (max-width: 1024px){
                margin-right: 0;
            }
            a{
                font-size: 1.4rem;
            }
        }
    }
</style>
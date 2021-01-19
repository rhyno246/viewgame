<template>
    <div class="nav">
        <div class="top-nav">
            <div class="logo">
                <router-link to="/"><img src="../assets/logo2.png" alt="" class="img-res"></router-link>
            </div>
            <search-slug></search-slug>
        </div>
        <div class="main-nav" v-if="!routeDetail">
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
</template>


<script>
import SearchSlug from './SearchSlug.vue';
import SlugItem from './SlugItem.vue';
export default {
    components: {SearchSlug, SlugItem },
    async mounted(){
        await this.$store.dispatch('game/getSlug');
    },
    computed : {
        getSlug(){
            return this.$store.getters['game/getSlug'];
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
        li{
            margin-right: 1.2rem;
            display : inline-block;
            font-size: 1.4rem;
            a{
                font-size: 1.4rem;
            }
        }
    }
</style>
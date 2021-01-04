<template>
    <div class="nav">
        <div class="top-nav">
            <div class="logo">
                <router-link to="/"><img src="../assets/logo2.png" alt="" class="img-res"></router-link>
            </div>
            <search-slug></search-slug>
        </div>
        <ul class="main-nav">
            <slug-item
                v-for="slug in getSlug"
                :key="slug.id"
                :name="slug.name"
                :slug="slug.slug"
            >
            </slug-item>
        </ul>
    </div>
</template>


<script>
import SearchSlug from './SearchSlug.vue';
import SlugItem from './SlugItem.vue';
export default {
  components: { SlugItem, SearchSlug },
    data(){
        return {
        }
    },
    computed : { 
        getSlug(){
            return this.$store.getters['game/getSlug'];
        }
    },
    mounted(){
        return this.$store.dispatch('game/getSlug');
    }
}
</script>


<style lang="scss">
    .nav{
        padding: 2rem 0;
        .top-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logo{
                @media (max-width: 768px) {
                    margin-right: 2rem;
                }
            }
            form {
                width: 100%;
                max-width: 400px;
            }
        }
        .main-nav{
            padding-left: 0;
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
    }
</style>
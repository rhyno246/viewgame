<template>
    <loading v-if="isLoading"></loading>
    <div class="search" v-else>
        <h1 class="notFound text-center" v-if="!hasSearch">Opps keyword <span>{{ getStrSearch }}</span> not found !!!!</h1>
        <div class="game__box" v-else>
            <search-item
                v-for="(search, index) in getSearch"
                :key="index"
                :name="search.name"
                :image="search.background_image"
                :metacritic="search.metacritic"
                :parent_platforms="search.parent_platforms"
                :rating="search.rating"
                :slug="search.slug"
                :clip="search.clip"
            ></search-item>
        </div>
        <div class="load-more"
            v-if="hasSearch"
            v-viewability="{
                loop: true,
                padded: 0,
                callback: viewedLoad
            }"
        >
            <div class="text-center" v-if="isLoadmore"><loading-item></loading-item></div>
        </div>
    </div>
</template>

<script>
import Loading from '../components/Loading.vue'
import LoadingItem from '../components/LoadingItem.vue';
import SearchItem from '../components/SearchItem.vue'
export default {
    components: { Loading , SearchItem, LoadingItem },
    methods : {
        viewedLoad(){
            let page = this.$store.state.game.pagesearch;
            let routeName = this.$route.name;
            if(routeName === "Search"){
                this.$store.dispatch('game/loadSearch' , page);
                this.$store.commit('game/SetPageSearch' , ++page);
            }
        }
    },
    watch : {
        isLoadSearch(val){
            console.log(val);
        }
    },
    computed : {
        isLoadmore(){
            return this.$store.getters['game/isloadMore'];
        },
        isLoading(){
            return this.$store.getters['game/isLoading'];
        },
        hasSearch(){
            return this.$store.getters['game/hasSearch'];
        },
        getSearch(){
            return this.$store.getters['game/getSearch'];
        },
        getStrSearch(){
            return this.$store.getters['game/getStrSearch'];
        }
    }
}
</script>

<style lang="scss">
.notFound{
    font-size: 3rem;
    margin-top: 4rem;
    span{
        color: aquamarine;
    }
}
</style>


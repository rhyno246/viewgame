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
            v-viewability="{
                loop: true,
                padded: 100,
                callback: viewedLoad
            }"
        >
        </div>
    </div>
</template>

<script>
import Loading from '../components/Loading.vue'
import SearchItem from '../components/SearchItem.vue'
export default {
    components: { Loading , SearchItem },
    methods : {
        viewedLoad(store){
            console.log(store);
        }
    },
    computed : {
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


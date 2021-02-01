<template>
  <div class="game">
    <div class="load-more text-center" v-if="isLoading">
      <img src="img/loader.svg" alt="">
    </div>
    <div class="game__box" :class="{activelayout : activeLayout}" v-else>
      <game-item
        class="game__item"
        v-for="(game , index) in getAllGame"
        :id="game.id"
        :key="index"
        :name="game.name"
        :image="game.background_image"
        :metacritic="game.metacritic"
        :parent_platforms="game.parent_platforms"
        :rating="game.rating"
        :slug="game.slug"
        :clip="game.clip"
        :shortimg="game.short_screenshots"
      >
      </game-item>
    </div>
    <div class="load-more text-center"
      v-viewability="{
        loop: true,
        padded: 0,
        callback : loadMore
      }"
    >
      <div class="load-more text-center" v-if="isLoadmore">
        <img src="img/loader.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>

// page use  mapGetters mapActions mapState

import GameItem from '../components/GameItem.vue';
import { mapGetters, mapActions, mapMutations , mapState } from 'vuex';
export default {
  components: {
    GameItem,
  },
  computed :{
    ...mapState('game', {
        activeLayout : state => state.flexibleLayout,
        pager : state => state.pager,
        sortGame :  state => state.isFilterLoad,
        filterGame :  state => state.isFilterPlatForm
    }),
    ...mapGetters('game' , {
        isLoading : 'isLoading', // variable : 'name getters store'
        getAllGame : 'getAllGame',
        isLoadmore : 'isloadMore',
        params : 'params',
    }),
  },
  methods : {
    ...mapActions('game' , {
      loadOrderBy : 'loadOrderBy', // variable : 'name actions store'
      loadFilter: 'loadFilterFlatForm', 
      loadmore : 'loadMore'
    }),
    ...mapMutations('game' , {
      setpager : 'SetPager'
    }),

    loadMore() {
      const routeName = this.$route.name;
      let page = this.pager;
      if(this.sortGame){
        this.loadOrderBy(page);
        this.setpager(++page);
      }else if(this.filterGame){
        this.loadFilter(page);
        this.setpager(++page);
      }else if(routeName === "Game"){
        this.loadmore(page);
        this.setpager(++page);
      }
    },
  },
   
}
</script>

<style lang="scss">
.game{
  &__box{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    max-width: 77rem;
    margin: 0 auto;
    grid-gap: 2rem;
  }
  .activelayout{
    grid-template-columns: repeat(4, 1fr);
    max-width: 100%;
    @media (max-width: 992px) {
      grid-template-columns: repeat(3,1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(3,1fr);
    }
     @media (max-width: 480px) {
       grid-template-columns: repeat(2,1fr);
     }
  }
}
.load-more{
  img{
    width: 20rem;
  }
}
</style>
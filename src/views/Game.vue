<template>
  <div class="game">
    <div class="load-more text-center" v-if="isLoading">
      <img src="img/loader.svg" alt="">
    </div>
    <div class="game__box" v-else>
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
import GameItem from '../components/GameItem.vue';
export default {
  components: {
    GameItem,
  },
  // async mounted(){
  //   await this.$store.dispatch("game/recordGame" , this.params.game);
  // },
  methods : {
    loadMore() {
      let pager = this.$store.state.game.pager;
      const routeName = this.$route.name;
      const sortGame = this.$store.state.game.isFilterLoad;
      if(sortGame){
        this.$store.dispatch('game/loadFilter' , pager)
        this.$store.commit('game/SetPager' , ++pager);
      }else if(routeName === "Game"){
        this.$store.dispatch('game/loadMore' , pager);
        this.$store.commit('game/SetPager' , ++pager);
      }
      // if(routeName === "Game"){
      //   this.$store.dispatch('game/loadMore' , pager);
      //   this.$store.commit('game/SetPager' , ++pager);
      // }
    },
  },
  computed :{
    params(){
        return this.$store.getters['game/params']
    },
    isLoadmore(){
      return this.$store.getters['game/isloadMore'];
    },
    getAllGame(){
      return this.$store.getters['game/getAllGame'];
    },
    isLoading(){
      return this.$store.getters['game/isLoading'];
    }
  }
   
}
</script>

<style lang="scss">
.game{
  &__box{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 2rem;
    @media (max-width: 992px) {
      grid-template-columns: repeat(3,1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(2,1fr);
    }
     @media (max-width: 480px) {
       grid-template-columns: repeat(1,1fr);
     }
  }
}
.load-more{
  img{
    width: 20rem;
  }
}
</style>
<template>
  <div class="game">
    <ul class="main-nav">
        <slug-item
            v-for="slug in getSlug"
            :key="slug.id"
            :id="slug.id"
            :name="slug.name"
            :slug="slug.slug"
        >
        </slug-item>
    </ul>

    <filter-main></filter-main>

    <loading v-if="isLoading"></loading>
    <div class="game__box" v-else>
      <game-item
        class="game__item"
        v-for="game in getAllGame"
        :id="game.id"
        :key="game.id"
        :name="game.name"
        :image="game.background_image"
        :metacritic="game.metacritic"
        :parent_platforms="game.parent_platforms"
        :rating="game.rating"
        :slug="game.slug"
        :clip="game.clip"
      >
      </game-item>
    </div>


    <div class="load-more text-center"
      v-viewability="{
        loop: true,
        padded: 100,
        store : {
          dispatch : 'game/loadMore',
          opt: { game: 'game', limit: 20 }
        },
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
import FilterMain from '../components/Filter/FilterMain.vue';
import GameItem from '../components/GameItem.vue';
import Loading from '../components/Loading.vue';
import SlugItem from '../components/SlugItem.vue';
// @ is an alias to /src

export default {
  components: {
    GameItem,
    Loading,
    SlugItem,
    FilterMain,
  },
  data(){
    return{
      
    }
  },
  async mounted(){
    await this.$store.dispatch('game/getSlug');
    await this.$store.dispatch('game/getAllGame');
  },
  methods : {
    loadMore(store) {
      const page = store.page;
      this.$store.dispatch('game/loadMore' , page);
    },
  },
  computed :{

    isLoadmore(){
      return this.$store.getters['game/isloadMore'];
    },

    getAllGame(){
      return this.$store.getters['game/getAllGame'];
    },

    isLoading(){
      return this.$store.getters['game/isLoading'];
    },
    getSlug(){
      return this.$store.getters['game/getSlug'];
    }
  }
   
}
</script>

<style lang="scss">
.game{
  &__box{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
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

.main-nav{
  padding-left: 0 !important;
  list-style: none;
  margin: 2rem 0 2rem 0;
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
<template>
  <div class="game">
    <loading v-if="isLoading"></loading>
    <div class="game__box" v-else>
      <game-item
        class="game__item"
        v-for="game in getSlugBygame"
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
  </div>
</template>

<script>
import GameItem from '../components/GameItem.vue'
import Loading from '../components/Loading.vue';
// @ is an alias to /src

export default {
  components: {
    GameItem,
    Loading
  },
  data(){
    return{

    }
  },
  computed :{
    getSlugBygame(){
      return this.$store.getters['game/showSlugByGame']
    },
    isLoading(){
      return this.$store.getters['game/isLoading']
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
  &__item{
    padding: 1rem;
  }
}
</style>
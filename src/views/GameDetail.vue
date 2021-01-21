<template>
    <div class="detail">
        <div class="detail__bg-page">
            <div class="bg" :style="{ backgroundImage:  `linear-gradient(rgba(15, 15, 15, 0.7),
            rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8),
            rgba(21, 21, 21, 0.5)), url('${ getDetailGame.background_image }')` }"></div>
        </div>
        <div class="detail__main">
           <detail-game
                v-if="renderComponent"
                :detailID="getDetailGame.id"
                :name="getDetailGame.name"
                :image="getDetailGame.background_image"
                :website="getDetailGame.website"
                :genres="getDetailGame.genres"
                :desc="getDetailGame.description_raw"
                :tags="getDetailGame.tags"
                :clip="getDetailGame.clip"
                :metacritic="getDetailGame.metacritic"
                :released="getDetailGame.released"
           >
           </detail-game>
        </div>
    </div>
</template>

<script>
import DetailGame from '../components/DetailGame.vue';
export default {    
    components : { DetailGame},
    props : ['slug'],
    data(){
        return { 
            renderComponent : true
        }
    },
    watch : {
        getDetailGame(val){
            /**
             * re-render component
             */
            //off component
            this.renderComponent = false;
            this.$nextTick(() =>{
                //on component after proccess other
                this.renderComponent = true;
            });
            console.log(val);
        } 
    },
    mounted(){
        this.$store.dispatch('game/getGameDetail' , this.slug );
    },
    computed : {
        getDetailGame(){
            return this.$store.getters['game/getDetail']
        }
    }
}
</script>

<style lang="scss">
.my-app{
    background: none !important;
}
.detail{
    max-width: 115rem;
    margin: 0 auto;
    &__bg-page{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: -2;
        .bg{
            width: 100%;
            z-index: -2;
            background-size: cover;
            background-position: 50%;
            overflow: hidden;
            height: 0;
            padding-top: 56.25%;
            @media (max-width: 768px) {
                padding-top: 100%;
            }
        }
    }
}
</style>
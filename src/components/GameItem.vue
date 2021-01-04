<template>
    <v-card class="card">
        <div class="card__img"
            :style="{ backgroundImage: 'url(' + image + ')' }"
        >
            <div class="playvideo" v-if="!hasClip">
                <v-icon>
                    mdi-play
                </v-icon>
                
            </div>
        </div>
        <div class="card__name">
            <router-link :to="`games/${slug}`"> {{ name }} </router-link>
            <span class="metacritic" :class="hasMetacritic">{{ metacritic ? metacritic : 0 }}</span>
        </div>
        <div class="card__platforms">
            <div class="icon">
                <game-plat
                    v-for="platform in parent_platforms"
                    :key="platform.platform.id"
                    :id="platform.platform.id"
                    :name="platform.platform.name"
                    :slug="platform.platform.slug"
                >
                </game-plat>
            </div>
            <div class="mt-2">
                <v-rating 
                    color="yellow darken-3" 
                    background-color="grey darken-2"
                    size="20" 
                    readonly 
                    half-increments 
                    :value="rating">
                </v-rating>
            </div>
        </div>
    </v-card>
</template>

<script>
import GamePlat from './GamePlat.vue'
export default {
  components: { GamePlat },
    props : ['id','name','image', 'metacritic','parent_platforms','rating' , 'slug','clip'],
    data(){
        return{
        }
    },
    computed : {
        hasMetacritic(){
            if(this.metacritic == null){
                return "error"
            }else if( this.metacritic < 80 ){
                return "warning"
            }else {
                return "success"
            }
        },
        hasClip(){
            return this.clip == null
        }
    }
}
</script>


<style lang="scss">
    .card{
        &__img{
             height: 20rem;
            background-size: cover;
            background-position: top center;
            .playvideo{
                background: rgba($color: #000000, $alpha: .7);
                position: absolute;
                bottom: .5rem;
                left: .5rem;
                border-radius: .3rem;
                width: 4rem;
                text-align: center;
            }
        }
        &__name{
            padding: 1rem 0;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            span{
                font-size: 1.4rem;
                padding: 0 .6rem;
                border-radius: 3px;
            }
            a{
                font-size: 1.8rem;
                text-decoration: none;
                color: #fff !important;
            }
        }
    }
    .error,.warning,.success{
        color: #fff !important;
    }
</style>
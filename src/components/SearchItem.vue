<template>
    <v-card class="card" @mouseover="hoverPlayvideo" @mouseleave="leaveVideo">
        <div class="card__img"
            v-lazy:background-image="image"
        >
        
            <!-- :style="{ backgroundImage: 'url(' + image + ')' }" -->
            <!-- <loading class="loader" v-if="loadding"></loading> -->
            <loading-item class="loader" v-if="loadding"></loading-item>
            <div class="playvideo" v-if="hasClip">
                <v-icon>mdi-play</v-icon>
            </div>
            <div class="none-videoslider" v-if="!hasClip && isShowSlide">
                <slide-game :item="shortimg"></slide-game>
            </div>
            <div class="card__video" v-if="isShow">
                <video :src="clip.clip" loop muted autoplay></video>
                <button class="fullvideo" @click="dialog = true"><v-icon class="mr-1">mdi-play</v-icon> Full Video</button> 
            </div>
        </div>


        <v-dialog  
            v-model="dialog"
            class="ma-2" 
            max-width="1150px"
        >
            <youtube v-if="dialog" :video-id="clip.video" player-width="100%" player-height="650" :player-vars="{ autoplay: 1 }"></youtube> 
            <v-card-actions class="justify-end align-start">
                <v-btn color="error" class="close-model" text @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-actions>
        </v-dialog>

        <div class="group-body">
            <div class="card__name">
                <router-link :to="`/game/${slug}`"> {{ name }} </router-link>
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
                <div class="mt-2 d-flex align-center justify-space-between">
                    <v-rating 
                        class="mt-0 custom-rating"
                        color="yellow darken-3" 
                        background-color="grey darken-2"
                        size="20" 
                        readonly 
                        half-increments 
                        :value="rating">
                    </v-rating>
                     <v-btn :loading="loaddingLike" class="heart pt-0 pr-0 pl-0 pb-0">
                        <v-icon @click="handleLike">mdi-plus</v-icon>
                    </v-btn>
                </div>
            </div>
        </div>
    </v-card>
</template>


<script>
import GamePlat from './GamePlat.vue'
import LoadingItem from './LoadingItem.vue'
import SlideGame from './SlideGame.vue'
import firebase from "firebase/app"
import 'firebase/auth'
export default {
    components: { GamePlat,LoadingItem, SlideGame },
    props : ['id','name','image', 'metacritic','parent_platforms','rating' , 'slug','clip', 'shortimg'],
    data(){
        return{
            isShow : false,
            loadding : false,
            dialog : false,
            isShowSlide : false,
            loaddingLike : false,
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
            return this.clip
        }
    },
    methods : {
        hoverPlayvideo(){
            if(this.clip == null){
                this.isShowSlide = true;
                return
            }
            this.loadding = true
            this.isShow = true
        },
        leaveVideo(){
            this.loadding = false
            this.isShow = false
            this.isShowSlide = false
        },
        handleLike(){
            const isLogin = this.$store.state.game.isLogin;
            if(isLogin === false){
                this.$router.replace('/login');
            }else{
                const db = firebase.firestore();
                const emailUser = firebase.auth().currentUser.email
                this.loaddingLike = true
                const data = {
                    title : this.name,
                    id : this.id,
                    image : this.image,
                    metacritic : this.metacritic,
                    rating : this.rating,
                    clip : this.clip,
                    shortimg : this.shortimg,
                    parent_platforms : this.parent_platforms,
                    slug : this.slug,
                    active : true
                }
                if(data.parent_platforms == null) {
                    alert('Sorry !! the game is undefined') 
                    return this.loaddingLike = false
                }
                db.collection(emailUser).doc('gameID' + data.id).set(data).then(() => {
                    this.loaddingLike = false
                }).catch((error) =>{
                    console.log(error);
                })
            }   
        }
    }
}
</script>


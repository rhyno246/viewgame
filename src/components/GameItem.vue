<template>
    <v-card class="card" @mouseover="hoverPlayvideo" @mouseleave="leaveVideo" v-if="isShowGameFavourite">
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


        <!-- dialog full video -->
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
                <div class="custom-rating d-flex align-center justify-space-between">
                    <v-rating 
                        color="yellow darken-3" 
                        background-color="grey darken-2"
                        size="20" 
                        readonly 
                        half-increments 
                        :value="rating">
                    </v-rating>
                    
                    <v-btn class="heart" v-if="active">
                        <v-icon @click="handleDelete" class="delete">mdi-close-circle-outline</v-icon>
                    </v-btn>

                    <v-btn :loading="loaddingLike" class="heart" v-else>
                        <v-icon @click="handleLike" class="add-favourite">mdi-plus</v-icon>
                    </v-btn>
                </div>


                <!--favourite dialog-->
                <v-dialog
                    v-model="dialog1"
                    persistent
                    max-width="290"
                >
                    <v-card>
                            <v-card-title class="headline">
                                Delete success
                            </v-card-title>
                            <v-card-actions>
                                <v-btn
                                    color="green darken-1"
                                    class="delete-ok"
                                    text
                                    @click="closeModalFavourite"
                                >
                                    OK !!
                                </v-btn>
                            </v-card-actions>
                    </v-card>
                </v-dialog>

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
    components: { GamePlat,LoadingItem , SlideGame },
    props : ['id','name','image', 'metacritic','parent_platforms','rating' , 'slug','clip' , 'shortimg', 'active'],
    data(){
        return{
            isShow : false,
            loadding : false,
            dialog : false,
            dialog1 : false,
            isShowSlide : false,
            loaddingLike : false,
            isShowGameFavourite : true,
            activeGameItem : false
        }
    },

    computed : {
        getdetailscreen(){
            return this.$store.getters['game/getScreenshots']
        },
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

    watch : {

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
        closeModalFavourite(){
            this.dialog1 = false
            this.isShowGameFavourite = false
        },
        handleDelete(){
            const db = firebase.firestore();
            const emailUser = firebase.auth().currentUser.email
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
            db.collection(emailUser).doc('gameID' + data.id).delete().then(() => {
                this.dialog1 = true
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
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


<style lang="scss">
    .v-dialog{
        height: auto !important;
    }
    .card{
        overflow: hidden;
        position: relative;
        &__img{
            background-size: cover;
            background-position: center center;
            position: relative;
            overflow: hidden;
            padding-bottom: 56.5%;
            .playvideo{
                background: rgba($color: #000000, $alpha: .7);
                position: absolute;
                bottom: .5rem;
                left: .5rem;
                border-radius: .3rem;
                width: 4rem;
                text-align: center;
            }
            .loader{
                position: absolute;
                top: 50%;
                right: 50%;
                opacity: 0.8;
                z-index: 0;
                transform: translate(50%, -50%);
                width: 100%;
                z-index: 0;
            }
        }
        &__name{
            padding: 1rem 0;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            line-height: 1.5;
            span{
                font-size: 1.4rem;
                padding: 0 .6rem;
                border-radius: 3px;
                line-height: 1.5;
            }
            a{
                font-size: 1.8rem;
                text-decoration: none;
                color: #fff !important;
            }
        }
        &__video{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            video{
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
            .fullvideo{
                position: absolute;
                right: 1rem;
                bottom: 1rem;
                background-color: rgba(0,0,0,.45);
                color: #fff;
                border: 2px solid transparent;
                outline: none;
                padding: .6rem 1rem;
                border-radius: .4rem;
                font-size: 1.5rem;
                cursor: pointer;
                transition: border .2s;
                display: flex;
                align-items: center;
                &:hover{
                    border: 1px solid #fff !important;
                }
            }
        }
        .group-body{
            padding: 1rem 1rem;
            position: inherit;
            z-index: 8;
        }
    }
    .heart{
        font-size: 2rem !important;
        cursor: pointer;
        color: #333 !important;
        min-width: auto !important;
        height: auto !important;
        box-shadow: none !important;
        background: transparent !important;
        width: auto !important;
        &:hover{
            color: red !important;
        }
    }
    .activeheart{
        color: red !important;
    }

    .error,.warning,.success{
        color: #fff !important;
    }
    .custom-rating{
        margin-top: 1rem;
        button{
            padding: 0 !important;
        }
    }
</style>
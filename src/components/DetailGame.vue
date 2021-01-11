<template>
    <div class="detail__main--box">
        <v-row>
            <v-col cols="12" sm="5" md="4">
                <div class="img" v-lazy:background-image="image"></div>
                <button class="play-trailer" @click="dialog = true" v-if="clip">
                    <v-icon>mdi-play</v-icon> Play Trailer
                </button>


                <v-dialog  
                    v-model="dialog"
                    class="ma-2" 
                    max-width="1150px"
                >

                    <youtube v-if="dialog" :video-id="videoID" player-width="100%" player-height="650" :player-vars="{ autoplay: 1 }"></youtube>
                    <!-- <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                        title="Youtube video player"
                        :src="`https://www.youtube.com/embed/${videoID}?autoplay=1`"
                    >
                    </iframe> -->

                    <v-card-actions class="justify-end align-start">
                        <v-btn color="error" class="close-model" text @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-dialog>

                
            </v-col>
            <v-col cols="12" sm="7" md="8">
                <div class="game-detail">
                    <h1 class="name">{{ name }}</h1>
                </div>
                <div class="box-txt mb-3">
                    <p class="mb-0 label">Released Date</p>
                    <p class="mb-0 txt-name">{{ released }}</p>
                </div>
                <div class="metacritic mb-3">
                    <span :class="hasMetacritic">{{ metacritic ? metacritic : 0 }}</span>
                </div>
                <div class="box-txt mb-3">
                    <p class="mb-0 label">Genres</p>
                    <div class="flex-item">
                        <p class="mb-0 txt-name" v-for="item in genres" :key="item.id" :id="item.id">
                            {{ item.name}}
                        </p>
                    </div>
                </div>
                <div class="box-txt mb-3">
                    <p class="mb-0 label">Link Source</p>
                    <p class="mb-0 txt-name"><a :href="website" target="_bank">{{ website }}</a></p>
                </div>
                <div class="box-txt mb-3">
                    <p class="mb-0 label">Description</p>
                    <p class="mb-0 txt-name">
                        {{ collapsedDescription }} 
                        <a @click="seemore = !seemore"> {{ readMore }} </a>
                    </p>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="10" md="10">
                <div class="grid-detail mt-5">
                    <gallery-detail
                        v-for="image in getdetailscreen" :key="image.id"
                        class="gird-img"
                        :img="image.image"
                        :id="image.id"
                    ></gallery-detail>
                </div>
            </v-col>
            <v-col cols="12" sm="2" md="2">
                <div class="tags">
                    <p class="tags-txt">Tags</p>
                    <ul>
                        <li v-for="tag in tags" :key="tag.id">
                            {{ tag.name }}
                        </li>
                    </ul>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import GalleryDetail from '../components/GalleryDetail.vue';
export default {
    props : ['image', 'name', 'detailID' , 'website' , 'genres','desc','tags' , 'clip' , 'metacritic' , 'released'],
    components : {GalleryDetail},

    beforeUpdate (){
        return this.$store.dispatch('game/GetScreenshots', this.detailID)
    },
    data(){
        return{
            seemore : true,
            dialog : false
        }
    },
    computed : {
        hasMetacritic(){
            if(this.metacritic == null){
                return 'error'
            }else if(this.metacritic < 80){
                return 'warning'
            }else{
                return 'success'
            }
        },
        videoID(){
            if(this.clip == null){
                return
            }
            return this.clip.video
        },
        getdetailscreen(){
            return this.$store.getters['game/getScreenshots']
        },
        showCollapsed(){
            return this.desc && this.desc.length > 220 && this.seemore 
        },
        collapsedDescription(){
            return this.showCollapsed ? `${ this.desc.substring(0,220) }...` : this.desc
        },
        readMore(){
            if(this.seemore){
                return 'Read more'
            } return 'Read less'
        }
    }
}
</script>

<style lang="scss">
    .img{
        position: relative;
        z-index: 1;
        width: 100%;
        height: 35rem;
        max-width: 40rem;
        background-color: #333;
        background-color: var(--color-grey-dark-1);
        background-size: cover;
        background-position: 50%;
    }
    .name{
        font-size: 2.8rem;
    }
    .play-trailer {
        width: 100%;
        border: 1px solid;
        border-radius: 5px;
        padding: .4rem 0;
        font-size: 1.3rem;
        margin-top: 10px;
    }
    .box-txt{
        .label{
            color: rgba($color: #fff, $alpha: .5);
            font-size: 1.4rem;
        }
        .txt-name{
            color: #fff;
            font-size: 1.6rem;
        }
        .flex-item{
            display: flex;
            p{
                margin-right: 1.2rem;
            }
        }
        a{
            color: royalblue;
            text-decoration: none;
            font-size: 1.6rem;
        }
        p{
            a{
                text-decoration: none;
                color: royalblue;
            }
        }
    }
    .metacritic{
        span{
            font-size: 2rem;
            padding: .5rem 1.3rem;
            border-radius: 3px;
        }
    }
    .tags{
        p{
            margin-bottom: .3rem;
            font-size: 1.6rem;
            color: rgba($color: #fff, $alpha: .7);
        }
        ul{
            padding-left: 0;
            list-style: none;
            @media (max-width: 768px) {
                display: flex;
                flex-wrap: wrap;
            }
            li{
                background: none;
                margin-bottom: .2rem;
                font-size: 1.2rem;
                @media (max-width: 768px) {
                    margin-right: 1rem;
                }
                a{
                    font-size: 1.2rem;
                }
            }
        }
    }
    .grid-detail{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-gap: 1rem;
        .box-img{
            height: 25rem;
            overflow: hidden;
            @media (max-width: 768px) {
                height: 15rem;
            }
            img{
                height: 100%;
                width: 100%;
            }
        }
    }
    .v-dialog {
        height: 67vh;
        overflow: inherit !important;
        position: relative;
    }
    .v-btn:not(.v-btn--round).v-size--default{
        height: 40px !important;
        min-width: 40px !important;
        padding: 0 !important;
        position: absolute;
        top: 0 !important;
        padding: 0 !important;
        right: -5rem !important;
        @media (max-width: 768px) {
            top: -5rem!important;
            right: -2rem !important;
        }
    }
</style>
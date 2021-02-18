<template>
    <div class="main-profile">
        <v-container>
            <div class="profile">
                <div class="profile__name">
                    <div class="img-name">
                        <div class="first-name" :style="{ backgroundImage: 'url(' + getPhoto + ')' }">
                            <span v-if="nameNull">{{ subStringName }}</span>
                        </div>
                    </div>
                </div>
                <v-tabs v-model="tab" background-color="transparent" class="tabs">
                    <v-tab v-for="item in items" :key="item">
                        {{ item }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-card-text>
                            <item-profile></item-profile>
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card-text>
                            <div class="box mt-5">
                                <favourite-list></favourite-list>
                            </div>
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card-text>
                            <div class="box mt-5">
                                <change-password></change-password>
                            </div>
                        </v-card-text>
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </v-container>
    </div>
</template>
<script>
import ChangePassword from '../components/ChangePassword.vue';
import FavouriteList from '../components/FavouriteList.vue';
import ItemProfile from '../components/ItemProfile.vue';
export default {
    components: { ItemProfile, ChangePassword, FavouriteList },
    data(){
        return {
            name : "",
            tab: null,
            nameNull : true,
            items: [
                'Profile', 'Favourite' , 'Change PassWord'
            ],
        }
    },
    
    watch : {
        getPhoto : {
            immediate : true,
            handler(val){
                if(val){
                    this.$nextTick(() => {
                        this.nameNull = false
                    })
                }
            }
        }
    },
    computed : {
        nameUser(){
            return this.name = this.$store.getters['game/getNameUser']
        },
        subStringName(){
            const name = this.nameUser;
            return name.substring(0,1).toUpperCase();
        },
        getPhoto(){
            return this.$store.state.game.photo
        },
    },
}
</script>


<style lang="scss">
    .v-slide-group__wrapper {
        max-width: 50rem;
        margin: 0 auto;
    }
    .profile-group{
        max-width: 50rem;
        margin: 0 auto;
    }
    .save-change{
        margin-top: 2rem;
        font-size: 1.4rem !important;
        width: 100%;
        &:disabled{
            background: #222;
        }
    }
    .v-btn:not(.v-btn--round).v-size--default{
        position: relative !important;
        left: 0 !important;
    }
    .input-type {
        input{
            border: none;
            color: #fff;
            width: 100%;
            &:focus{
                outline: none;
            }
        }
    }

    .profile{
        &__name{
            font-size: 4rem;
            margin-top: 5rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            margin-bottom: 4rem;
            .img-name{
                position: relative;
                width: 15rem;
                height: 15rem;
                border-radius: 50%;
                .first-name{
                    background: #fff;
                    color: #333;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 15rem;
                    height: 15rem;
                    font-size: 6rem;
                    font-weight: normal;
                    background-size: cover;
                    background-position: center center;
                }
            }
        }
    }
    .v-tab {
        font-size: 1.4rem !important;
    }
    .v-card__text{
        font-size: 1.6rem !important;
        padding: 1.6rem 0 !important;
    }
    .v-tabs-items {
        background: transparent !important;
    }
     .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
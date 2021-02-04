<template>
    <div class="main-profile">
        <v-container>
            <div class="profile">
                <h1 class="profile__name">
                    <span class="first-name">{{ subStringName }}</span>
                </h1>
                <v-tabs v-model="tab" background-color="transparent" class="tabs">
                    <v-tab v-for="item in items" :key="item">
                        {{ item }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-card-text>
                            <div class="profile-group mt-5" >
                                <div class="name">
                                    <p><span class="color mr-4">Name:</span> {{ nameUser }}</p>
                                    <p><span class="color mr-4">Email:</span> {{ EmailUser }}</p>
                                </div>
                            </div>
                        </v-card-text>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card-text>
                            <div class="box mt-5">
                                asddssasadsdadsadssdsasaas
                            </div>
                        </v-card-text>
                    </v-tab-item>
                </v-tabs-items>

            </div>
        </v-container>
    </div>
</template>
<script>
export default {
    data(){
        return {
            tab: null,
            items: [
                'Profile', 'Favourite'
            ],
        }
    },
    computed : {
        nameUser(){
            return this.$store.getters['game/getNameUser']
        },
        EmailUser(){
            return this.$store.getters['game/getEmailUser']
        },
        subStringName(){
            const name = this.nameUser;
            return name.substring(0,1).toUpperCase();
        },
    }
}
</script>


<style lang="scss">
    .profile{
        max-width: 100rem;
        margin: 0 auto;
        &__name{
            font-size: 4rem;
            margin-top: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 4rem;
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
    .color{
        color: red;
    }
     
</style>
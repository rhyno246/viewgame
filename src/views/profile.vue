<template>
    <div class="main-profile">
        <v-container>
            <div class="profile">
                <h1 class="profile__name">
                    <span class="mr-6">{{ nameUser }}</span>
                    <span class="first-name">{{ subStringName }}</span>
                </h1>
                <v-tabs v-model="tab" background-color="transparent" class="tabs">
                    <v-tab v-for="item in items" :key="item">
                        {{ item }}
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item>
                        <v-card-text>asddssasadsda</v-card-text>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card-text>asddssasadsdadsadssdsasaas</v-card-text>
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
        subStringName(){
            const name = this.nameUser;
            return name.substring(0,1).toUpperCase();
        },
    }
}
</script>


<style lang="scss">
    .profile{
        &__name{
            font-size: 4rem;
            margin-top: 10rem;
            display: flex;
            align-items: center;
            margin-bottom: 4rem;
            .first-name{
                background: #fff;
                color: #333;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 10rem;
                height: 10rem;
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
    }
    .v-tabs-items {
        background: transparent !important;
    }
</style>
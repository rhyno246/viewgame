<template>
    <v-row>
        <v-col cols="12" sm="6" md="6">
            <v-select
                class="select"
                :items="items"
                label="PlatForm"
                dense
                solo
                @change="FilterPlatForm"
            >
            </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="6">
            <v-select
                class="select-1"
                :items="items1"
                label="Order By"
                item-text="state"
                item-value="abbr"
                dense
                solo
                @change="FilterOrderby"
            >
            </v-select>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data(){
        return{
            items: ['PC', 'PlayStation', 'Xbox', 'IOS','Android' ,'linux' , 'Web'],
            items1 : [
                { state : 'Name' , abbr : 'name' },
                { state : 'Rating' , abbr : '-rating' },
                { state : 'Release Date' , abbr : '-release' },
                { state : 'Date added' , abbr : '-created' }
            ]
        }
    },
    methods :{
        FilterPlatForm(val){
            return this.$store.dispatch('game/FilterPlatForm' , val)
        },
        FilterOrderby(val){
            return this.$store.dispatch('game/FilterOrderby' , val)
        }
    }
}
</script>


<style lang="scss">
    .v-list-item__title{
        font-size: 1.6rem !important;
        line-height: 1.6 !important;
        font-weight: 400 !important;

    }
    .select-1{
        @media (max-width: 768px) {
            margin-top: -3rem !important;
        }
    }
</style>
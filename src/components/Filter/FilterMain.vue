<template>
    <v-row v-if="!routeFilter">
        <v-col cols="6" sm="3" md="3">
            <v-select
                class="select"
                :items="items"
                label="PlatForm"
                item-text="state"
                item-value="abbr"
                dense
                solo
                @change="FilterPlatForm"
            >
            </v-select>
        </v-col>
        <v-col cols="6" sm="3" md="3">
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
            //items: ['PC', 'PlayStation', 'Xbox', 'IOS','Android' ,'linux' , 'Web'],
            items : [
                { state : 'PC' , abbr : '1' },
                { state : 'PlayStation' , abbr : '2' },
                { state : 'Xbox' , abbr : '3' },
                { state : 'IOS' , abbr : '4' },
                { state : 'Linux' , abbr : '6' },
                { state : 'Android' , abbr : '8' },
                { state : 'Web' , abbr : '14' },
                
            ],
            items1 : [
                { state : 'Name' , abbr : 'name' },
                { state : 'Rating' , abbr : '-rating' },
                { state : 'Release Date' , abbr : '-released' },
                { state : 'Date added' , abbr : '-created' }
            ]
        }
    },
    computed : {
        routeFilter(){
            return this.$route.name === "GameDetail" || this.$route.name === "Search"
        }
    },
    methods :{
        FilterPlatForm(val){
            return this.$store.dispatch('game/FilterPlatForm' , val)
        },
        FilterOrderby(val){
            this.$router.push(`?ordering=${val}`)
            this.$store.commit('game/setFilterLoad' , true);
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
</style>
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
                dense
                solo
                @change="FilterPlatForm"
            >
            </v-select>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data(){
        return{
            items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
            items1 : ['Name']
        }
    },
    methods :{
        FilterPlatForm(val){
            console.log(val);
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
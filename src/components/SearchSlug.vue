<template>
    <form action="" class="form form-search" @submit.prevent="searchSubmit">
        <input type="text" placeholder="Search ..... " class="input search-input" v-model.trim="search">
        <button class="search-btn">
            <v-icon>mdi-search-web</v-icon>
        </button>
    </form>
</template>

<script>
export default {
    data(){
        return{
            search : '',
            refreshSearch: true,
        }
    },
    methods : {
        searchSubmit(input){
            //console.log(input)
            //when enter search input = event 
            if (typeof input === 'string' || input instanceof String){
                this.search = input;
            }
            if(this.search == ""){
                this.$router.push('/');
                return
            }
            this.$router.push(`/search?query=${this.search}`);
            this.$store.dispatch('game/SearchGame', this.search);
            this.$store.commit('game/SetEndLoad', false);
            this.search = ''
        }
    },
    watch:{
        '$route.query'(val){
            if(val.query && this.refreshSearch){
                this.searchSubmit(val.query)
                this.refreshSearch = false
            }
        }
    },
}
</script>


<style lang="scss">
.form{
    position: relative;
    .input{
        font-family: inherit;
        font-size: inherit;
        color: hsla(0,0%,100%,.6);
        background-color: hsla(0,0%,100%,.14);
        border: none;
        padding: 1rem 2rem;
        width: 100%;
        outline: none;
        font-size: 1.4rem;
        border-radius: 5px;
        :focus{
            outline: none;
        }
        &::placeholder{
            color: #ffffff;
        }
    }
    .search-btn{
        outline: none;
        position: absolute;
        position: absolute;
        right: 1rem;
        top: 1rem;
         @media (max-width: 768px) {
            top: .5rem;
        }
    }
}
</style>
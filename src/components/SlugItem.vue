<template>
    <li>
        <a class="nav-link" @click="slugChange(slug)" :class="{ active: params.game === slug}">
            {{ name }}
        </a>
    </li>
</template>

<script>
export default {
    props : ['id' , 'name', 'slug'],
    computed : {
        params(){
            return this.$store.getters['game/params']
        },
    },
    methods : {
        slugChange(slug){
            this.$store.commit("game/setGameSlug", { game : slug });
            this.$router.push(`?game=${slug}`)
            return this.$store.dispatch('game/recordGame' , slug);
        }
    }
}
</script>

<style lang="scss">
    li{
        background: #333;
        margin-bottom: 1rem;
    }
    .nav-link{
        text-decoration: none;
        padding: 1rem 1.5rem;
        color: #fff !important;
        opacity: .5;
        font-size: 1.6rem;
        border-radius: 5px;
        display: block;
    }
    .active{
        background: #fff !important;
        color: #333 !important;
        opacity: 1;
    }
    
</style>
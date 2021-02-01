<template>
    <li @click="resetSelected">
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
        resetSelected(){
            const selectedChange = this.$store.state.game.selectedChange;
            return selectedChange.selectfilter.reset() || selectedChange.selectorder.reset()
        },
        slugChange(slug){
            this.$store.commit("game/setGameSlug", { game : slug });
            this.$router.push(`?game=${slug}`);
            if(window.innerWidth <= 1024){
                var parent = document.querySelector('.slug-menu');
                var icon = document.querySelector('.icon');
                parent.classList.remove('active-mobile');
                icon.classList.remove('active-icon');
            }
            return this.$store.dispatch('game/recordGame' , slug);
        }
    }
}
</script>

<style lang="scss">
    li{
        background: #333;
        margin-bottom: 1rem;
        @media screen and (max-width: 1024px) {
            width: 100%;
            margin-bottom: 0;
        }
    }
    .nav-link{
        text-decoration: none;
        padding: 1rem 1.5rem;
        color: #fff !important;
        opacity: .5;
        font-size: 1.6rem;
        border-radius: 5px;
        display: block;
        @media screen and (max-width: 1024px) {
            border-radius: 0;
        }
    }
    .active{
        background: #fff !important;
        color: #333 !important;
        opacity: 1;
    }
    
</style>
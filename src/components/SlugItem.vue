<template>
    <li>
        <a class="nav-link" @click="slugChange(slug)">
            {{ name }}
        </a>
    </li>
</template>

<script>
export default {
    props : ['id' , 'name', 'slug'],
    data(){
        return {
            isActive : 'action',
        }
    },
    methods : {
        slugChange(slug){
            return this.$store.dispatch('game/showByGame' , slug);
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
    }
</style>
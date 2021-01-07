<template>
    <li>
        <a class="nav-link" @click="slugChange">
            {{ name }}
        </a>
    </li>
</template>

<script>
export default {
    props : ['id' , 'name', 'slug'],
    data(){
        return {
            isActive : false
        }
    },
    methods : {
        slugChange(){
            return this.$store.dispatch('game/showByGame' , this.slug);
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
<template>
    <ul class="pl-0">
        <li><a @click="onFilter('action')" class="nav-link" :class="{ active: params.game === 'action' }">Action</a></li>
        <li><a @click="onFilter('indie')" class="nav-link" :class="{ active: params.game === 'indie' }">Indie</a></li>
        <li><a @click="onFilter('adventure')" class="nav-link" :class="{ active: params.game === 'adventure' }">Adventure</a></li>
        <li><a @click="onFilter('role-playing-games-rpg')" class="nav-link" :class="{ active: params.game === 'role-playing-games-rpg' }">RPG</a></li>
        <li><a @click="onFilter('strategy')" class="nav-link" :class="{ active: params.game === 'strategy' }">Strategy</a></li>
        <li><a @click="onFilter('shooter')" class="nav-link" :class="{ active: params.game === 'shooter' }">Shooter</a></li>
        <li><a @click="onFilter('casual')" class="nav-link" :class="{ active: params.game === 'casual' }">Casual</a></li>
        <li><a @click="onFilter('simulation')" class="nav-link" :class="{ active: params.game === 'simulation' }">Simulation</a></li>

        <li><a @click="onFilter('puzzle')" class="nav-link" :class="{ active: params.game === 'puzzle' }">Puzzle</a></li>
        <li><a @click="onFilter('arcade')" class="nav-link" :class="{ active: params.game === 'arcade' }">Arcade</a></li>
        <li><a @click="onFilter('platformer')" class="nav-link" :class="{ active: params.game === 'platformer' }">Platformer</a></li>
        <li><a @click="onFilter('racing')" class="nav-link" :class="{ active: params.game === 'racing' }">Racing</a></li>

        <li><a @click="onFilter('sports')" class="nav-link" :class="{ active: params.game === 'sports' }"> Sports </a></li>
        <li><a @click="onFilter('massively-multiplayer')" class="nav-link" :class="{ active: params.game === 'massively-multiplayer' }">Massively Multiplayer</a></li>
        <li><a @click="onFilter('fighting')" class="nav-link" :class="{ active: params.game === 'fighting' }">  Fighting  </a></li>
        <li><a @click="onFilter('family')" class="nav-link" :class="{ active: params.game === 'family' }">  Family  </a></li>

        <li><a @click="onFilter('board-games')" class="nav-link" :class="{ active: params.game === 'board-games' }">Board Games</a></li>
        <li><a @click="onFilter('educational')" class="nav-link" :class="{ active: params.game === 'educational' }">  Educational  </a></li>
        <li><a @click="onFilter('card')" class="nav-link" :class="{ active: params.game === 'card' }">Card</a></li>
    </ul>
</template>

<script>
export default {
    computed : {
        params(){
            return this.$store.getters['game/params']
        }
    },
    methods : {
        onFilter(val){
            this.$store.commit("game/setGameSlug", { game : val });
            this.$store.dispatch('game/showByGame' , val);
        }
    }
}
</script>

<style lang="scss">
ul{
    padding-left: 0 !important;
    list-style: none;
    margin: 2rem 0 2rem 0;
    li{
        background: #333;
        margin-bottom: 1rem;
        border-radius: 5px;
        margin-right: 1.2rem;
        display : inline-block;
        font-size: 1.4rem;
    }
    .nav-link{
        text-decoration: none;
        padding: 1rem 1.5rem;
        color: #fff !important;
        opacity: .5;
        border-radius: 5px;
        display: block;
        font-size: 1.4rem;
    }
    .active{
        background: #fff !important;
        color: #333 !important;
    }
}
</style>
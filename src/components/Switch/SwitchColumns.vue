<template>
    <div class="switch-column">
        <div class="mr-3 size">Display options:</div>
        <div class="switch-column__colums" @click="hanleSwitch(true)" :class="{ activebutton :  activeSwitch}"></div>
        <div class="switch-column__colums" @click="hanleSwitch(false)" :class="{ activebutton : !activeSwitch}"></div>
    </div>
</template>
<script>
export default {
    methods : {
        hanleSwitch(val){
            return this.$store.commit('game/flexibleLayout' , val)
        }
    },
    computed : {
        activeSwitch(){
            return this.$store.state.game.flexibleLayout
        }
    },
}
</script>


<style lang="scss">
    .switch-column{
        display: flex;
        align-items: center;
        @media (max-device-width: 767px) {
            margin-top: -35px;
            margin-bottom: 15px;
        }
        .size{
            font-size: 1.6rem;
            @media (max-width: 992px) {
                display: none;
            }
        }
        &__colums{
            margin-right: 1rem;
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            background-size: contain;
            background-image: url('../../assets/4columns.svg');
            opacity: .6;
            cursor: pointer;
            &:last-child{
                margin-right: 0;
                background-image: url('../../assets/1columns.svg');
            }
        }
        .activebutton{
            opacity: 1;
        }
    }
</style>
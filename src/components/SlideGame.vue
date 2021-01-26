<template>
    <div class="slide">
        <div class="slide__img">
            <div class="img" :style="{ backgroundImage: 'url(' + resizeImg + ')' }"></div>
        </div>
        <div class="slide__control">
            <span v-for="(item,index) in item" :key="index" @mouseover="handleSlide(index)" :class="{ active : selectedIndex == index }"></span>
        </div>
    </div>
</template>
<script>
export default {
    props : ['item'],
    data(){
        return {
            selectedIndex : 0
        }
    },
    computed :{
        getSlide(){
            const index = this.selectedIndex;
            return this.item[index] || {};
        },
        resizeImg(){
            if(this.getSlide.id == -1){
                return this.getSlide.image.replace('media/games' , 'media/resize/640/-/games');
            }else{
                return this.getSlide.image.replace('media/screenshots', 'media/resize/640/-/screenshots');
            }
        }
    },
    methods : {
        handleSlide(index){
            this.selectedIndex = index;
        }
    }
}
</script>

<style lang="scss">
    .slide{
        &__img{
            .img{
                height: 20rem;
                background-size: cover;
                background-position: center center;
                .img-res{
                    max-width: 100%;
                }
            }
        }
        &__control{
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 15px;
            right: 50%;
            transform: translate(50%, -50%);
            z-index: 999999;
            width: 100%;
            padding: 0 2rem;
            span{
                cursor: pointer;
                width: 30px;
                margin-right: 5px;
                display: block;
                height: 7px;
                box-sizing: border-box;
                background-color: rgba(255, 255, 255, 0.4);
                border-radius: 3.8px;
                transition: all 0.3s;
                &:last-child{
                    margin-right: 0;
                }
                &:hover{
                    background-color: rgba(255, 255, 255, 1);
                }
            }
            .active{
                background-color: rgba(255, 255, 255, 1);
            }
        }
    }
</style>
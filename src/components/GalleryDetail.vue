<template>
    <div class="box-img">
        <img v-lazy="img.replace('media/screenshots', 'media/resize/420/-/screenshots')" class="img-res">
    </div>
</template>

<script>
export default {
    props : ['img', 'id'],
    // watch : {
    //     img : {
    //         immediate : true,
    //         handler(val){
    //             console.log(val);
    //         }
    //     }
    // }
}
</script>

<style lang="scss">
    .box-img{
        img{
            display: block;
            object-fit: cover;
        }
    }
</style>
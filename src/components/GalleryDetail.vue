<template>
    <div class="box-img">
        <img v-lazy="img" class="img-res">
    </div>
</template>

<script>
export default {
    props : ['img', 'id'],
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
<template>
    <div class="box-img">
        <img :src="img" class="img-res">
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
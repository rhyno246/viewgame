<template>
    <div class="Login">
        <form action="" class="koko">
            <input type="email" v-model="email" class="mr-2" placeholder="email">
            <input type="password" v-model="password" placeholder="password">
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            email : "",
            password : ""
        }
    }
}
</script>
<style lang="scss">
    .koko{
        input{
            background: green;
            color: #fff;
            &::placeholder{
                color: #fff;
            }
        }
    }
</style>

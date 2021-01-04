<template>
    <form action="" class="form">
        <input type="text" placeholder="Search ..... " class="input">
        <button class="search-btn">
            <v-icon>mdi-search-web</v-icon>
        </button>
    </form>
</template>

<script>
export default {
    state(){
        return{

        }
    }
}
</script>


<style lang="scss">
.form{
    position: relative;
    .input{
        font-family: inherit;
        font-size: inherit;
        color: hsla(0,0%,100%,.6);
        background-color: hsla(0,0%,100%,.14);
        border: none;
        padding: 1rem 2rem;
        width: 100%;
        outline: none;
        font-size: 1.4rem;
        border-radius: 5px;
        :focus{
            outline: none;
        }
        &::placeholder{
            color: #ffffff;
        }
    }
    .search-btn{
        outline: none;
        position: absolute;
        position: absolute;
        right: 1rem;
        top: 1rem;
         @media (max-width: 768px) {
            top: .5rem;
        }
    }
}
</style>
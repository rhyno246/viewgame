<template>
    <div class="nav">
        <div class="top-nav">
            <div class="logo">
                <a href="/"><img src="../assets/logo2.png" alt="" class="img-res"></a>
            </div>
            <search-slug></search-slug>
        </div>
    </div>
</template>


<script>
import SearchSlug from './SearchSlug.vue';
export default {
    components: {SearchSlug },
}
</script>


<style lang="scss">
    .nav{
        padding: 2rem 0;
        .top-nav {
            display: flex;
            align-items: center;
            .logo{
                @media (max-width: 768px) {
                    margin-right: 2rem;
                }
            }
            form {
                width: 100%;
                max-width: 70rem;
                margin-left: 5rem;
            }
        }
    }
</style>
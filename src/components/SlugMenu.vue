<template>
    <ul>
        <li>
            <a
                class="filter"
                @click="onFilter('action')"
            >Action</a>
        </li>
        <li>
            <a
                class="filter"
                @click="onFilter('indie')"
            >Indie</a>
        </li>
        <li>
            <a
                class="filter"
                @click="onFilter('adventure')"
            >Adventure</a>
        </li>
    </ul>
</template>

<script>
export default {
    methods :{
        onFilter(key){
            console.log(key);
        }
    }
}
</script>

<style scoped>
    
</style>
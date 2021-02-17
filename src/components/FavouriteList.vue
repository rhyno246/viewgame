<template>
    <div class="profile-group mt-5" >
        <ul>
            <li v-for="(favou , index) in getFavourite" :key="index">
                {{ favou.clip }}
            </li>
        </ul>
    </div>
</template>


<script>
import firebase from "firebase/app"
import 'firebase/auth'
export default {
    data(){
        return{

        }
    },
    created(){
        const db = firebase.firestore();
        const userID = firebase.auth().currentUser.uid
        db.collection(userID).get().then((data) => {
            data.forEach((user) => {
                const users = user.data();
                this.$store.dispatch('game/actionFavourite' , users);
            })
        })
    },
    computed : {
        getFavourite(){
            return this.$store.getters['game/getFavourite'];
        }
    }
}
</script>


<style lang="scss">

</style>
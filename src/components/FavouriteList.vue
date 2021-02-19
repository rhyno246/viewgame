<template>
    <div class="favourite">
        <div class="layout-gird mt-5" >
            <game-item 
                v-for="(item , index) in favourite" :key="index"
                :id="item.id"
                :name="item.title"
                :image="item.image"
                :metacritic="item.metacritic"
                :parent_platforms="item.parent_platforms"
                :rating="item.rating"
                :slug="item.slug"
                :clip="item.clip"
                :shortimg="item.shortimg"
                :active="item.active"
            >
            </game-item>
        </div>
    </div>
</template>


<script>
import firebase from "firebase/app"
import 'firebase/auth'
import GameItem from './GameItem.vue'
export default {
  components: { GameItem },
    data(){
        return{
            favourite : []
        }
    },
    created(){
        const db = firebase.firestore();
        const emailUser = firebase.auth().currentUser.email
        db.collection(emailUser).get().then((data) => {
            data.forEach((user) => {
                const users = user.data()
                const index = this.favourite.findIndex(arr => arr.id === users.id);
                if(index >= 0){
                    return
                }else{
                    this.favourite.push(users)
                }
            })
        })
    }
}
</script>


<style lang="scss">
    .none-favourite{
        text-align: center;
    }
    .layout-gird{
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        max-width: 100%;
        display: grid;
        grid-gap: 2rem;
        @media (max-width: 992px) {
            grid-template-columns: repeat(3,1fr);
        }
        @media (max-width: 768px) {
            grid-template-columns: repeat(3,1fr);
        }
        @media (max-width: 480px) {
            grid-template-columns: repeat(1,1fr);
        }
    }
</style>
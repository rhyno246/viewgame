import axios from 'axios'
export default { 
    namespaced : true,
    state(){
        return {
            Slug : [],
            Sluggame : [],
            isLoading : false,
        }
    },
    mutations : {
        getAllSlug(state ,payload){
            return state.Slug = payload
        },
        showByGame(state , payload){
            console.log(state.Sluggame = payload);
            return state.Sluggame = payload
        }
    },
    actions : {
        async getSlug({ commit }){
            await axios.get('https://api.rawg.io/api/genres')
            .then(response => {
                const data = response.data.results
                commit('getAllSlug' , data)
            }).catch(error => {
                console.log(error.message);
            })
        },
        async showByGame({ commit ,state } , payload){
            const slug = payload;
            state.isLoading = true
            await axios.get(`https://api.rawg.io/api/games?genres=${slug}`)
            .then(response => {
                const slugData = response.data.results;
                commit('showByGame' , slugData)
                state.isLoading = false
            }).catch(error =>{
                console.log(error.message);
            })
        }
    },
    getters : {
        getSlug(state) { 
            return state.Slug;
        },
        showSlugByGame(state){
            return state.Sluggame;
        },
        isLoading(state){
            return state.isLoading
        }
    }
}
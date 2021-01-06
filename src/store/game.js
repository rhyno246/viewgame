import axios from 'axios'
export default { 
    namespaced : true,
    state(){
        return {
            Slug : [],
            Sluggame : [],
            DetailGame : [],
            screenShot : [],
            isLoading : false,
        }
    },
    mutations : {
        getAllSlug(state ,payload){
            return state.Slug = payload
        },
        showByGame(state , payload){
            return state.Sluggame = payload
        },
        getGameDetail(state,payload){
            return state.DetailGame = payload
        },
        GetScreenshots(state,payload){
            return state.screenShot = payload
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
        },
        async getGameDetail({ commit, state } , payload){
            const slug = payload;
            state.isLoading = true;
            await axios.get(`https://api.rawg.io/api/games/${slug}`)
            .then(response => {
                const slugDetail = response.data;
                commit('getGameDetail' , slugDetail)
                state.isLoading = false;
            }).catch(error => {
                console.log(error.message);
            })
        },
        async GetScreenshots({ commit }, payload){
            const idImg = payload
            await axios.get(`https://api.rawg.io/api/games/${idImg}/screenshots`)
            .then(response => {
                const dataImg = response.data.results;
                commit('GetScreenshots' , dataImg)
            }).catch(error => {
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
        },
        getDetail(state){
            return state.DetailGame;
        },
        getScreenshots(state){
            return state.screenShot;
        }
    }
}
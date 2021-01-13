import axios from 'axios'
import _ from "lodash";
import { urlParse,urlStringify } from "../utils/helpers.js"

//active control menu
let menuObj = { game : 'action' };
let urlObj = urlParse();
let params = { ...menuObj, ...urlObj };
export default { 
    namespaced : true,
    state(){
        return {
            Slug : [],
            All : [],
            record : [],
            DetailGame : [],
            screenShot : [],
            isLoading : false,
            isloadMore : false,
            params : params
        }
    },
    mutations : {
        getAllSlug(state ,payload){
            return state.Slug = payload
        },
        getAllGame(state , payload){
            state.record = [ ...state.All ] = payload;
            return state.All
        },
        getGameDetail(state,payload){
            return state.DetailGame = payload
        },
        GetScreenshots(state,payload){
            return state.screenShot = payload
        },
        SearchGame(state,payload) {
            return state.All = payload
        },
        setGameSlug(state,payload){
            state.params = { ...state.params , ...payload };
            let urlParams = urlStringify(state.params);
            if (history)
                history.replaceState({}, "", location.pathname + "#/?" + urlParams);
        },
        recordGame(state, payload){
            state.record = [ ...state.All ] = payload
            return state.record
        },
        FilterPlatForm(state , payload){
            const filter = payload;
            switch (filter) {
                case "PC":
                    return (state.All.filter(item => {
                        return item.parent_platforms[0].platform.name === filter
                    }));
                default:
                    return state.All
            }
        },
        FilterOrderby(state, payload){
            console.log(payload);
        },
        loadMore(state,payload){
            let newArr =  payload
            return state.All = state.All.concat(newArr);
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


        async loadMore({ commit , state } , payload){
            const game = state.params.game
            const page = payload;
            console.log(page, game);
            state.isloadMore = true;
            await axios.get(`https://api.rawg.io/api/games?genres=${game}&page=${page}`)
            .then(response => {
                const data = response.data.results;
                commit('loadMore' , data);
                state.isloadMore = false;
            }).catch(error => {
                console.log(error.message);
            })
        },

        async getAllGame({ commit , state }){
            // let qp = urlParse();
            // let param = qp.game;
            const game = state.params.game
            state.isloadMore = true
            console.log(game);
            await axios.get(`https://api.rawg.io/api/games?genres=${game}`)
            .then(response => {
                const data = response.data.results;
                commit('getAllGame' , data )
                state.isloadMore = false
            }).catch(error => {
                console.log(error.message);
            })
        },

        async recordGame({ commit,state } , payload){
            const slugFilter = payload;
            state.isLoading = true;
            await axios.get(`https://api.rawg.io/api/games?genres=${slugFilter}`)
            .then(response => {
                const data = response.data.results
                commit('recordGame' , data);
                state.isLoading = false
            }).catch(error => {
                console.log(error.message);
            })
        },


        async getGameDetail({ commit, state } , payload){
            const id = payload;
            state.isLoading = true;
            await axios.get(`https://api.rawg.io/api/games/${id}`)
            .then(response => {
                const dataDetail = response.data;
                commit('getGameDetail' , dataDetail)
                console.log(dataDetail);
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
        },
        async SearchGame({ commit , state} , payload){
            const search = payload
            state.isLoading = true
            await axios(`https://api.rawg.io/api/games?search=${search}`)
            .then(response =>{
                commit('SearchGame' , response.data.results)
                state.isLoading = false
            }).catch(error =>{
                console.log(error.message);
            })
        },
        FilterPlatForm({ commit } , payload){
            const filter = payload
            commit('FilterPlatForm' , filter);
        },
        FilterOrderby({ commit, state } , payload){
            const orderBy = payload
            console.log(orderBy);
        }
    },
    getters : {
        getSlug(state) { 
            return state.Slug;
        },
        getAllGame(state){
             return state.All;
        },
        isLoading(state){
            return state.isLoading
        },
        isloadMore(state){
            return state.isloadMore
        },
        getDetail(state){
            return state.DetailGame;
        },
        getScreenshots(state){
            return state.screenShot;
        },
        params(state){
            return state.params
        }
    }
}
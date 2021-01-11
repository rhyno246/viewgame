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
            params : params
        }
    },
    mutations : {
        getAllSlug(state ,payload){
            return state.Slug = payload
        },
        getAllGame(state , payload){
            state.record = payload;
            return state.All = payload
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
            state.record = state.All = payload
            return state.record
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


        loadMore({ commit } , payload){
            const page = payload;
           console.log(page);
        },


        async getAllGame({ commit , state }){
            state.isLoading = true
            await axios.get('https://api.rawg.io/api/games')
            .then(response => {
                const data = response.data.results;
                commit('getAllGame' , data ),
                console.log(data);
                state.isLoading = false;
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
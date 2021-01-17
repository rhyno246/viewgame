import axios from 'axios'
import _ from "lodash";
import { urlParse,urlStringify } from "../utils/helpers.js"

//active control menu
let menuObj = { 
    game : 'action' 
};
let urlObj = urlParse();
let params = { ...menuObj, ...urlObj };
export default { 
    namespaced : true,
    state(){
        return {
            Slug : [],
            All : [],
            DetailGame : [],
            screenShot : [],
            search : [],
            isLoading : false,
            isloadMore : false,
            strSearch : '',
            pager: 1,
            params : params
        }
    },
    mutations : {
        getAllSlug(state ,payload){
            state.Slug = payload
        },
        getGameDetail(state,payload){
           state.DetailGame = payload
        },
        GetScreenshots(state,payload){
            state.screenShot = payload
        },
        SearchGame(state,payload) {
            state.search = payload;
            console.log(state.search);
        },
        setGameSlug(state,payload){
            state.params = { ...state.params , ...payload };
            let urlParams = urlStringify(state.params);
            if (history)
                history.replaceState({}, "", location.pathname + "#/?" + urlParams);
        },
        recordGame(state, payload){
            state.All = payload;
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
            state.All = state.All.concat(newArr);
        },
        SetPager(state , payload){
            state.pager = payload;
        }
    },
    actions : {
        async getSlug({ commit }){
            let response = await axios.get('https://api.rawg.io/api/genres');
            let data = response.data.results;
            if(data){
                commit('getAllSlug' , data);
            }
        },
        async  loadMore({ commit , state } , payload){
            const game = state.params.game
            const page = payload;
            console.log(page, game);
            state.isloadMore = true;
            let response = await axios.get(`https://api.rawg.io/api/games?genres=${game}&page=${page}`);
            let data = response.data.results;
            if(data){
                commit('loadMore' , data);
                state.isloadMore = false;
            }
        },
        async recordGame({ commit,state } , payload){
            const slugFilter = payload;
            state.isloadMore = false;
            state.isLoading = true;
            state.pager = 2;
            let response = await axios.get(`https://api.rawg.io/api/games?genres=${slugFilter}`);
            let data = response.data.results;
            if(data){
                commit('recordGame' , data);
                state.isLoading = false
            }
        },
        async getGameDetail({ commit } , payload){
            const id = payload;
            let response = await axios.get(`https://api.rawg.io/api/games/${id}`);
            let data = response.data;
            if(data){
                commit('getGameDetail' , data);
            }
        },

        async GetScreenshots({ commit }, payload){
            const idImg = payload;
            let response = await axios.get(`https://api.rawg.io/api/games/${idImg}/screenshots`);
            let data = response.data.results;
            if(data){
                commit('GetScreenshots' , data)
            }
        },
        async SearchGame({ commit , state} , payload){
            const search = payload
            state.strSearch = search;
            state.isLoading = true;
            let response = await axios(`https://api.rawg.io/api/games?search=${search}`);
            let data = response.data.results;
            if(data){
                commit('SearchGame' , data);
                state.isLoading = false
            }
        },
        FilterPlatForm({ commit } , payload){
            const filter = payload
            commit('FilterPlatForm' , filter);
        },
        FilterOrderby({ commit, state } , payload){
            const orderBy = payload
            console.log(orderBy);
        }
        // async loadMore({ commit , state } , payload){
        //     const game = state.params.game
        //     const page = payload;
        //     console.log(page, game);
        //     state.isloadMore = true;
        //     await axios.get(`https://api.rawg.io/api/games?genres=${game}&page=${page}`)
        //     .then(response => {
        //         const data = response.data.results;
        //         commit('loadMore' , data);
        //         state.isloadMore = false;
        //     }).catch(error => {
        //         console.log(error.message);
        //     })
        // },

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
        getSearch(state){
            return state.search;
        },
        getStrSearch(state){
            return state.strSearch;
        },
        hasSearch(state){
            return state.search.length > 0;
        },
        params(state){
            return state.params
        }
    }
}
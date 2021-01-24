import axios from 'axios'
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
            pagesearch : 2,
            params : params,
            LoadSearch : {},
            endLoad: false
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
        SetLoadSearch(state,payload){
            let newLoadSearch = payload;
            state.LoadSearch = newLoadSearch;
            state.search = state.search.concat(newLoadSearch.results);
        },
        SetPager(state , payload){
            state.pager = payload;
        },
        SetPageSearch(state,payload){
            state.pagesearch = payload;
        },
        SetEndLoad(state, payload){
            state.endLoad = payload;
            console.log('set endload', payload)
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
        async loadMore({ commit , state } , payload){
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
            state.strSearch = '';
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
            state.pagesearch = 2;
            let response = await axios(`https://api.rawg.io/api/games?search=${search}`);
            let data = response.data.results;
            if(data){
                commit('SearchGame' , data);
                state.isLoading = false
            }
        },

        async loadSearch({ commit, rootGetters ,state } , payload){
            state.isloadMore = true;
            let search = state.strSearch;
            let page = payload;
            if(state.endLoad) { //stop if endload true
                state.isloadMore = false;
                return; 
            }
            let response = await axios.get(`https://api.rawg.io/api/games?page=${page}&search=${search}`);
            state.isloadMore = false;
            let data = response.data || {};
            commit('SetLoadSearch' , data);
            if(data.next == null){
                state.endLoad = true;
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
            return state.search.length > 0 || !state.search;
        },
        isLoadSearch(state){
            return state.LoadSearch.next !== null && state.LoadSearch.previous !== null
        },
        params(state){
            return state.params
        },
    }
}
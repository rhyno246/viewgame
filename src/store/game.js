import axios from 'axios'
import { urlParse,urlStringify } from "../utils/helpers.js";
import Storage from '../utils/storage.js';

//active control menu
let menuObj = { 
    game : 'action' 
};
let urlObj = urlParse();
let params = { ...menuObj, ...urlObj };
//cache key name trong storage
const slug = "slug";
export default { 
    namespaced : true,
    state(){
        return {
            Slug : Storage.get(slug, "[]"),
            All : [],
            DetailGame : [],
            screenShot : [],
            search : [],
            isLoading : false,
            isloadMore : false,
            strSearch : '',
            pager: 1,
            pagesearch : 1,
            params : params,
            LoadSearch : {},
            endLoad: false,
            isFilterLoad : false,
            nameOderby : "",
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
        },
        setFilterLoad(state,payload){
            state.isFilterLoad = payload;
        },
        FilterOrderby(state, payload){
            const arrfilter = payload.results
            state.All = arrfilter
        },
        setLoadMoreOrderBy(state,payload){
            const newArr = payload.results
            state.All = state.All.concat(newArr);
        },
        FilterPlatForm(state , payload){
            const filter = payload;
            console.log(filter);
            // switch (filter) {
            //     case "PC":
            //         return (state.All.filter(item => {
            //             return item.parent_platforms[0].platform.name === filter
            //         }));
            //     default:
            //         return state.All
            // }
        },
    },
    actions : {
        async getSlug({ commit ,state }){
            if(state.Slug.length > 0) return; //check array is exist
            let response = await axios.get('https://api.rawg.io/api/genres');
            let data = response.data.results;
            Storage.set(slug, JSON.stringify(data), 60 * 24 * 3); //set data vao storage 
            if(data){
                commit('getAllSlug' , data);
            }
        },
        async loadMore({ commit , state } , payload){
            const game = state.params.game
            const page = payload;
            state.isloadMore = true;
            let response = await axios.get(`https://api.rawg.io/api/games?genres=${game}&page=${page}`);
            let data = response.data.results;
            if(data){
                commit('loadMore' , data);
                state.isloadMore = false;
            }
        },
        async recordGame({ commit, state } , payload){
            const slugFilter = payload;
            state.isloadMore = false;
            state.isLoading = true;
            state.strSearch = '';
            state.isFilterLoad = false;
            state.pager = 2;
            let response = await axios.get(`https://api.rawg.io/api/games?genres=${slugFilter}`);
            let data = response.data.results;
            if(data){
                commit('recordGame' , data);
                state.isLoading = false
            }
        },
        async getGameDetail({ commit } , payload){
            const slug = payload;
            let response = await axios.get(`https://api.rawg.io/api/games/${slug}`);
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
            let data = response.data.results || {};
            if(data.length < 20){
                state.isloadMore = false;
                state.pagesearch = 1
            }
            if(data){
                commit('SearchGame' , data);
                state.isLoading = false
            }
        },

        async loadSearch({ commit ,state } , payload){
            state.isloadMore = true;
            let search = state.strSearch;
            let page = payload;
            if(state.endLoad) {
                console.log(state.endLoad); //stop if endload true
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


        async FilterOrderby({ commit, state } , payload){
            const orderBy = state.nameOderby =  payload;
            const game = state.params.game;
            state.isLoading = true;
            state.pager = 2;
            let response = await axios.get(`https://rawg.io/api/games?ordering=${orderBy}&genres=${game}`);
            let data = response.data || {};
            if(data){
                commit('FilterOrderby' , data);
                state.isLoading = false
            }
        },

        async loadFilter({ commit , state } , payload){
            const page = payload;
            const game = state.params.game;
            const orderBy = state.nameOderby;
            state.isloadMore = true;
            let response = await axios.get(`https://rawg.io/api/games?ordering=${orderBy}&genres=${game}&page=${page}`);
            let data = response.data || {};
            if(data){
                commit('setLoadMoreOrderBy' , data)
                state.isloadMore = false;
            }
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
        params(state){
            return state.params
        },
    }
}
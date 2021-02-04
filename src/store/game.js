import axios from 'axios'
import { urlParse,urlStringify } from "../utils/helpers.js"
import Storage from '../utils/storage.js'

//active control menu
let menuObj = {
    game : "action",
 }
let urlObj = urlParse()
let params = { ...menuObj, ...urlObj }
//cache key name trong storage
const slug = "slug"
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
            isFilterPlatForm : false,
            nameOderby : "",
            nameFilter : "",
            selectedChange : "",
            flexibleLayout : true,

            //user-login
            isLogin : false,
            username : "",
            usernameNull : ""

        }
    },
    mutations : {
        getAllSlug : (state ,payload) =>{
            state.Slug = payload
        },
        getGameDetail: (state ,payload) =>{
           state.DetailGame = payload
        },
        GetScreenshots : (state ,payload) =>{
            state.screenShot = payload
        },
        SearchGame: (state ,payload) => {
            state.search = payload
        },
        setGameSlug: (state ,payload) =>{
            state.params = { ...state.params , ...payload }
            let urlParams = urlStringify(state.params)
            if (history)
                history.replaceState({}, "", location.pathname + "#/?" + urlParams)
        },
        recordGame: (state ,payload) =>{
            state.All = payload
        },
        loadMore: (state ,payload) =>{
            let newArr =  payload
            state.All = state.All.concat(newArr)
        },
        SetLoadSearch: (state ,payload) =>{
            let newLoadSearch = payload
            state.LoadSearch = newLoadSearch
            state.search = state.search.concat(newLoadSearch.results)
        },
        SetPager: (state ,payload) =>{
            state.pager = payload
        },
        SetPageSearch: (state ,payload) =>{
            state.pagesearch = payload
        },
        SetEndLoad: (state ,payload) =>{
            state.endLoad = payload
        },
        setFilterLoad: (state ,payload) =>{
            state.isFilterLoad = payload
        },
        setFilterPlatForm: (state ,payload) =>{
            state.isFilterPlatForm = payload
        },
        FilterOrderby: (state ,payload) =>{
            const arrfilter = payload.results
            state.All = arrfilter
        },
        setLoadMoreOrderBy: (state ,payload) =>{
            const newArr = payload.results
            state.All = state.All.concat(newArr)
        },
        FilterPlatForm: (state ,payload) =>{
            const arrPlatForm = payload.results
            state.All =arrPlatForm
        },
        setLoadMorePlatForm: (state ,payload) =>{
            const newArr = payload.results
            state.All = state.All.concat(newArr)
        },
        setSelectedChange: (state ,payload) =>{
            state.selectedChange = payload
        },
        flexibleLayout: (state ,payload) =>{
            state.flexibleLayout = payload
        },

        //login
        setIsLogin : (state , payload) =>{
            state.isLogin = payload
        },
        setUserName : (state,payload) => {
            state.username = payload
        },
        setNullUser(state,payload){
            state.usernameNull = payload
        }
    },
    actions : {
        getSlug : async ({ commit ,state }) =>{
            if(state.Slug.length > 0) return //check array is exist
            let response = await axios.get('https://api.rawg.io/api/genres')
            let data = response.data.results
            Storage.set(slug, JSON.stringify(data), 60 * 24 * 3) //set data vao storage 
            if(data){
                commit('getAllSlug' , data)
            }
        },
        loadMore : async ({ commit , state } , payload) => {
            const game = state.params.game
            const page = payload
            state.isloadMore = true
            let response = await axios.get(`https://api.rawg.io/api/games?genres=${game}&page=${page}`)
            let data = response.data.results
            if(data){
                commit('loadMore' , data)
                state.isloadMore = false
            }
        },
        recordGame : async ({ commit, state } , payload) => {
            const slugFilter = payload
            state.isloadMore = false
            state.isLoading = true
            state.strSearch = ''
            state.isFilterLoad = false
            state.isFilterPlatForm = false
            state.pager = 2
            let response = await axios.get(`https://api.rawg.io/api/games?genres=${slugFilter}`)
            let data = response.data.results
            if(data){
                commit('recordGame' , data)
                state.isLoading = false
            }
        },
        getGameDetail : async ({ commit } , payload) =>{
            const slug = payload
            let response = await axios.get(`https://api.rawg.io/api/games/${slug}`)
            let data = response.data
            if(data){
                commit('getGameDetail' , data)
            }
        },

        GetScreenshots : async ({ commit }, payload) =>{
            const idImg = payload
            let response = await axios.get(`https://api.rawg.io/api/games/${idImg}/screenshots`)
            let data = response.data.results
            if(data){
                commit('GetScreenshots' , data)
            }
        },
        SearchGame : async ({ commit , state} , payload) =>{
            const search = payload
            state.strSearch = search
            state.isLoading = true
            state.pagesearch = 2
            let response = await axios(`https://api.rawg.io/api/games?search=${search}`)
            let data = response.data.results || {}
            if(data.length < 20){
                state.isloadMore = false
                state.pagesearch = 1
            }
            if(data){
                commit('SearchGame' , data)
                state.isLoading = false
            }
        },

        loadSearch : async ({ commit ,state } , payload) =>{
            state.isloadMore = true
            let search = state.strSearch
            let page = payload
            if(state.endLoad) {
                //console.log(state.endLoad) //stop if endload true
                state.isloadMore = false
                return 
            }
            let response = await axios.get(`https://api.rawg.io/api/games?page=${page}&search=${search}`)
            state.isloadMore = false
            let data = response.data || {}
            commit('SetLoadSearch' , data)
            if(data.next == null){
                state.endLoad = true
            }
        },

        FilterOrderby : async ({ commit, state } , payload) =>{
            const orderBy = state.nameOderby =  payload
            const game = state.params.game
            state.isLoading = true
            state.pager = 2
            state.isFilterPlatForm = false
            let response = await axios.get(`https://rawg.io/api/games?ordering=${orderBy}&genres=${game}`)
            let data = response.data || {}
            if(data){
                commit('FilterOrderby' , data)
                state.isLoading = false
            }
        },

        loadOrderBy : async ({ commit , state } , payload) =>{
            const page = payload
            const game = state.params.game
            const orderBy = state.nameOderby
            state.isloadMore = true
            let response = await axios.get(`https://rawg.io/api/games?ordering=${orderBy}&genres=${game}&page=${page}`)
            let data = response.data || {}
            if(data){
                commit('setLoadMoreOrderBy' , data)
                state.isloadMore = false
            }
        },
        FilterPlatForm : async ({ commit, state } , payload) =>{
            state.isLoading = true
            const filter = state.nameFilter = payload
            let game = state.params.game
            state.isFilterLoad = false
            state.pager = 2
            if(state.endLoad){
                state.isloadMore = false
                return
            }
            let response = await axios.get(`https://rawg.io/api/games?parent_platforms=${filter}&genres=${game}`)
            let data = response.data || {}
            state.isLoading = false
            commit('FilterPlatForm' , data)
            if(data.next == null){
                state.endLoad = true
            }
        },


        loadFilterFlatForm : async ({ commit, state } , payload) =>{
            const page = payload
            const game = state.params.game
            const filter = state.nameFilter
            state.isloadMore = true
            if(state.endLoad){
                state.isloadMore = false
                return
            }
            let response = await axios.get(`https://rawg.io/api/games?parent_platforms=${filter}&genres=${game}&page=${page}`)
            let data = response.data || {}
            state.isloadMore = false
            commit('setLoadMorePlatForm' , data)
            if(data.next == null){
                state.endLoad = true
            }
        }
    },
    getters : {
        getSlug : state => { 
            return state.Slug
        },
        getAllGame : state => {
            return state.All
        },
        isLoading : state =>{
            return state.isLoading
        },
        isloadMore: state =>{
            return state.isloadMore
        },
        getDetail : state =>{
            return state.DetailGame
        },
        getScreenshots: state =>{
            return state.screenShot
        },
        getSearch: state =>{
            return state.search
        },
        getStrSearch: state =>{
            return state.strSearch
        },
        hasSearch: state =>{
            return state.search.length > 0 || !state.search
        },
        params : state =>{
            return state.params
        },
        getNameUser : state => {
            return state.username || state.usernameNull
        }
    }
}
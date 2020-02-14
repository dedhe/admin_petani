import Vuex from 'vuex'
import axios from '~/plugins/axios'
const createStore = () => {
  return new Vuex.Store({
    state: {
      public: 'http://localhost:2000/static/',
      headline: [],
      token: null,
      berita: [],
      kategori: [],
      layanan: [],
      youtube: [],
      populer: [],
      skip: 0,
      limit: 15,
      user: {
        id: '',
        nama: '',
        level: '',
        username: ''

      },
      token : '',
      series: [],
      options: {
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: "jumlah berita"
          }
        },
       
      }

    },
    getters: {
      getUrl(state) {

        return state.public
      },
      getSkip(state) {

        return state.skip
      },
      getLimit(state) {

        return state.limit
      },

      getHeadline(state) {
        return state.headline
      },
      getBerita(state) {
        return state.berita
      },
      getKategori(state) {
        return state.kategori
      },
      getLayanan(state) {
        return state.layanan
      },
      getYoutube(state) {
        return state.youtube
      },
      getPopuler(state) {
        return state.populer
      },
      getToken (state) {
        return state.token
      },
      getUser(state) {
        return state.user
      },
      getSeries (state){
        return state.series
      },
      getOptions (state) {
        return state.options
      }

    },
    mutations: {
      setHeadline(state, value) {
        state.headline = value
      },
      incSkip(state) {
        state.skip = state.skip + state.limit

      },
      setBerita(state, value) {
        state.berita = value
      }
      ,
      setKategori(state, value) {
        state.kategori = value
      },
      setLayanan(state, value) {
        state.layanan = value
      },
      setYoutube(state, value) {
        state.youtube = value
      },
      setPopuler(state, value) {
        state.kategori = value
      },
      incBerita(state, value) {
        state.berita.push(value)
      },
      setToken(state, value) {
        state.token = value
      },
      setUser(state, value) {
        state.user = value
      },
      setSeries(state, value) {
        state.series = value
      },
      setOptions(state, value) {
        state.options.xaxis.categories = value
      },
    },
    actions: {
      // setConten({commit}){
      //     axios.get('/berita/0/15').then((ress) => {
      //       console.log(ress)
      //       commit('setBerita', ress.data)
      //     })
      //     axios.get('/layanan').then((ress) => {
      //       commit('setLayanan', ress.data)
      //     })
      //     axios.get('/kategori').then((ress) => {
      //       commit('setKategori', ress.data)
      //     })
      //     axios.get('/headline').then((ress) => {
      //       commit('setHeadline', ress.data)
      //     })
      //     axios.get('/youtube').then((ress) => {
      //       commit('setYoutube', ress.data)
      //     })
      //     axios.get('/populer').then((ress) => {
      //       commit('setPopuler', ress.data)
      //     })
      // },
      setBerita({ commit }, value) {
        commit('setBerita', value)
        commit('incSkip')
      },
      incBerita({ commit }, value) {
        commit('incBerita', value)
        commit('incSkip')
      },
      setToken({commit} , value){
        commit('setToken', value)
      },
      setUser({commit} , value){
        commit('setUser', value)
      },
      setSeries({commit}, value){
        commit('setSeries', value)
      },
      setOptions({commit}, value){
        commit('setOptions', value)
      }
    }
  })
}

export default createStore
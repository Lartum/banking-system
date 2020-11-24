import { createStore } from "vuex";
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import router from '../router/index'

export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    user : null
  
  },
  
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    current_user(state, user, token){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state, message){
      state.status = 'error',
      state.error = message
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = ''
      state.isCustomer = false
      state.isBanker = false
    },

  },

  actions: {
    login({commit} , userdata ){
        commit('auth_request')
        axios.post(`${userdata.route}/login`, userdata)
        .then((res) => {
          const token = res.data.token
          const user = jwt_decode(token)
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('current_user', token, user)
          router.push(`/${userdata.route}`)
        })
        .catch(err => {
          commit('auth_error', err.message)
          localStorage.removeItem('token')
        })
      
  },

  setCurrentUser({commit},token){
    const user = jwt_decode(token)
    axios.defaults.headers.common['Authorization'] = token
    commit('current_user', token, user)
  },

  register({commit}, userdata){
      commit('auth_request')
      axios({url: `${userdata.route}/register`, data: userdata, method: 'POST' })
      .then(resp => {
        console.log(resp)
          const token = resp.data.token
          // const user = jwt_decode(token)
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token)
          router.push(`${userdata.route}`)
      }).catch((err) =>{
        
       
        commit('auth_error', message)
        localStorage.removeItem('token')
      })
      
  },

  logout({commit}){
    console.log('logout called')
      commit('logout')
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
      router.push('/login')
  }
  },

  getters : {
    isLoggedIn: state => !!state.token,
    isCustomer: state => state.user.designation === 'customer' ? true : false,
    isBanker: state => state.user.designation === 'banker' ? true : false,
    authStatus: state => state.status,
  },

  // modules: {}
})

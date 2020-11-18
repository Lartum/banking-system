import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

if (token) {
  axios.defaults.headers.common['Authorization'] = token
  
}
createApp(App).use(store).use(router).mount("#app")

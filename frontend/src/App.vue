<template>
<div id="app">
  <div id="nav">
   <span><h4>Banking System</h4></span>
  </div>
  <router-view />
  </div>
</template>

<script>
import store from './store/index'
import router from './router/index'


export default {
  
 computed : {
      isLoggedIn : function(){ 
        return store.getters.isLoggedIn
        }
    },
  methods:{
   logout: function () {
        store.dispatch('logout')
      }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

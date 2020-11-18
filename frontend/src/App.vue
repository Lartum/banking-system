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

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

</style>

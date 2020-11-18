<template>
  <div class="login">
    <h1>This is the Login page</h1>
    <form @submit.prevent='login'>
        <input 
        v-model="username"
        required
        type="text"
        placeholder="username"
        />
        <input 
        v-model="password"
        required
        placeholder="password"
        type="password"
        />
        <label>Login as</label>
        <select v-model="route" required>
          <option value="customers">Customer</option>
          <option value="bankers">Banker</option>
        </select>
        <button 
        type="submit"
        >Login</button>
    </form>
    <div>
      <router-link to="/register">Create Account</router-link>
    </div>
  </div>
</template>

<script>

import router from '../router/index'
import store from '../store/index'


export default {
    data(){
      return{
        username:'',
        password:'',
        route:''
      }
    },
    methods: {
      login: function(){
        let username = this.username
        let password = this.password
        let route = this.route
        store.dispatch('login', { username, password, route } )
      }
    }
}
</script>
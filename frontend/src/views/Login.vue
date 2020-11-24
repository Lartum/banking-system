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
        <div v-if="error">
          <p style="color:red">{{error}}</p>
        </div>
    </form>
    <div>
      <router-link to="/register">Create Account</router-link>
    </div>
  </div>
</template>

<script>
import store from '../store/index'
import router from '../router/index'


export default {
    data(){
      return{
        username:'',
        password:'',
        route:'',
        error:null
      }
    },
    methods: {
      login: function(){
        let username = this.username
        let password = this.password
        let route = this.route
        this.$store.dispatch('login', { username, password, route })
        if(store.state.user === null){
             this.error = 'User not found'
          }
      }
    }
}
</script>
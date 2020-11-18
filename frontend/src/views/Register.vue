    <template>
  <div>
    <h4>Register | <router-link to="/login">Login</router-link></h4>
    
    <form @submit.prevent="register">
      <label for="username">Username</label>
      <div>
          <input id="username" type="text" v-model="username" required autofocus>
      </div>
      <label for="password">Password</label>
      <div>
          <input id="password" type="password" v-model="password" required>
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
          <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <label>Reister as</label>
        <select v-model="route" required>
            <option value="customers">Customer</option>
            <option value="bankers">Banker</option>
        </select>
      <div>
          <button type="submit" value="customers">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import store from '../store/index'
  export default {
    data(){
      return {
        username : "",
        password : "",
        password_confirmation : "",
        route: "",
        error:''
      }
    },
    methods: {
      register: function () {
        let username = this.username
        let password = this.password
        let route = this.route
        
       store.dispatch('register', { username, password, route})
      }
    }
  }
</script>
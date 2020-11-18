    <template>
  <div>
    <h4>Register</h4>
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
        <select v-model="route">
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
  export default {
    data(){
      return {
        username : "",
        password : "",
        password_confirmation : "",
        route: ""
      }
    },
    methods: {
      register: function () {
        let data = {
          username: this.username,
          email: this.email,
          password: this.password,
          route: this.route
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/login'))
       .catch(err => console.log(err))
      }
    }
  }
</script>
<template>
  <div class="home">
    Welcome To banking system
    <router-link to="/login">Login</router-link>
     | <router-link to="/register">Register</router-link>
  </div>
</template>

<script>


export default {
  name: "Home",
  mount: function(){
    this.$store.dispatch('setCurrentuser', token)
  }
}
</script>

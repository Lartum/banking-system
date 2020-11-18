<template>
    <div>
        <h1>Welcome {{ username }}</h1>
        <h4>Current Balance: {{ balance }}</h4>
        <router-link to="/transrecord"><button>Show Transaction Records</button></router-link> 
        <router-link to='/transaction'><button>Make Transaction</button></router-link> 
        <button @click="logout">Logout</button>
    </div>
    
</template>

<script>
import user from '../utils/currentuser'
import store from '../store/index'

const newUsername = user.username
const newBalance = user.balance

export default {
    data(){
        return{
            username: newUsername,
            balance: newBalance
        }
    },
    methods:{
        logout(){
            store.dispatch('logout')
        }
    }
}
</script>
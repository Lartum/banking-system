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
import store from '../store/index'
import axios from 'axios'

export default {
    data(){
        return{
            username: '',
            balance:0
        }
    },
    created(){
        axios.get('/customers/currentuser')
        .then((res) =>{
            const user = res.data
            this.username = user.username
            this.balance = user.balance
        })
    },
    methods:{
        logout(){
            store.dispatch('logout')
        }
    }
}
</script>
<template>
<div>
    <h1>welcome {{ user.username }}</h1>
    <button @click="handleTotalBal">Show Total Balance of All users</button>
    <h4 v-if="showbal === true">₹ {{totalbalnce}}</h4>
    <router-link to="/allusers"><button>Show all Customers</button></router-link> 
    <button @click="handleLogout">Logout</button>
</div>
    
</template>

<script>
import axios from 'axios'
import store from '../store/index'

export default {
    data(){
        return{
            user:'',
            showbal:false,
            totalbalnce:0
        }
    },
    created(){
        axios.get('/bankers/currentuser')
            .then((res) =>{
                const currentUser = res.data
                this.user = currentUser
            })  
    },
    methods:{
        handleLogout: function(){
            store.dispatch('logout')
        },

        handleTotalBal: function(){
            axios.get('/bankers/totalbalance')
                .then((res) =>{
                     this.showbal = true
                     this.totalbalnce = res.data.totalsum
                })  
        }
    }
}
</script>
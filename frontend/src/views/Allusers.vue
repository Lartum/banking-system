<template>
    <div>
        <router-link to="/bankers">Profile</router-link>
        <h1>All Customers</h1>
        <table>
           <tr> 
                <th>User Id</th>
                <th>Username</th>
                <th>Current Balance</th>
                <th>Account Created On</th>
                <th>Show Transaction History</th>
            </tr>
            <button v-if="showRecord === true" @click="closeRecord">Close</button>
            <div v-if="showRecord === true"><UserRecord :customer="selectedUser" :records="customerRecord"/></div>
            <tr v-for="customer in customers" :key="customer.id">
                  <td>{{customer.id}}</td>
                  <td>{{customer.username}}</td>
                  <td>{{customer.balance}}</td>
                  <td>{{customer.created_at}}</td>
                  <td><button @click="selectUser(customer)">Transaction History</button></td>  
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import UserRecord from './UserRecord.vue'

export default {
  components: { 
      UserRecord 
      },
   data(){
       return {
           customers:[],
           selectedUser:{},
           showRecord: false,
           customerRecord:[]
       }
   },
   created(){
       axios.get('/bankers/allcustomer')
        .then((res) =>{
              this.customers = res.data
        })
   },
   methods: {
       selectUser: function(customer){
           this.showRecord = true
           this.selectedUser = customer
           const userid = this.selectedUser.id
           axios.post('/bankers/usertrans', {userid })
            .then((res) =>{
                this.customerRecord = res.data
            })
           
       },
       closeRecord: function(){
           this.showRecord = false
       }
   }
    
 
}
</script>
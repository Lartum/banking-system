<template>
    <div>
        <h1>Transaction History</h1>
        <router-link to="/login">Profile</router-link>
        <table style="witdth:100%">
           <tr> 
               <th>Balance</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date and time</th>
            </tr>
            <tr v-for="record in records" :key="record.id">
                  <td>{{record.balance}}</td>
                  <td>{{record.amount}}</td>
                  <td>{{record.typeof_trans}}</td>
                  <td>{{record.created_at}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
     data(){
        return{
            records:[]
        }
    },
       created(){
        axios.get('/customers/account')
        .then((res) => {
            const userRecords = res.data.accountDetails
            console.log(userRecords)
            this.records = userRecords
        }).catch((err) =>{
            console.log(err)
        })
    }
}
</script>

<template>
<div>
    <h4>Transaction</h4>
    <router-link to="/login">Profile</router-link>
    <br/>
    <form @submit="handletransaction">
        <input 
        min=0
        type="number"
        placeholder="amount"
        name="amount"
        v-model="amount"
        /><br />
        <label for='transaction'>Select the type of transaction </label>
        <select v-model="transaction" name="type">
            <option disabled value="">Please select one</option>
            <option value="debit">Withdraw</option>
            <option value="credit">Deposit</option>
        </select>
        <button type="submit">Submit</button>
    </form>
    <p v-if="message">{{message}}</p>
 </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
        amount:0,
        transaction:'',
        message:null
        }
    },
    methods: {
        handletransaction: function(){
            let amount = this.amount
            let type = this.transaction
            axios.patch('/customers/transaction', { amount, type })
                .then((response) =>{
                    this.message = response.data
            })
            
            
        }

    }
}
</script>
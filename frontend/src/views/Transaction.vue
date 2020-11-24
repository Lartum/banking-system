<template>
<div>
    <h4>Transaction</h4>
    <router-link to="/login">Profile</router-link>
    <br/>
    <form @submit.prevent="handletransaction">
        <input 
        required
        min=0
        type="number"
        placeholder="amount"
        name="amount"
        v-model="amount"
        /><br />
        <label for='transaction'>Select the type of transaction </label>
        <select v-model="transaction" name="type" required>
            <option disabled value="">Please select one</option>
            <option value="debit">Withdraw</option>
            <option value="credit">Deposit</option>
        </select>
        <button type="submit">Submit</button>
    </form>
    <p v-if="message" style="color:green">{{message.message}}</p>
    <p v-else-if="err" style="color:red">{{err}}</p>
 </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
        amount:0,
        transaction:'',
        message:null,
        err:null
        }
    },
    methods: {
        handletransaction: function(e){
            let amount = this.amount
            let type = this.transaction
            axios.patch('/customers/transaction', { amount, type })
                .then((response) => {
                    console.log(response)
                    this.message = response.data
            }).catch((error) => {
                if(error.message === 'Request failed with status code 403'){
                    this.err = 'Insufficient funds'
                }   
                
            })
            
            
        }

    }
}
</script>
<template>
<div>
    <h1></h1>
    <form @submit="handletransaction">
        <p>Username: {{username}}</p>
        <p>Current Balance: {{balance}}</p>
        <input 
        min=0
        type="number"
        placeholder="amount"
        name="amount"
        v-model="amount"
        /><br />
        <label for='transaction'>Select the type of transaction </label>
        <select v-model="transaction">
            <option value="debit">Withdraw</option>
            <option value="credit">Deposit</option>
        </select>
        <button type="submit">Submit</button>
    </form>
 </div>
</template>

<script>
export default {
    data(){
        return{
        username:'John Doe',
        balance:0,
        amount:0,
        transcation:''
        }
    },
    methods: {
        handletransaction: function(){
            let amount = this.amount
            let transaction = this.transcation

        }
    }
}
</script>
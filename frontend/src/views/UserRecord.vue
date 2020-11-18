<template>
    <div>
        <table >
            <h4>{{ customer.username }}'s Transaction history</h4>
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


export default {
    name:'UserRecord',
    props: ['customer', 'records']
    
}
</script>
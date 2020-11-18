const knex = require('../db/knex')

const updateBalance = (type, balance, amount, userid) => {
    switch(type){
        case 'credit':
            const creditedBalance = balance + amount
            updateuser(userid, creditedBalance)
            return creditedBalance
             
        case 'debit':
            const debitedBalance = balance - amount
            updateuser(userid, debitedBalance)
            return debitedBalance
               
        default:
            return 'Invalid Operation'
    }   
}

const updateuser = (userid, value) => {
    knex('users')
    .where('id', userid)
    .update('balance', value)
    .then((response) =>{
        if(response.length !== 0){
            console.log('Updated user successfully')
        }
    }).catch((err) =>{
        return err
    })
} 
module.exports = {
    updateBalance
}
const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { auth, isUser } = require('../middleware/auth')
const { checkDuplicateUsername } = require('../middleware/verifySignup')
const {  updateBalance } = require('../utils/customerFunctions')

router.post('/register', checkDuplicateUsername, (req, res) =>{
    knex('users').insert({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
        designation: 'customer'
       }).then((response) => {
           if(response.length !== 0){
            const user = response[0]   
            const payload = {
                id:user.id, 
                username:user.username, 
                balance: user.balance,
                designation: user.designation 
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET, {
                expiresIn: 86400
            })   
            return res.status(201).send(token)
           }
           
       }).catch((err) =>{
           res.status(500).send(err)
       })
})

router.post('/login', (req,res) => {
    const { username, password } = req.body
    if(!username || !password){
        return res.status(400).send({ error: 'Fields cannot be empty' })
    }
     knex('users').where({
           username,
           designation: 'customer' 
        }).then((response) =>{
            if(response.length === 0){
               return res.status(404).send({error: 'User not found'})
            }
            const user = response[0]
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword){
               return res.status(401).send({error: 'Invalid Password'})
            }
           const payload = {
                id: user.id,
                username: user.username,
                balance: user.balance,
                designation: user.designation
           } 

           const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 86400
            })
           return res.status(200).send({
                token
            })
         
        })
     
})

router.route('/account')
        .get([auth, isUser] , (req, res) => {
            const user = req.user
            knex('accounts')
            .where('userid', user.id)
            .then((account) =>{
                res.status(200).send({ accountDetails: account })
    })
}).post([auth, isUser], (req, res) =>{
    const user = req.user
    const { balance } = req.query
    knex('accounts')
        .insert({
            userid: user.id,
            balance,
            typeof_trans:'credit' 
        }).then((response) =>{
           return res.status(201).send({ response })
        }).catch((err) => {
            res.status(500).send(err)
        })
}) 


router.patch('/transaction', [auth, isUser] , (req, res) => {
    const user = req.user
    const { type, amount } = req.query
    
    knex('accounts')
        .where('userid', user.id)
        .orderBy('created_at', 'desc')
        .limit(1)
        .then((latestRow) =>{
                    if(parseFloat(amount) > parseFloat(latestRow[0].balance)){
                        return res.status(403).send({ error: 'Insufficient Funds' })
                    }
                    knex('accounts')
                    .insert({
                            userid: user.id,
                            balance: updateBalance(type, parseFloat(latestRow[0].balance), parseFloat(amount), user.id),
                            typeof_trans: type
                        })
                        
                    .then((response) =>{
                        if(response.length !== 0){
                            return res.status(202).send({ message: `Successfully ${ type }ed amount`})
                        }
                    }).catch((err) =>{
                        return res.status(500).send({error: err})
                    })  

            })
})

module.exports = router



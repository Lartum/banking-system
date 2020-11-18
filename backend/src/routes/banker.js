const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const knex = require('../db/knex')
const { auth, isBanker } = require('../middleware/auth')
const { checkDuplicateBankername  } = require('../middleware/verifySignup')

router.post('/register', checkDuplicateBankername, ( req, res) =>{
    const { username, password } = req.body 
    knex('users').insert({
        username: username,
        password: bcrypt.hashSync(password, 8),
        designation: 'banker'
       }).then((response) => {
           if(response.length !== 0){
            const user = response[0] 
            const payload = {
                id:user, 
                username: username, 
                designation: 'banker' 
            }   
            const token = jwt.sign(payload , process.env.JWT_SECRET, {
                expiresIn: 86400
            })
           return res.status(201).send({token})
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
           designation: 'banker' 
        }).then((response) =>{
            if(response.length === 0){
               return res.status(404).send({error: 'User not found'})
            }
            const validPassword = bcrypt.compareSync(password, user[0].password)
            if(!validPassword){
               return res.status(401).send({error: 'Invalid Password'})
            } 
            const user = response[0]
            const payload = {
                id: user.id,
                username: user.username,
                designation: user.designation
            } 
            const token = jwt.sign(payload , process.env.JWT_SECRET, {
                expiresIn: 86400
            })
           return res.status(200).send({
                token
            })
         
        })
     
})

router.get('/allcustomer', [ auth, isBanker ], async (req, res) =>{
    try {
        const users = await knex.column('id','username','balance','created_at').from('users').where('designation', 'customer')
        return res.status(200).json(users)
    } catch (error) {
       return res.status(500).send(error)
    }
})

router.get('/totalbalance', [ auth, isBanker ], async (req,res) =>{
    try {
        const totalAmount = await knex('users').where('designation', 'customer').sum('balance')
        
       return res.status(200).json(totalAmount[0])
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/usertrans',  [ auth, isBanker ], async (req, res) =>{
    const { userid } = req.body

    try {
        const user = await knex('accounts').where('userid', userid)
        return res.status(200).json(user) 
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router
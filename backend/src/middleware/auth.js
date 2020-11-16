const jwt = require('jsonwebtoken')
const knex = require('../db/knex')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        if(!token){
            res.status(403).send('no token found')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await knex('users').where('id', decoded.id)
        req.user = user[0]
        req.token = token
        
        next()
    } catch (error) {
        res.status(401).send({error:'Please Authenticate'})
    }
   
}

const isUser = async (req, res, next) => {
    try {
       if(req.user.designation !== 'customer'){
        return res.status(403).send({error:'Unauthorized error'})
       }
       next()
    } catch (error) {
      return res.status(500).send(error)
    }
}

const isBanker = async (req, res, next) => {
    try {
        const customer = await knex('users').where({
            id: req.user.id,
            designation: 'banker'
        })
        if(customer[0].designation !== 'banker'){
            res.status(403).send({error:'Unauthorized error'})
        }
        next()
     } catch (error) {
         res.status(500).send(error)
     }
}



module.exports = {
    auth,
    isUser,
    isBanker
}
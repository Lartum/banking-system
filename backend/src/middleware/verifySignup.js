const knex = require('../db/knex')


const checkDuplicateUsername = async (req, res, next) =>{
    try {
        const customer = await knex('users')
                                .where({
                                    username: req.body.username,
                                    designation: 'customer'
                                })
        if(customer.length !==0 ){
            res.status(400).json({
                error:'User already exists'
            })
            return
        }
        next()
    } catch (error) {
        res.status(500).send(error)
    }
 
}

const checkDuplicateBankername = async ( req, res, next ) =>{
    const banker = await knex('users').where({
        username:req.body.username,
        designation: 'banker'
     } )
    if(banker.length !==0){
        return res.status(400).send({
            error:'Banker already exists'
        })
        
    }
    next()
}

module.exports = {
    checkDuplicateUsername,
    checkDuplicateBankername
}
const express = require('express')
const router = express.Router()
const knex = require('../db/knex')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {
    auth,
    isUser
} = require('../middleware/auth')
const {
    checkDuplicateUsername
} = require('../middleware/verifySignup')
const {
    updateBalance
} = require('../utils/customerFunctions')

router.post('/register', checkDuplicateUsername, async (req, res) => {
    const {
        username,
        password
    } = req.body
    try {
        const response = await knex('users').insert({
            username: username,
            password: bcrypt.hashSync(password, 8),
            designation: 'customer'
        })
        if (response.length !== 0) {
            const user = response[0]
            const payload = {
                id: user,
                username: username,
                designation: 'customer'
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 86400
            })
            return res.status(200).send({
                token
            })

        } else {
            res.status(400).send({
                error: 'Account Could not be created'
            })
        }

    } catch (error) {
        res.status(500).send(error)
    }
    // knex('users').insert({
    //     username: username,
    //     password: bcrypt.hashSync(password, 8),
    //     designation: 'customer'
    //    }).then((response) => {
    //        if(response.length !== 0){
    //         const user = response[0]   
    //         const payload = {
    //             id: user,
    //             username: username,
    //             designation: 'customer'
    //        } 

    //        const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //             expiresIn: 86400
    //         })
    //        return res.status(200).send({
    //             token
    //         })
    //     }  
    //    }).catch((err) =>{
    //        res.status(500).send(err)
    //    })
})

router.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body
    try {
        if (!username || !password) {
            return res.status(400).send({
                error: 'Fields cannot be empty'
            })
        }
      const response = await knex('users').where({
                            username,
                            designation: 'customer'
                    })
    if (response.length !== 0) {
        const user = response[0]
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(401).send({
                error: 'Invalid Password'
            })
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
    } else {
        return res.status(404).send({message: 'User not found'})
        }
    } catch (error) {
        return res.status(500).send(error)
    }
    // if (!username || !password) {
    //     return res.status(400).send({
    //         error: 'Fields cannot be empty'
    //     })
    // }
    // knex('users').where({
    //     username,
    //     designation: 'customer'
    // }).then((response) => {
    //     if (response.length === 0) {
    //         return res.status(404).send({
    //             error: 'User not found'
    //         })
    //     }
    //     const user = response[0]
    //     const validPassword = bcrypt.compareSync(password, user.password)
    //     if (!validPassword) {
    //         return res.status(401).send({
    //             error: 'Invalid Password'
    //         })
    //     }
    //     const payload = {
    //         id: user.id,
    //         username: user.username,
    //         balance: user.balance,
    //         designation: user.designation
    //     }

    //     const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //         expiresIn: 86400
    //     })
    //     return res.status(200).send({
    //         token
    //     })

    // })

})

router.get('/currentuser', [auth, isUser], (req, res) => {
    delete req.user.password
    return res.status(200).send(req.user)
})

router.route('/account')
    .get([auth, isUser], (req, res) => {
        const user = req.user
        knex('accounts')
            .where('userid', user.id)
            .then((account) => {
                res.status(200).send({
                    accountDetails: account
                })
            })
    }).post([auth, isUser], (req, res) => {
        const user = req.user
        const {
            balance
        } = req.body
        knex('accounts')
            .insert({
                userid: user.id,
                balance,
                typeof_trans: 'credit'
            }).then((response) => {
                return res.status(201).send({
                    response
                })
            }).catch((err) => {
                res.status(500).send(err)
            })
    })


router.patch('/transaction', [auth, isUser], (req, res) => {
    const user = req.user
    const {
        type,
        amount
    } = req.body
    knex('accounts')
        .where('userid', user.id)
        .orderBy('created_at', 'desc')
        .limit(1)
        .then((latestRow) => {
            if (latestRow.length !== 0) {
                const currentbalance = latestRow[0].balance
                if ( parseFloat(amount) > parseFloat(currentbalance)) {
                    return res.status(403).send({
                        error: 'Insufficient Funds'
                    })
                }
                knex('accounts')
                    .insert({
                        userid: user.id,
                        amount: amount,
                        balance: updateBalance(type, currentbalance, parseFloat(amount), user.id),
                        typeof_trans: type
                    })

                    .then((response) => {
                        if (response.length !== 0) {
                            return res.status(202).send({
                                message: `Successfully ${ type }ed amount`
                            })
                        }
                    }).catch((err) => {
                        return res.status(500).send({
                            error: err
                        })
                    })
            } else {
                if(type === 'debit'){
                    return res.status(403).send({ message: 'Insufficient funds' })
                }
                knex('accounts')
                    .insert({
                        userid: user.id,
                        amount: amount,
                        balance: updateBalance(type, 0, parseFloat(amount), user.id),
                        typeof_trans: type
                    }).then((response) => {
                        if (response.length !== 0) {
                            return res.status(200).send({
                                message: `successfully ${type}ed amount`
                            })
                        }
                    })

            }

        })
})

module.exports = router
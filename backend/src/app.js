require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

require('./db/knex').queryBuilder()
require('./model/users')()
require('./model/accounts')()

const userRoute = require('./routes/customer')
const bankRoute = require('./routes/banker')


app.use(bodyParser.json())
app.use('/customers', userRoute)
app.use('/bankers', bankRoute)

app.listen(process.env.PORT, () =>{
    console.log(`Server running on port: ${process.env.PORT}`)
})
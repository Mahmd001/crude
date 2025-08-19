const express = require('express')
const app = express()

const DBconnect = require('./DBconfig/BDconfig.js')
const router = require('./Routes/userRoutes.js')
const route = require('./Routes/productRoute.js')

const cors = require('cors')

const mongoose = require('mongoose')

require('dotenv').config()

DBconnect()



app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

app.use('/api', router)
app.use('/api',route)

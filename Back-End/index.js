const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const DBconnect = require('./DBconfig/BDconfig.js')
const router = require('./Routes/userRoutes.js')
const route = require('./Routes/productRoute.js')




const cors = require('cors')

const mongoose = require('mongoose')

require('dotenv').config()

DBconnect()


app.use(cookieParser())
app.use(express.json())
app.use(cors({
         origin: 'http://localhost:5173',
        credentials: true
     }))




const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})
app.use('/api', require('./Routes'))

require('dotenv').config()
const mongoose = require('mongoose')

const DBconnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected succesifuly")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = DBconnect
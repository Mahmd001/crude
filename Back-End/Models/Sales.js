const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({
   productname:{
    type: String,
    required: true,
    unique: true
    },
    quantity:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    order:{
        type: String,
        default:'Approved',
    },
    createAt:{
        type: Date,
        default: Date.now()
    },
    updatedAt:{
        type: Date,
        default: Date.now()
    }
});
const Sales = mongoose.model("sales", salesSchema)
module.exports = Sales;
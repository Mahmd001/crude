const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
        default:'pending',
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
const Product = mongoose.model("product", productSchema)
module.exports = Product;
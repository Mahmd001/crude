const mongoose = require('mongoose')

const productuserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
      email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
      password:{
        type: String,
        required: true,
        trim: true
    },
      role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
      status:{
        type: String,
        enum: ["active", "inactive"],
        default: "active"
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

const Productuser = mongoose.model("userproduct", productuserSchema)
module.exports = Productuser;
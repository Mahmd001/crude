const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
      address:{
        type: String,
        required: true
    },
      wallet:{
        type: String,
        default: 0
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
},{
    timestamps: true
});

const User = mongoose.model("user", userSchema)
module.exports = User;
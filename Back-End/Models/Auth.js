const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const authSchema = new mongoose.Schema({
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
        type: Number,
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
    otpToken:{
        type: String,
        default: ''
    },
    otpExpireAt:{
        type: Number,
        default: 0
    },
    isAccountVerify:{
      type: Boolean,
      default: false
    },
    resetOtp:{
        type: String,
        default: ''
    },
    resetOtpExpireAt:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

// authSchema.pre('save', async function(next) {
  
//   if(!this.isModified('password')){
//     return next();

//     const salt = bcrypt.genSalt(10)
//     this.password = bcrypt.hash(this.password, salt)
//   }
// })


const User = mongoose.model("auth", authSchema)
module.exports = User;
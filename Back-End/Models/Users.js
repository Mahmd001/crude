const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
},{
    timestamps: true
});


// userSchema.pre('save', async function(next) {
  
//   if(!this.isModified('password'))return next();
//   // const salt = await bcrypt.genSalt(10)
//   this.password = await bcrypt.hash(this.password, 10)
//   next()
// }); 

// userSchema.method.comparePassword = function (enteredPasswor){

// }


const User = mongoose.model("user", userSchema)
module.exports = User;
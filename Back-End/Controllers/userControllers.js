const User = require('../Models/Users.js')
    const bcrypt = require('bcrypt')
    const jwt = require('jsonwebtoken')
    // const cookie = require('cookie-parser')


exports.create = async(req, res)=>{
    const {name, password, email, address} = req.body
    if(!name || !password || !email || !address){
        return res.status(500).json({Message: "pls input field"})
    }
    try {

        const Exist = await User.findOne({email})

        if(Exist){

            return res.status(400).json({errorMessage: "user already exist..."})
        }  
        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({name, email, address, password:hashPassword})

         console.log(user)

        const saved = await user.save();

      

       const token = jwt.sign({id: user._id},
        process.env.JWT_SECRETE, {expiresIn: '2d'})

       res.cookie('token', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'Abdullahi',
        samsite: process.env.NODE_ENV === 'Abdullahi' ?
        'none': 'Strict',
        maxAge: 2 * 24 * 60 * 60 * 1000
       })
         res.status(201).json({message: "User created successifull...", user:saved})
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}

exports.fetchAll = async(req, res)=>{
     const { password, email, } = req.body
     if(!password || !email){
        return  res.json({Message: "email and password are required"})
     }
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({errorMessage: "invalid email"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({errorMessage: "invalid password"})
        }
        const token = jwt.sign({id: user._id}, 
            process.env.JWT_SECRETE,{expiresIn: '2d'})

            res.cookie('token',token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'Abdullahi',
                samsite: process.env.NODE_ENV === 'Abdullahi' ?
                'none': 'strict',
                macAge: 2 * 24 * 60 * 60 * 1000
            })

        // const getUser = await User.find()
        // if(!getUser || getUser.length === 0){
        // return res.status(404).json({errorMessage: "user not found..."})
        // }
        res.status(200).json({Message: "Login successfull"})
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}

exports.fetchById = async(req, res)=>{
    try {
        const id = req.params.id
         const getById = await User.findById(id)

        if(!getById || getById.length === 0){
        return res.status(404).json({errorMessage: "user not found..."})
        }
        res.status(200).json(getById)
        
    } catch (error) {
    console.log({errorMessage: error.message})
    }
}
exports.Update = async(req, res)=>{
    try {
        const id = req.params.id
         const getById = await User.findById(id)

        if(!getById || getById.length === 0){
        return res.status(404).json({errorMessage: "user not found..."})
        }
        const updatedData = await User.findByIdAndUpdate(id,req.body,{new: true})
        // const updatedData = await update.save()
        res.status(200).json({message: "user Updated successfull..."})
    } catch (error) {
    console.log({errorMessage: error.message})
    }
}
exports.deleteById = async(req, res)=>{
    try {
        const id = req.params.id
         const getById = await User.findById(id)

        if(!getById || getById.length === 0){
        return res.status(404).json({errorMessage: "user not found..."})
        }
        const deletedData = await User.findByIdAndDelete(id)
        res.status(200).json({errorMessage: "User deleted successifull"})
    } catch (error) {
       console.log({errorMessage: error.message})
    }
}
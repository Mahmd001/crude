const User = require('../Models/Users.js')


exports.create = async(req, res)=>{
    try {
      const newUser = new User(req.body)
      console.log(newUser)
        const {email} = req.body
        const Exist = await User.findOne({email})

        if(Exist){
            return res.status(400).json({errorMessage: "user already exist..."})
        }  
        const saved = await newUser.save();
        res.status(201).json({message: "User created successifull..."})
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}

exports.fetchAll = async(req, res)=>{
    try {
        const getUser = await User.find()
        if(!getUser || getUser.length === 0){
        return res.status(404).json({errorMessage: "user not found..."})
        }
        res.status(200).json(getUser)
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
const Productuser = require('../Models/productuser.js')

exports.create = async(req, res)=>{
    try {
        const  userProduct = new Productuser(req.body)
        const {email} = userProduct
        const exist = await Productuser.findOne({email})
        if(exist){
             return res.status(400).json({Message: "user Already exist"})
        }
        const finduser = await Productuser.find()
        if(!finduser || finduser.length == 0){
            userProduct.role = "admin"
        }
        const save = await userProduct.save()
        res.status(201).json(save)
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}

exports.fetchAll = async(req, res)=>{
    try {
        const getusers = await Productuser.find()
        if(!getusers){
            return res.status(404).json({Message: "user not found"})
        }
        res.status(200).json(getusers)
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}

exports.fetchById = async(req, res)=>{
    try {
        const {id} = req.params
        const getById = await Productuser.findById(id)
        if(!getById){
            return res.status(404).json({Message: "user not found"})
        }
        res.status(200).json(getById)
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}

exports.updateById = async(req, res)=>{
    try {
          const {id} = req.params
        const getById = await Productuser.findById(id)
        if(!getById){
            return res.status(404).json({Message: "user not found"})
        }
        await Productuser.findByIdAndUpdate(id, req.body,{new: true})
        res.status(200).json({Message: "User Updated successifull"})
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}
exports.deleteById = async(req, res)=>{
    try {
        const {id} = req.params
        const getById = await Productuser.findById(id)
        if(!getById){
            return res.status(404).json({Message: "user not found"})
        }
        const deletes =  await Productuser.findByIdAndDelete(id)
         res.status(200).json({Message: "User deleted successifull"})
    } catch (error) {
     console.log({errorMessage: error.message})
    }
}
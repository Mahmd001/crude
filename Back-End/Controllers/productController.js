const Product = require('../Models/Product.js')

exports.create = async(req, res)=>{
    try {
        const newproduct = new Product(req.body)
        console.log(newproduct)
        const {productname} = newproduct
        const exist = await Product.findOne({productname})
        if(exist){
            return res.status(400).json({errorMessage: "Product already Exist"})
        }
        const saveproduct = await newproduct.save();
        res.status(201).json(saveproduct)
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}
exports.fechAll = async(req, res)=>{
    try {
        const getProduct = await Product.find()
        if(!getProduct || getProduct.length == 0){
            return res.status(400).json({errorMessage: "Product not found"})
        }
        res.status(200).json(getProduct)
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}
exports.fechById = async(req, res)=>{
    try {
        const {id} = req.params
        const getById = await Product.findById(id)
        if(!getById || getById.length == 0){
            return res.status(400).json({errorMessage: "Product not found"})
        }
       
        res.status(200).json(getById)
        
    } catch (error) {
      console.log({errorMessage: error.message})
    }
}
exports.update = async(req, res)=>{
    try {
        const id = req.params.id
         const getById = await Product.findById(id)
        if(!getById || getById.length == 0){
            return res.status(400).json({errorMessage: "Product not found"})
        }
        const updateproduct = await Product.findByIdAndUpdate(id, req.body,{new: true})
        res.status(200).json(updateproduct)
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}
exports.deleteProduct = async(req,res)=>{
    try {
         const id = req.params.id
         const getById = await Product.findById(id)
        if(!getById || getById.length == 0){
            return res.status(400).json({errorMessage: "Product not found"})
        }
         await Product.findByIdAndDelete(id)
        res.status(200).json({Message: "product deleted successifull.."})
    } catch (error) {
          console.log({errorMessage: error.message})
    }
}
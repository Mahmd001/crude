const User = require('../Models/Auth.js')

exports.Getuser = async(req, res)=>{
    const userId = req.user.id
    if(!userId){
        return res.json({error: "user not found"})
    }

    try {
        const user = await User.findById(userId)
          if(!user){
        return res.json({error: "user not found"})
    }
    res.status(200).json({userData:{
        name: user.name,
        email: user.email,
        isAccountVerify: user.isAccountVerify
    }})
    } catch (error) {
        console.log({Message:error.message})
        res.status(500).json({Message: error.message})
    }
}
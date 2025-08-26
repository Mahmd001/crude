const User = require('../Models/Auth.js')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
const transporter = require('../Nodemailer/transporter')


exports.register = async(req, res)=>{
    const {name, email, password, address}= req.body
    // const {name, email, password, address} = req.body
    if(!name || !email || !password || !address){
        return res.status(400).json({Message: "Input Field are Required"})
    }
    try {
        const exist = await User.findOne({email})
        if(exist){
         return res.status(400).json({Message: "user already exist"})
        }
        const users = await User.find()
        //  const role = users.length === 0 ? "admin" : "user";
        if(users.length === 0){
            users.role = 'admin'
        }else{
            users.role = 'user'
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({name, email, address, password: hashPassword,})
          await user.save()

        const token = jwt.sign({id: user._id, Role: user.role}, 
            process.env.JWT_SECRET,{expiresIn: '5d'})

            res.cookie('token', token,{
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 5 * 24 * 60 * 60 * 1000
            })

            const mailOption = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: 'Welcome to Earnflow',
                text: `Welcome ${name} your account has been created successfull with a email:${email}`
            }
            await transporter.sendMail(mailOption)

             res.status(201).json({Message: "user register successifull"})
    } catch (error) {
        console.log({errorMessage: error.message})
        res.status(500).json({"error": "email not sent !"})
    }
}

exports.login = async(req, res)=>{
     const {email, password} = req.body
      if( !email || !password){
        return res.status(400).json({Message: "Input Field are Required"})
    }
    try {
        const user = await User.findOne({email})
        if(!user){
         return res.status(400).json({Message: "invalid email"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(404).json({Message: "Invalid password"})
        }
           const token = jwt.sign({id: user._id, Role: user.role}, 
            process.env.JWT_SECRET,{expiresIn: '5d'})

            res.cookie('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 
                'none': 'lax',
                maxAge: 5 * 24 * 60 * 60 * 1000
            })
            res.status(200).json({Message: "user logging successifull",
                isAccountVerify:user.isAccountVerify
            })

    } catch (error) {
         console.log({errorMessage: error.message})
    }
}

exports.logout = async(req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none': 'lax',
        })
         res.status(200).json({Message: "user logged out sccessifull"})
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}

exports.fetchAll = async(req, res)=>{
    try {
        const getAll = await User.find().select('-password')
        if(!getAll || getAll.length === 0){
             return res.status(404).json({Message: "user not found"})
        }
        res.status(200).json(getAll)
    } catch (error) {
          console.log({errorMessage: error.message})
    }
}

exports.fetchById = async(req, res)=>{
    try {
        const id = req.params.id
         const getById = await User.findById(id).select('-password')
        if(!getById || getById.length === 0){
             return res.status(404).json({Message: "user not found"})
        }
        res.status(200).json(getById)
    } catch (error) {
          console.log({errorMessage: error.message})
    }
}

exports.updateUser = async(req, res)=>{
    try {
         const id = req.params.id
         const getById = await User.findById(id)
        if(!getById || getById.length === 0){
             return res.status(404).json({Message: "user not found"})
        }
        await User.findByIdAndUpdate(id, req.body,{new:true})
        res.status(200).json({Message: "User updated succesifull"})
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}

exports.deleteUser = async(req, res)=>{
    try {
        const id = req.params.id
         const getById = await User.findById(id)
        if(!getById || getById.length === 0){
             return res.status(404).json({Message: "user not found"})
        }
        await User.findByIdAndDelete(id)
        res.status(200).json({Message: "Deleted successfull"})
    } catch (error) {
          console.log({errorMessage: error.message})
    }
}

exports.sendOtpToken = async(req, res)=>{
    const userId = req.user.id
    if(!userId){
        return res.status(404).json({errorMessage: "User not found"})
    }
    try {
        const user = await User.findById(userId)

        if(user.isAccountVerify){
            return res.json({Message: "Account already verified"})
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.otpToken = otp
        user.otpExpireAt =  Date.now() +  10 * 60 * 1000

        await user.save();
        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject:'Account Verification Otp',
            text: `Verification code  is ${otp} verify your account using this otp  valid for 10min`
        }
        await transporter.sendMail(mailOption)
        res.status(200).json({Message: "Verification code has been send on email"})
    } catch (error) {
        console.log({errorMessage: error.message})
    }
}

    exports.verifiedOtp = async(req, res)=>{
   const userId = req.user.id
   const {otp} = req.body
    try {
        const user = await User.findById(userId)
        if(!user){
             return res.status(404).json({Message: "User not found"})
        }

        if(user.otpToken === '' || user.otpToken !== otp){
              return res.status(404).json({Message: "Invalid Otp"})
        }

        if(user.otpExpireAt < Date.now()){
              return res.status(404).json({Message: "Otp expired"})
        }

        user.isAccountVerify = true;
        user.otpExpireAt = 0
        user.otpToken = ''

        await user.save();
          return res.status(200).json({Message: "Email Verification successful"})
    } catch (error) {
           console.log({Message: error.message})
           res.status(404).json({Message: error.message})
    }
}

exports.isAuthenticate = async(req, res)=>{
    try {
        res.status(200).json({Message: "user authenticated successifull"})
    } catch (error) {
        console.log({Message: error.message})
    }
}

exports.sendResetOtp = async(req, res)=>{
    const{email}= req.body
    if(!email){
          return res.status(404).json({errorMessage: "email is required"})
    }

    try {
        const user = await User.findOne({email})
        if(!user){
        return res.status(404).json({errorMessage: "User not found"})
        }

        const otp = String(Math.floor(10000 + Math.random() * 90000))
        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Resend Password Verification Otp",
            text: `your resend password otp is ${otp}`
        }

        transporter.sendMail(mailOption)
        res.status(200).json({Message: "resend otp successifull"})
    } catch (error) {
          console.log({errorMessage: error.message})
    }
}

exports.resetPassword = async(req, res)=>{
    const {email, otp, newpassword} = req.body
    if(!email || !otp || !newpassword){
          return res.status(404).json({errorMessage: "input field are required"})
 }
          try {
            const user = await User.findOne({email})
              if(!user){
               return res.status(404).json({errorMessage: "User not found"})
            }

            if(user.resetOtp === '' || user.resetOtp !== otp){
                 return res.status(400).json({errorMessage: "invalid otp token"})
            }

            if(user.resetOtpExpireAt < Date.now){
                 return res.status(400).json({errorMessage: " Expired otp"})
            }
            const hashPassword =  await bcrypt.hash(newpassword, 10)
            user.password = hashPassword
            user.resetOtp = ''
            user.resetOtpExpireAt = 0

            await user.save();
             return res.status(200).json({Message: "reset password successifull"})
          } catch (error) {
             console.log({errorMessage: error.message})
          }
   
}
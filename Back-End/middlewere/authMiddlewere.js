const jwt = require('jsonwebtoken')

exports.authmiddlewere = async(req, res, next)=>{
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({ message: "Not authorized,  token" })
    }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if(decoded.id){
                req.user= {id: decoded.id, role:decoded.role}
            }else{
                     return res.status(401).json({ message: "Not authorized Login" })
            }
            next();
        } catch (error) {
              return res.status(401).json({ message: "Invalid or expired token" })
        }
    
}
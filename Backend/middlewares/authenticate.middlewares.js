const jwt = require("jsonwebtoken");

const authentication = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.user = decoded.userID;
                next()
            }else{
                res.send("Please Login First!")
            }
        })
    }else{
        res.send("Please login First!")
    }
}
module.exports = {authentication}
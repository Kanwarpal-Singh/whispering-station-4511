const express = require("express");
const {UserModel} = require("../models/userModel")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRouter = express.Router();

UserRouter.get("/",(req,res)=>{
    const allusers = UserModel.find();
    console.log(allusers);
    res.send(allusers)
})
UserRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,mobile,dob}= req.body;
    try {
        const exuser = await UserModel.findOne({email})
        if(exuser){
            res.send({"msg":"User already exist, please login"})
        }else{
            bcrypt.hash(password,5,async(err,hashed_pass)=>{
                if(err){
                    console.log(err);
                    res.send({"err":err.message})
                }else{
                    const user = new UserModel({name,email,password:hashed_pass,gender,mobile,dob})
                    await user.save()
                    console.log(`Welcome Mr. ${user.name}! you have been registered to the website`)
                    res.send(`Welcome Mr. ${user.name}! you have been registered to the website`)
                }
            })
        }
    } catch (error) {
        res.send(error.message)
        console.log("Something went wrong")
    }

})
UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id},"masai")
                    res.send({"msg":"You have successfully logged in",token})
                    console.log(token)
                }else if(err){
                    res.send({"error":`Please check you password!/err,${err.message}`})
                }
            })
        }else{
            res.send({"error":"User Not Found, Please SignUP First"})
            console.log("please signup first")
        }
    } catch (error) {
        console.log(error);
        res.send({"error":error})
    }
})


module.exports = {UserRouter}
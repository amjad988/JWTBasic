const asyncHandler = require("express-async-handler");
const userModel=require("../models/user.model.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const registerUser=asyncHandler(async(req,res)=>{
        const {username,email,password}=req.body
        if(!username|| !email|| !password)
        {
            res.status(400)
            throw new Error("All Fields are Required ")
        }
        const isExist=await userModel.findOne({email})
        if(isExist){
            res.status(400);
            throw new Error("Already Exists")
        }
        const encryPassword = await bcrypt.hash(password,8)
        const user=await userModel.create({username,email,password:encryPassword})
        if (user)
        {
            res.status(201).json({username:user.username,email:user.email})
        }else{
            res.status(400)
            throw new Error("user data not valid")
        }
    res.json({message :"Register Succeed"})
})



//Login User
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        res.status(400)
        throw new Error("All fields are required")
    }
    const user =await userModel.findOne({email})
    if(user&&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },

        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"50m"}
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("incorrect fields")
    }
    res.json({message:"Login"})
})


const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user)
})

module.exports={registerUser,loginUser,currentUser}

const express=require("express")
const userRouter=express.Router()
const {registerUser,loginUser, currentUser}=require("../controller/user.controller.js")
const validateToken = require("../middleware/validate.middleware.js")


userRouter.post("/register",registerUser)

userRouter.post("/login",loginUser)

userRouter.get("/current",validateToken,currentUser)

module.exports = userRouter
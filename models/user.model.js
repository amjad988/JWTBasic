const mongoose=require("mongoose")

const userSchema=mongoose.Schema(
    {
        username:{
            type:String,
            required:[true,"Add username"]
        },
        email:{
            type:String,
            required:[true,"Add email"],
            unique:[true,"Email Already Exists"]
        },
        password:{
            type:String,
            required:[true,"Add Password"]
        }
    },{timestamps:true}
)

module.exports=mongoose.model("User",userSchema)
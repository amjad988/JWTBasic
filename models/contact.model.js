const mongoose=require("mongoose")

const contactSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        required:[true,"please fill name field"]
    },
    email:{
        type:String,
        required:[true,"please fill email field"]
    },
    phone:{
        type:String,
        required:[true,"please fill email field"]
    }
},{timestamps:true})

module.exports=mongoose.model("Contact",contactSchema)
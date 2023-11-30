const express=require("express")
const env=require("dotenv")
const router = require("./routes/contact.route.js")
const errorHandler=require("./middleware/errorHandler.middleware.js")
const connectionDb = require("./config/db.connect.js")
const userRouter = require("./routes/users.route.js")
const app=express()
env.config()

connectionDb()
const Port=process.env.PORT || 8000
app.use(express.json())
app.use("/app/api",router)
app.use("/app/user",userRouter)
app.use(errorHandler)

app.listen(Port,()=>{
    console.log(`Server is Running on ${Port}`);
})
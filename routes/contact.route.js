const express=require("express")
const router=express.Router()
const {getContact,postContact,getByName, updateById}=require("../controller/contact.controller.js")
const validateToken = require("../middleware/validate.middleware.js")



router.use(validateToken)
router.route("/").get(getContact).post(postContact)
router.route("/:id").put(updateById)
router.route("/:name").get(getByName)

module.exports=router
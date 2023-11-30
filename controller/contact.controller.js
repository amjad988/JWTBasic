const asynchandler=require("express-async-handler")
const contactModel=require("../models/contact.model.js")


const getContact = asynchandler(async (req, res) => {
    try {
        const contacts = await contactModel.find({userId:req.user.id});
        console.log(contacts);
        if (!contacts) {
            return res.status(404).json({ error: 'No contacts found for the user' });
        }
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



const postContact=asynchandler(async(req,res)=>{
    console.log(req.body);
    const{name,email,phone}=req.body
    if(!name ||!email||!phone){
        res.status(400)
        throw new Error("All Fields are Required:")
    }
    const addData=await contactModel.create({
        name,email,phone,userId:req.user.id
    })
    res.status(200).json(addData)
})

const getByName = asynchandler(async (req, res) => {
        const contact = await contactModel.findOne({ name: req.params.name });
        if (!contact) {
            res.status(404)
            throw new Error("Contact not Found")
        }
        const getName = contact.phone;
        if (!getName) {
            res.status(404)
            throw new Error("Name not Found")
        }
        res.status(201).json(getName);
});


const updateById=asynchandler(async(req,res)=>{
    const update=await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(update)
})
module.exports={getContact,postContact,getByName,updateById}
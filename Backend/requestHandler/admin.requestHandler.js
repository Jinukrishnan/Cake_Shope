const adminSchema = require("../models/admin.model.js")
const bcrypt = require("bcrypt")
const pkg=require("jsonwebtoken")
const{sign}=pkg;
exports.adminRegister = async (req, res) => {
    try {
        const { email, password, cpassword } = req.body;
        if (!(email && password && cpassword))
            return res.status(204).send({ msg: "fields are empty" });
        if (password !== cpassword)
            return res.status(401).send({ msg: "password not match" });
        const admin = await adminSchema.findOne();
        if (admin)
            return res.status(401).send({ msg: "email already exist" });
        bcrypt.hash(password, 10).then(async (hashedPassword) => {
            await adminSchema.create({ email, password: hashedPassword })
            res.status(201).send({ msg: "Admin Created" })
        }).catch((error) => {
            console.log(error);
        })
    } catch (error) {
        res.status(500).send({ error })
    }
}

exports.adminLogin=async(req,res)=>{
   try {
    const {email,password}=req.body;
    if (!(email && password))
        return res.status(401).json({ msg: "fields are empty" });
    const admin=await adminSchema.findOne({email})
    const success=await bcrypt.compare(password,admin.password);
    console.log(success);
    if(!success)
        return res.status(400).send({msg:"un autherized access"})
    const {_id}=admin;
    const adminToken=await sign({_id},process.env.JWT_KEY,{expiresIn:"24h"})
    res.status(200).send({msg:"Successfully Loged In ",adminToken})
     
   } catch (error) {
    res.status(500).send({error});
   }
}
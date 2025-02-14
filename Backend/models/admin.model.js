const mongoose =require("mongoose");


const adminSchema=new mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
})

exports.module=mongoose.model.Admins||mongoose.model("Admin",adminSchema);
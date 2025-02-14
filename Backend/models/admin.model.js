const mongoose =require("mongoose");


const adminSchema=new mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
})

module.exports=mongoose.model.Admins||mongoose.model("Admin",adminSchema);
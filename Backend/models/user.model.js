const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    mobile:{type:Number},
    otp:{type:Number}
})

module.exports=mongoose.model.Users||mongoose.model("User",userSchema);
const mongoose =require("mongoose");

const productSchema=new mongoose.Schema({
    id:{type:Number,require:true},
    name:{type:String,require:true},
    price:{type:Number,require:true},
    stock:{type:Number,require:true},
    category:{type:String,require:true},
    image:{type:String,require:true},
})
module.exports=mongoose.model.Products||mongoose.model("Product",productSchema);
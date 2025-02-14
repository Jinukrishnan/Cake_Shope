const productSchema = require("../models/product.model.js")
const cartSchema = require("../models/cart.model.js")
exports.addProduct = (req, res) => {

    res.status(200).send("hai");
}

exports.getProducts = async (req, res) => {
    try {
        const product = await productSchema.find();
       const cart= await cartSchema.find();
    const products=product.map((prod)=>{
        const cartitem=cart.find(item=>item.productId.toString()===prod._id.toString())
        return {...prod.toObject(),quantity: cartitem ? cartitem.quantity : 0};
    })
       console.log(product);
       
        if (!products)
            return res.status(500).send({ error: "data not fetch from data base" })
        res.status(200).json({ products});
    } catch (error) {
        res.status(404).json({ error })
        
    }
}
// exports.cartQuantity=async(req,res)=>{
//     try {
//         const totalQuantity = await cartSchema.aggregate([
//             { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
//         ]);
//         console.log(totalQuantity);
//         if (!this.cartQuantity)
//             return res.status(500).send({ error: "cart not have products" })
//         res.status(200).send({ totalQuantity});
//     } catch (error) {
//         res.status(404).json({ error })
//     }
// }

exports.addToCart = async(req, res) => {
    try {
        const {  productId } = req.body;
        if (!productId) return res.status(404).json({ msg: "try again" });
        
        const data = await cartSchema.findOne({ productId });
        
        const result = data 
            ? await cartSchema.updateOne({  productId }, { $inc: { quantity: 1 } })
            : await cartSchema.create({  productId });
            
        res.status(201).json({ msg: data ? "quantity increased" : "added to cart" });
    } catch (error) {
        res.status(500).json({ error });
    }
};
exports.removeFromCart = async(req, res) => {
    try {
        const {  productId } = req.body;
        if (!productId) return res.status(404).json({ msg: "try again" });

        const data = await cartSchema.findOne({  productId });
        if (!data) return res.status(500).json({ msg: "product is not in cart" });

        const result = data.quantity > 1
            ? await cartSchema.updateOne({  productId }, { $inc: { quantity: -1 } })
            : await cartSchema.deleteOne({  productId });

        res.status(201).json({ 
            msg: data.quantity > 0 ? "quantity decreased" : "removed from cart" 
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};


exports.Cart=async(req,res)=>{
  try {
   
    // const cartItems = await cartSchema.find() // Find all cart items of the user
    // .populate("productId", "name price image") // Populate product details
    // .exec();
    const cartItems=await cartSchema.aggregate([{$lookup:{from:"products",localField:"productId",foreignField:"_id",as:"products"}}]);

    
res.status(200).send(cartItems)
  } catch (error) {
    res.status(500).json({ error });
    
  }
    
}




const productSchema = require("../models/product.model.js")
const cartSchema = require("../models/cart.model.js")
exports.addProduct = (req, res) => {

    res.status(200).send("hai");
}

exports.getProducts = async (req, res) => {
    try {
        const products = await productSchema.find();
        if (!products)
            return res.status(500).send({ error: "data not fetch from data base" })
        res.status(200).send({ products });
    } catch (error) {
        res.status(404).json({ error })

    }
}

exports.addToCart = async(req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!productId || !userId) return res.status(404).json({ msg: "try again" });
        
        const data = await cartSchema.findOne({ userId, productId });
        
        const result = data 
            ? await cartSchema.updateOne({ userId, productId }, { $inc: { quantity: 1 } })
            : await cartSchema.create({ userId, productId });
            
        res.status(201).json({ msg: data ? "quantity increased" : "added to cart" });
    } catch (error) {
        res.status(500).json({ error });
    }
};
exports.removeFromCart = async(req, res) => {
    try {
        const { userId, productId } = req.body;
        if (!productId || !userId) return res.status(404).json({ msg: "try again" });

        const data = await cartSchema.findOne({ userId, productId });
        if (!data) return res.status(500).json({ msg: "product is not in cart" });

        const result = data.quantity > 0
            ? await cartSchema.updateOne({ userId, productId }, { $inc: { quantity: -1 } })
            : await cartSchema.deleteOne({ userId, productId });

        res.status(201).json({ 
            msg: data.quantity > 0 ? "quantity decreased" : "removed from cart" 
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};


exports.getUserCart=async(req,res)=>{
  try {
    const {userId}=req.params
    const cartItems = await cartSchema.find({ userId }) // Find all cart items of the user
    .populate("productId", "name price image") // Populate product details
    .exec();
res.status(200).send(cartItems)
  } catch (error) {
    res.status(500).json({ error });
    
  }
    
}




const {Router}=require("express")
const urh=require("./requestHandler/user.requestHandler.js")
const prh=require("./requestHandler/product.requestHandler.js")
const arh=require("./requestHandler/admin.requestHandler.js")
const router=Router();

// router.route("/sendotp").post(urh.sendOTP);
// admin
router.route("/adminregister").post(arh.adminRegister)

// products
router.route("/addproduct").post(prh.addProduct);
router.route("/getproducts").get(prh.getProducts);
router.route("/addtocart").post(prh.addToCart);
router.route("/removefromcart").post(prh.removeFromCart);
router.route("/cart").get(prh.Cart);

module.exports=router
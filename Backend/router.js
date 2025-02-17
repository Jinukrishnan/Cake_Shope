const {Router}=require("express")
const urh=require("./requestHandler/user.requestHandler.js")
const prh=require("./requestHandler/product.requestHandler.js")
const arh=require("./requestHandler/admin.requestHandler.js")
const router=Router();
const Auth=require("./middleware/auth.js")
// router.route("/sendotp").post(urh.sendOTP);
// admin
router.route("/adminregister").post(arh.adminRegister)
router.route("/adminlogin").post(arh.adminLogin)
router.route("/forgetpassword").post(arh.forgetPassword)
router.route("/resetpassword").post(arh.resetPassword)
router.route("/adminhome").get(Auth,arh.adminHome)
// restaurant
router.route("/addrestaurant").post(arh.addRestaurant)
router.route("/listrestaurants").get(arh.listRestaurants)
router.route("/updaterestaurant/:_id").put(arh.updateRestaurant)
router.route("/deleterestaurant/:_id").delete(arh.deleteRestaurant)

// products
router.route("/addproduct").post(prh.addProduct);
router.route("/getproducts").get(prh.getProducts);
router.route("/addtocart").post(prh.addToCart);
router.route("/removefromcart").post(prh.removeFromCart);
router.route("/cart").get(prh.Cart);

module.exports=router
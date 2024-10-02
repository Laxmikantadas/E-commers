const express=require("express")
const router=express.Router()
const auth=require("../middleware/auth.js")
const{addCart}=require("../controllers/cartController.js")
router.post("/addcart",auth,addCart)



module.exports=router
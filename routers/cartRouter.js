const express=require("express")
const router=express.Router()
const auth=require("../middleware/auth.js")
const {addCart,removeProdutCart}=require("../controllers/cartController.js")
router.post("/addcart",auth,addCart)
router.post("/removecart",auth,removeProdutCart)


module.exports=router
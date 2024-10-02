const express=require("express")
const router=express.Router()
const auth=require("../middleware/auth.js")
const {getAllproduct,getProduct,search}=require("../controllers/userController.js")
router.get("/getallproduct",auth,getAllproduct)
router.get("/getproduct/:id",auth,getProduct)
router.get("/search",auth,search)

module.exports=router
const express=require("express")
const router=express.Router()
const admin=require("../middleware/adminMiddleware.js")
const auth=require("../middleware/auth.js")
const upload=require("../middleware/multerMiddleware.js")
const {addProduct,updateUpdate,deleteProduct}=require("../controllers/productController.js")
router.post("/addpoduct",auth,admin,upload.single("image"),addProduct)
router.put("/updateproduct/:id",auth,admin, upload.single("image"),updateUpdate)
router.delete("/deleteproduct/:id",auth,admin,deleteProduct)
router.get("alldata",auth,admin,)
module.exports=router
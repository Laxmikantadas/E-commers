const User = require("../models/userModel.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Product=require("../models/productModel.js")
const Cart=require("../models/cartModel.js")

const addCart=asyncHandler(async (req,res)=>{
try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const product = await Product.findById(productId);
    if (!product) {
        throw ApiError(404, 'Product not found');
    }

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
        cart = new Cart({ userId, products: [] });
    }
    const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += quantity;
    } else {
        cart.products.push({ productId, quantity, price: product.price });
    }
    cart.totalAmount = cart.products.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    await cart.save();

} catch (error) {
    throw ApiError(error.statusCode,error.message)
}
})

module.exports={
    addCart
}
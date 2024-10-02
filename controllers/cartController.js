const User = require("../models/userModel.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Product=require("../models/productModel.js")
const Cart=require("../models/cartModel.js")

const addCart=asyncHandler(async (req,res)=>{
try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product){
        throw ApiError(404, 'Product not found')
    }

    let cart = await Cart.findOne({ userId }) || new Cart({ userId, products: [] });

    const productInCart = cart.products.find(p => p.productId.toString() === productId);

    if (productInCart) {
        productInCart.quantity += quantity;
    } else {
        cart.products.push({ productId, quantity, price: product.price });
    }

    cart.totalAmount = cart.products.reduce((total, item) => total + (item.price * item.quantity), 0);

    await cart.save();
    res.status(201).json(cart);
} catch (error) {
    throw ApiError(error.statusCode,error.message)
}
})

const removeProdutCart=asyncHandler(async (req,res)=>{
    const { productId } = req.body;  // Product ID to remove
    const userId = req.user.id;      // Assuming user is authenticated

    // Find the user's cart
    let cart = await Cart.findOne({ userId });
    if (!cart) throw ApiError(404, 'Cart not found');

    // Find the product in the cart
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    
    // If the product doesn't exist in the cart, throw an error
    if (productIndex === -1) throw ApiError(404, 'Product not found in cart');

    // Get the price and quantity of the product being removed
    const { price, quantity } = cart.products[productIndex];

    // Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Recalculate the total amount after removing the product
    cart.totalAmount -= price * quantity;

    // Save the updated cart
    await cart.save();
    res.status(200).json({
        message: 'Product removed from cart successfully',
        cart,
        totalAmount: cart.totalAmount
    });
})
module.exports={
    addCart,
    removeProdutCart
}
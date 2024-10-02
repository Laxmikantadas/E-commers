const User = require("../models/userModel.js");
const ApiError = require("../utils/ApiError.js");
const uploadOnCloudinary = require("../utils/cloudinary.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Product = require("../models/productModel.js")

// -----------------------addProduct----------------------
const addProduct = asyncHandler(async (req, res) => {
    try {
        const { title, description, price, category, quantity} = req.body  
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }      
        const cloudinaryResponse = await uploadOnCloudinary(req.file.buffer);

        const newProduct = new Product({
            title,
            description,
            price,
            category,
            quantity,
            images: cloudinaryResponse.secure_url
        });
        await newProduct.save()
        res.status(201).json(newProduct);
    } catch (error) {
        throw ApiError(error.statusCode, error.message)
    }
})
const updateUpdate = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            throw ApiError(404, "User is not Not found")
        }
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.buffer);

            if (cloudinaryResponse) {
                imageUrl = cloudinaryResponse.secure_url;
            }
        }
        const updateData = {
            ...req.body,
        };
        if (imageUrl) {
            updateData.image = imageUrl;
        }
        const updateProduct = await Product.findByIdAndUpdate(id,updateData, { new: true })
        console.log(updateProduct);

        res.status(200).json(updateProduct)

    } catch (error) {
        throw ApiError(error.statusCode, error.message)
    }
})
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            throw ApiError(404, "User is not Not found")
        }
        const deleteProduct = await Product.findByIdAndDelete(id)
        res.status(200).json(deleteProduct)

    } catch (error) {
        throw ApiError(error.statusCode, error.message)
    }
})







module.exports = {
    addProduct,
    updateUpdate,
    deleteProduct
}
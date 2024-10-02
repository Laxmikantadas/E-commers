const User = require("../models/userModel.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const Product = require("../models/productModel.js")

const getAllproduct = asyncHandler(async (req, res) => {
    try {
        const getallProduct = await Product.find({})
        if (!getallProduct) {
            throw ApiError(404, "Product Not found")
        }
        res.status(200).json(getallProduct)
    } catch (error) {
        throw ApiError(error.statusCode, error.message)
    }
})
const getProduct = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        if (!product) {
            throw ApiError(404, "Product Not Found")
        }
        res.status(200).json(product)
    } catch (error) {
        throw ApiError(error.statusCode, error.message)
    }
})

const search = asyncHandler(async (req, res) => {
    try {
        const { title, category } = req.query
        const allProduct = await Product.find({})
        const filterProduct = (title, category) => {
            return allProduct.filter(product => {
                const titleMatches = title ? product.title===title: true;
                const categoryMatches = category ? product.category === category : true;
                return titleMatches && categoryMatches;
            })
        }
        const filteringProduct=filterProduct(title,category)
        res.status(200).json(filteringProduct)
    } catch (error) {
        throw ApiError(error.statusCode, error.message)
    }
})





module.exports = {
    getAllproduct,
    getProduct,
    search
}
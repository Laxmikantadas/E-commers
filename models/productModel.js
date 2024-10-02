const mongoose = require("mongoose");
const producSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: ["dress", "toy", "food"],
            default: "dress",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        images: {
            type: String,
            required: false
        },
        ratings: [
            {
                star: Number,
                comment: String,
                postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
            },
        ],
        totalrating: {
            type: String,
            default: 0,
        },
    },

    { timestamps: true }
);

const modelSchema = mongoose.model("products", producSchema);
module.exports = modelSchema;
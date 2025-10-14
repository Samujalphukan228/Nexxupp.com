import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Use a consistent model name
const priceModel = mongoose.models.priceModel || mongoose.model("priceModel", priceSchema);

export default priceModel;

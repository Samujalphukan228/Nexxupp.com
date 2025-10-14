import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    priceCardId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the price card
        ref: "priceModel", // Must match the model name in pricing.model.js
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Register the model
const queryModel = mongoose.models.query || mongoose.model("query", querySchema);

export default queryModel;

import mongoose from "mongoose"

const savedLocationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
        index: true, 
    }, 
    locationName: {
        type: String, 
        required: true, 
        trim: true, 
    },
    lat: {
        type: Number, 
        required: true,
    }, 
    lng: {
        type: Number, 
        required: true, 
    }, 
    savedAt: {
        type: Date, 
        default: Date.now,
    },
});

export const SavedLocation = mongoose.model("SavedLocation", savedLocationSchema);
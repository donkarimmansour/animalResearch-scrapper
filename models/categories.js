const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true,
        unique: true,
    }, 
    description: {
        type: String,
        required: false, 
        trim: true,
    }, 
    visible: {
        type: Boolean,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
})


module.exports = mongoose.model("category", CategorySchema)
const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    }, 
    description: {
        type: String,
        required: true,
        trim: true,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
    },

    address: {
        type: String,
        required: true,
        trim: true,
    },

    gender: {
        type: String,
        required: true,
        trim: true,
    },

    signalCount: {
        type: Number,
        required: false,
        trim: true,
        default: 0,
    },

    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "media"
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "category"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "user"
    },

    status: {
        type: Boolean,
        required: true,
        trim: true
    },

    visible: {
        type: Boolean,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        trim: true
    },

    lostDate: {
        type: Date,
        required: true,
        trim: true
    },

    localisation: {
        type: {
            longitude: {
                type: String,
                required: true,
                trim: true,
            },
            latitude: {
                type: String,
                required: true,
                trim: true,
            }
        },
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

module.exports = mongoose.model("post", PostSchema)
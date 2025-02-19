const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        firstname: {
            type: String,
            required: [true, 'First name is required']
        },
        lastname: {
            type: String,
            required: [true, 'Last name is required']
        },
        profilePhoto: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        postCount: {
            type: Number,
            default: 0
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            enum: ["Admin", "Guest", "Editor"]
        },
        viewers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
        blocked: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        plan: {
            type: String,
            enum: ["Free", "Premium", "Pro"],
            default: "Free"
        },
        userAward: {
            type: String,
            enum: ["Bronze", "Silver", "Gold"],
            default: "Bronze"
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema)
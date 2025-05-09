const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
        title: {
            type: String,
            required: [true, 'Post title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Post description is required'],
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            // required: [true, 'Post category is required'],
        },
        numViews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        disLikes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        user: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please Author is required']
        }],
        photo: {
            type: String,
            required: [true, 'Photo Image is required']
        },
    },
    {
        timestamps: true,
        toJSON: {virtuals: true}

    })

// Hook
postSchema.pre(/^find/, function (next) {
    postSchema.virtual("viewsCount").get(function () {
        const post = this;
        return post.numViews.length;
    })

    postSchema.virtual("likesCount").get(function () {
        const post = this;
        return post.likes.length;
    })

    postSchema.virtual("disLikesCount").get(function () {
        const post = this;
        return post.disLikes.length;
    })

    postSchema.virtual("likesPercentage").get(function () {
        const post = this;
        const total = +post.likes.length + +post.disLikes.length;
        const percentage = (post.likes.length / total) * 100;
        return `${percentage}%`
    })

    postSchema.virtual("dislikesPercentage").get(function () {
        const post = this;
        const total = +post.disLikes.length + +post.disLikes.length;
        const percentage = (post.disLikes.length / total) * 100;
        return `${percentage}%`
    })

    postSchema.virtual("daysAgo").get(function () {
        const post = this;
        if (!post.createdAt || isNaN(new Date(post.createdAt))) {
            console.log(`Invalid createdAt for post ${post._id}: ${post.createdAt}`);
            return "Unknown";
        }
        const createdAtDate = new Date(post.createdAt);
        const now = new Date();

        // Normalize to UTC midnight for calendar day comparison
        const createdAtDay = new Date(
            Date.UTC(createdAtDate.getUTCFullYear(), createdAtDate.getUTCMonth(), createdAtDate.getUTCDate())
        );
        const today = new Date(
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
        );

        const diffMs = today - createdAtDay;
        const daysAgo = Math.floor(diffMs / 86400000);

        console.log(`Post ${post._id}: createdAt=${createdAtDate}, now=${now}, createdAtDay=${createdAtDay}, today=${today}, daysAgo=${daysAgo}`);

        if (daysAgo < 0) {
            return "In the future";
        }
        return daysAgo === 0
            ? "Today"
            : daysAgo === 1
                ? "Yesterday"
                : `${daysAgo} days`;
    });
    next();
})

module.exports = mongoose.model("Post", postSchema)
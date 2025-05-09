const mongoose = require('mongoose');
const Post = require('../../model/Post/Post');

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
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
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
        toJSON: {virtuals: true}
    }
);
// Ensure User model is defined before using it

//Hooks
//pre-before record is saved
userSchema.pre("findOne", async function (next) {

    this.populate({
        path: 'posts'
    })

    const userId = this._conditions._id;
    console.log("User ID:", userId);
    const posts = await Post.find({ user: userId });
    // Get the last post created by the user
    const lastPost = posts[posts.length - 1];
    const lastDate = new Date(lastPost?.createdAt);
    console.log("lastDate:", lastDate);
    const lastDateStr = lastDate.toDateString();
    console.log("Last Post:", lastDateStr);
    userSchema.virtual("lastPostedDate").get(function () {
        return lastDateStr;
    });
    // --------------- check if user is inactive ----------------------//
    const currentDate = new Date();
    //get between the current date and last post date
    const diff = currentDate - lastDate;
    // get different in days
    const diffInDays = diff / (1000 * 3600 * 24);
    if(diffInDays > 30){
        userSchema.virtual("isInActive").get(function () {
            return true;
        });
        // console.log(userId);
        //find user by id and update
        await User.findByIdAndUpdate(userId, {

            isBlocked: true
            },
            {
                new: true
            }
        );
    }else{
        userSchema.virtual("isInActive").get(function () {
            return false;
        });

        //find user by id and update
        await User.findByIdAndUpdate(userId, {
                isBlocked: false
            },
            {
                new: true
            }
        );
    }

    // ------------ Last active date -------------

    //convert to days ago e.g 1 day ago
    const daysAgo = Math.floor(diffInDays);
    //add virtual last active in days ago
    userSchema.virtual("lastActive").get(function () {
    if(daysAgo <= 0){
        return 'Today'
    }

    if(daysAgo === 1){
        return 'Yesterday'
    }

    if(daysAgo > 1){
        return `${daysAgo} days`;
    }
    });
    // --------- Update user award based on posts
    const numberOfPosts = posts.length
    if(numberOfPosts < 10){
        await User.findByIdAndUpdate(userId, {
                userAward: "Bronze"
            },
            {
                new: true
            }
        );
    }

    if(numberOfPosts > 10){
        await User.findByIdAndUpdate(userId, {
                userAward: "Silver"
            },
            {
                new: true
            }
        );
    }

    if(numberOfPosts > 20){
        await User.findByIdAndUpdate(userId, {
                userAward: "Gold"
            },
            {
                new: true
            }
        );
    }

    next();
});

//post - after saving
// userSchema.post("save", function (next){
//     console.log("Post hook");
//     next()
// })
//Fullname
userSchema.virtual("fullname").get(function () {
    return `${this.firstname} ${this.lastname}`;
})

//Initials
userSchema.virtual("Initials").get(function () {
    return `${this.firstname[0]} ${this.lastname[0]}`;
})

//posts count
userSchema.virtual("postCounts").get(function () {
    return this.posts.length;
})

//get followers count
userSchema.virtual("followersCounts").get(function () {
    return this.followers.length;
})

//get following count
userSchema.virtual("followingCounts").get(function () {
    return this.following.length;
})

//viewers
userSchema.virtual("viewersCounts").get(function () {
    return this.viewers.length;
})

//blocked
userSchema.virtual("blockedCounts").get(function () {
    return this.blocked.length;
})

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;
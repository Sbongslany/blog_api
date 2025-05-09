const User = require("../../model/User/User");
const Post = require("../../model/Post/Post");
const {appErr} = require("../../utils/appErr");
const error = require("multer/lib/multer-error");

// Create Posts
const postsCtrl = async(req, res, next) => {
    const {title, description, category } = req.body;
    try {
        // find the user
        const author = await User.findById(req.userAuth);

        //Check if user is blocked
        if (author.isBlocked) {
            return next(appErr("Access denied, User is blocked", 403));
        }

        // Create a post
        const postCreated = await Post.create({
            title,
            description,
            user: author._id,
            category,
            photo: req?.file?.path
        });
        // Associate a user ti a post
        author.posts.push(postCreated);
        //save
        await author.save();
       res.json({
           status: "success",
           data: postCreated
       })
    } catch (error) {
        next(appErr(error.message));
    }
}
//Toggle Posts
const likeToggleCtrl = async (req, res, next) => {
    try {
        // 1. get post
        const post = await Post.findById(req.params.id);
        // 2. check if the user has alredy liked the post
        const isLiked = post.likes.includes(req.userAuth);
        // 3. if the user has already liked the post, unlike the post
        if(isLiked) {
            post.likes = post.likes.filter(
                like => like.toString() !== req.userAuth.toString()
            );
            await post.save();
        } else{
            post.likes.push(req.userAuth);
            await post.save();
        }
        res.json({
            status: "success",
            data: "You have successfully Liked the post"
        })
    } catch (error) {
        next(appErr(error.message));
    }
};
//Toggle Posts
const disLikeToggleCtrl = async (req, res, next) => {
    try {
        // 1. get post
        const post = await Post.findById(req.params.id);
        // 2. check if the user has alredy liked the post
        const isLiked = post.disLikes.includes(req.userAuth);
        // 3. if the user has already liked the post, unlike the post
        if(isLiked) {
            post.disLikes = post.disLikes.filter(
                like => like.toString() !== req.userAuth.toString()
            );
            await post.save();
        } else{
            post.disLikes.push(req.userAuth);
            await post.save();
        }
        res.json({
            status: "success",
            data: "You have successfully DisLiked the post"
        })
    } catch (error) {
        next(appErr(error.message));
    }
};
// Get all posts
const getAllPostsCtrl = async (req, res, next) => {
    try {
        // Log req.userAuth to verify its value
        console.log(`req.userAuth: ${req.userAuth}`);

        const posts = await Post.find({})
            .populate("user")
            .populate("category", "title")
            .populate("comments", "description")
        ;

        const filteredPosts = posts.filter(post => {
            // Handle case where user is missing or not populated
            if (!post.user) {
                console.log(`Post ${post._id} has no user`);
                return false;
            }

            // Handle user as an array or single object
            let blockedUsers = [];
            if (Array.isArray(post.user)) {
                // If user is an array, check blocked lists of all users
                blockedUsers = post.user
                    .filter(user => user && Array.isArray(user.blocked))
                    .flatMap(user => user.blocked.map(id => id.toString()));
            } else {
                // If user is a single object, get blocked array
                blockedUsers = Array.isArray(post.user.blocked)
                    ? post.user.blocked.map(id => id.toString())
                    : [];
            }

            // Convert req.userAuth to string for comparison
            const userId = req.userAuth ? req.userAuth.toString() : null;

            // Check if user is blocked
            const isBlocked = userId && blockedUsers.includes(userId);

            // Log details for debugging
            console.log(`Post ${post._id}: isBlocked=${isBlocked}, userId=${userId}, blockedUsers=${blockedUsers}`);

            return !isBlocked; // Include post if user is not blocked
        });

        res.json({
            status: "success",
            data: filteredPosts
        });
    } catch (error) {
        next(appErr(error.message));
    }
};
// Get single Post
const getPostbyIdCtrl = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        const isViewed = post.numViews.includes(req.userAuth);
        if(isViewed ){
            res.json({
                status: "success",
                data: post
            })
        }else{
           post.numViews.push(req.userAuth);
           await post.save()
            res.json({
                status: "success",
                data: post
            })
        }
    } catch (error) {
        next(appErr(error.message));
    }
}
// Delete Post
const deletePostCtrl = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.user.toString() !== req.userAuth.toString()) {
            return next(appErr("You are not allowed to delete this post", 403));
        }

        await Post.findByIdAndDelete(req.params.id)

       res.json({
           status: "success",
           data: "You have successfully Deleted the post"
       })
    } catch (error) {
        next(appErr(error.message));
    }
}
// Update post
const updatePostCtrl = async(req, res, next) => {
    const { title, description, category } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if(post.user.toString() !== req.userAuth.toString()) {
            return next(appErr("You are not allowed to update this post", 403));
        }

        await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                category,
                photo: req?.file?.path
            },
            {
                new: true
            }
        )

        res.json({
            status: "success",
            data: "Post updated successfully"
        })
    } catch (error) {
        next(appErr(error.message));
    }
}

module.exports = {
    postsCtrl,
    getAllPostsCtrl,
    getPostbyIdCtrl,
    deletePostCtrl,
    updatePostCtrl,
    likeToggleCtrl,
    disLikeToggleCtrl
}
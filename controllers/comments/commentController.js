const User = require("../../model/User/User");
const Post = require("../../model/Post/Post");
const Comment = require("../../model/Comment/Comment");
const {appErr} = require("../../utils/appErr");
const Category = require("../../model/Category/Category");


createCommentCtrl = async(req, res, next) => {
    const {description} = req.body;
    // Find Post
    const post = await Post.findById(req.params.id)

    //create comment
    const comment = await Comment.create({
        post: post._id,
        description,
        user: req.userAuth,
        });
    //push the comment to post
    post.comments.push(comment._id);
    // find user
    const user = await User.findById(req.userAuth)
    //push to user
    user.comments.push(comment._id);
    //save
    await post.save({validateBeforeSave: false});
    await user.save({validateBeforeSave: false});



    try {
       res.json({
           status: "success",
           data: comment
       })
    } catch (error) {
        next(appErr(error.message));
    }
}

getCommentsCtrl = async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Comment by Id Route"
       }) 
    } catch (error) {
       res.json(error.message)
    }
}

deleteCommentsCtrl = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if(comment.user.toString() !== req.userAuth.toString()) {
            return next(appErr("You are not allowed to delete this comment", 403));
        }

         await Comment.findByIdAndDelete(
            req.params.id,

        )

        res.json({
           status: "success",
           data: "Comment has been deleted"
       })
    } catch (error) {
        next(appErr(error.message));
    }
}

updateCommentsCtrl = async(req, res, next) => {
    const {description} = req.body;
    try {
        const comment = await Comment.findById(req.params.id);
        if(comment.user.toString() !== req.userAuth.toString()) {
            return next(appErr("You are not allowed to update this comment", 403));
        }

        const category = await Comment.findByIdAndUpdate(
            req.params.id,
            {description},
            {new: true, runValidators: true}
        )
        res.json({
            status: "success",
            data: category
        })
    } catch (error) {
        next(appErr(error.message));
    }
}

module.exports = {
    createCommentCtrl,
    getCommentsCtrl,
    deleteCommentsCtrl,
    updateCommentsCtrl
}
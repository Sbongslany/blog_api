 const express = require('express');
 const postsRouter = express.Router();
 const multer = require('multer');
 const storage = require("../../config/cloudinary");
 const { postsCtrl, getAllPostsCtrl, deletePostCtrl, updatePostCtrl, getPostbyIdCtrl, likeToggleCtrl, disLikeToggleCtrl } = require('../../controllers/posts/postsController');
 const islogin = require('../../middlewares/isLogin');

 //file image upload
 const upload = multer({ storage });

 //Create Post
postsRouter.post('/',islogin ,upload.single('image'),postsCtrl )
//Get all post
postsRouter.get('/', islogin,getAllPostsCtrl)
 //Like toggle
 postsRouter.get('/likes/:id',islogin,likeToggleCtrl)
 //DisLike toggle
 postsRouter.get('/dislikes/:id',islogin,disLikeToggleCtrl)
//get Post
postsRouter.get('/:id',islogin, getPostbyIdCtrl)
//Delete
postsRouter.delete('/:id',islogin ,deletePostCtrl )
//Update 
postsRouter.put('/:id',islogin,upload.single('image'), updatePostCtrl)
module.exports = postsRouter;
 const express = require('express');
const { postsCtrl, getAllPostsCtrl, deletePostCtrl, updatePostCtrl } = require('../../controllers/posts/postsController');

 const postsRouter = express.Router();

//Create Post
postsRouter.post('/', postsCtrl )
//Get all post
postsRouter.get('/', getAllPostsCtrl)
//get Post
postsRouter.get('/:id', getAllPostsCtrl)
//Delete
postsRouter.delete('/:id', deletePostCtrl )
//Update 
postsRouter.put('/:id', updatePostCtrl)
module.exports = postsRouter;
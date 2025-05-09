 const express = require('express');
const { createCommentCtrl, getCommentsCtrl, deleteCommentsCtrl, updateCommentsCtrl } = require('../../controllers/comments/commentController');
 const islogin = require('../../middlewares/isLogin');

 const commentsRouter = express.Router();

//Comments Post
commentsRouter.post('/:id',islogin, createCommentCtrl)
//Get Post
commentsRouter.get('/:id', getCommentsCtrl)
//Delete
commentsRouter.delete('/:id',islogin ,deleteCommentsCtrl )
//Update 
commentsRouter.put('/:id',islogin, updateCommentsCtrl )

module.exports = commentsRouter;
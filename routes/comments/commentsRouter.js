 const express = require('express');
const { createCommentCtrl, getCommentsCtrl, deleteCommentsCtrl, updateCommentsCtrl } = require('../../controllers/comments/commentsController');

 const commentsRouter = express.Router();

//Comments Post
commentsRouter.post('/', createCommentCtrl)
//Get Post
commentsRouter.get('/:id', getCommentsCtrl)
//Delete
commentsRouter.delete('/:id', deleteCommentsCtrl )
//Update 
commentsRouter.put('/:id', updateCommentsCtrl )

module.exports = commentsRouter;
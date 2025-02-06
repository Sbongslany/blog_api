 const express = require('express');

 const commentsRouter = express.Router();

//Comments Post
commentsRouter.post('/', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Comment created"
       })
    } catch (error) {
       res.json(error.message)
    }
})
//get Post
commentsRouter.get('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Comment by Id Route"
       }) 
    } catch (error) {
       res.json(error.message)
    }
})
//Delete
commentsRouter.delete('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Comment delete Route"
       })
    } catch (error) {
       res.json(error.message)
    }
})
//Delete 
commentsRouter.put('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Comment Update Route"
       })
    } catch (error) {
       res.json(error.message) 
    }
})

module.exports = commentsRouter;
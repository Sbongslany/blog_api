 const express = require('express');

 const postsRouter = express.Router();

//Create Post
postsRouter.post('/', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Post created"
       })
    } catch (error) {
       res.json(error.message)
    }
})
//Get all post
postsRouter.get('/', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Post Route"
       })
    } catch (error) {
       res.json(error.message)
    }
})
//get Post
postsRouter.get('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Get Posts by Id Route"
       }) 
    } catch (error) {
       res.json(error.message)
    }
})

//Delete
postsRouter.delete('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "delete Posts Route"
       })
    } catch (error) {
       res.json(error.message)
    }
})

//Update 
postsRouter.put('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Update Posts Route"
       })
    } catch (error) {
       res.json(error.message)
    }
})
module.exports = postsRouter;
 const express = require('express');

 const categoriesRouter = express.Router();

//category Post
categoriesRouter.post('/', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "category created"
       })
    } catch (error) {
       res.json(error.message)
    }
})
//get Post
categoriesRouter.get('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "category Route"
       }) 
    } catch (error) {
       res.json(error.message)
    }
})
//Delete
categoriesRouter.delete('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "category delete Route"
       })
    } catch (error) {
       res.json(error.message)
    }
})
//Delete 
categoriesRouter.put('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "category Update Route"
       })
    } catch (error) {
       res.json(error.message) 
    }
})

module.exports = categoriesRouter;
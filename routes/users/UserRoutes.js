 const express = require('express');

 const userRouter = express.Router();

 userRouter.post('/register', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "user registered"
       })
    } catch (error) {
       res.json(error.message)
    }
})

userRouter.post('/login', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Login"
       })
    } catch (error) {
       res.json(error.message)
    }
})

//Profile
userRouter.get('/profile/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Profile Route"
       })
    } catch (error) {
       res.json(error.message)
    }
})
//users
userRouter.get('/', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Get all Users Route"
       })
    } catch (error) {
       res.json(error.message)
    }
})
//Delete
userRouter.delete('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Delete Route"
       })
    } catch (error) {
       res.json(error.message)
    }
})
//Edit
userRouter.put('/:id', async(req, res) => {
    try {
       res.json({
           status: "success",
           data: "Edit Route"
       })
    } catch (error) {
       res.json(error.message)
    }
})

module.exports = userRouter;
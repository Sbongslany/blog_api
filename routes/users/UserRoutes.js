 const express = require('express');
const { userRegisterCtrl, userLoginCtrl, getUsersCtrl, userProfileCtrl, userDeleteCtrl } = require('../../controllers/users/userController');

 const userRouter = express.Router();

userRouter.post('/register', userRegisterCtrl)

userRouter.post('/login', userLoginCtrl)

userRouter.get('/profile/:id', userProfileCtrl )

userRouter.get('/', getUsersCtrl)

userRouter.delete('/:id', userDeleteCtrl)

userRouter.put('/:id', )

module.exports = userRouter;
 const express = require('express');
 const userRouter = express.Router();
const { userRegisterCtrl, userLoginCtrl, getUsersCtrl, userProfileCtrl, userDeleteCtrl } = require('../../controllers/users/userController');
const islogin = require('../../middlewares/isLogin');


userRouter.post('/register', userRegisterCtrl)

userRouter.post('/login', userLoginCtrl)

userRouter.get('/profile/',islogin ,userProfileCtrl )

userRouter.get('/', getUsersCtrl)

userRouter.delete('/:id', userDeleteCtrl)

userRouter.put('/:id', )

module.exports = userRouter;
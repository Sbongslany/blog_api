const express = require('express');
const userRouter = express.Router();
const {
    userRegisterCtrl,
    userLoginCtrl,
    getUsersCtrl,
    userProfileCtrl,
    userDeleteCtrl,
    userUpdateCtrl,
    profilePhotoUploadCtrl,
    whoViewedMyProfileCtrl,
    followingCtrl,
    unfollowCtrl
} = require('../../controllers/users/userController');
const islogin = require('../../middlewares/isLogin');
const multer = require('multer');
const storage = require("../../config/cloudinary");

// instance of multer
const upload = multer({storage});
//Register
userRouter.post('/register', userRegisterCtrl)
//Login
userRouter.post('/login', userLoginCtrl)
//Viewers
userRouter.get('/profile-viewers/:id',islogin, whoViewedMyProfileCtrl)
//Following
userRouter.get('/following/:id',islogin, followingCtrl)
//unfolllowing
userRouter.get('/unfollow/:id',islogin, unfollowCtrl)
//Profile
userRouter.get('/profile', islogin, userProfileCtrl)
//All
userRouter.get('/', getUsersCtrl)
//Delete
userRouter.delete('/:id', userDeleteCtrl)
//Update
userRouter.put('/:id', userUpdateCtrl)



userRouter.post('/profile-photo-upload',islogin, upload.single("profile"), profilePhotoUploadCtrl)

module.exports = userRouter;
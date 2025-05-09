const express = require('express');
const userRouter = express.Router();
const {
    userRegisterCtrl,
    userLoginCtrl,
    userProfileCtrl,
    userDeleteCtrl,
    userUpdateCtrl,
    profilePhotoUploadCtrl,
    whoViewedMyProfileCtrl,
    followingCtrl,
    unfollowCtrl,
    blockUserCtrl,
    unblockUserCtrl,
    adminBlockCtrl,
    adminUnBlockCtrl,
    updatePasswordCtrl,
    deleteAccountCtrl,
    getUsersCtrl
} = require('../../controllers/users/userController');
const islogin = require('../../middlewares/isLogin');
const multer = require('multer');
const storage = require("../../config/cloudinary");
const isAdmin = require("../../middlewares/isAdmin");

// instance of multer
const upload = multer({storage});
//Register
userRouter.post('/register', userRegisterCtrl)
//Login
userRouter.post('/login', userLoginCtrl)
//Viewers
userRouter.get('/profile-viewers/:id',islogin, whoViewedMyProfileCtrl)
// get users
userRouter.get('/', getUsersCtrl)
//Following
userRouter.get('/following/:id',islogin, followingCtrl)
//unfolllowing
userRouter.get('/unfollow/:id',islogin, unfollowCtrl)
//block
userRouter.get('/block/:id',islogin, blockUserCtrl)
//unblock
userRouter.get('/unblock/:id',islogin, unblockUserCtrl)
//admin block
userRouter.get('/admin-block/:id',islogin,isAdmin, adminBlockCtrl)
//admin unblock
userRouter.get('/admin-unblock/:id',islogin,isAdmin, adminUnBlockCtrl)
//Profile
userRouter.get('/profile', islogin, userProfileCtrl)
//All
// userRouter.get('/', getUsersCtrl)
//Update
userRouter.put('/',islogin ,userUpdateCtrl)
//Update-password
userRouter.put('/update-password',islogin ,updatePasswordCtrl)
//Update-password
userRouter.delete('/delete-account',islogin ,deleteAccountCtrl)
//upload profile picture
userRouter.post('/profile-photo-upload',islogin, upload.single("profile"), profilePhotoUploadCtrl)

module.exports = userRouter;
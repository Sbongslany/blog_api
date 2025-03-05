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
    whoViewedMyProfileCtrl
} = require('../../controllers/users/userController');
const islogin = require('../../middlewares/isLogin');
const multer = require('multer');
const storage = require("../../config/cloudinary");

// instance of multer
const upload = multer({storage});
userRouter.post('/register', userRegisterCtrl)

userRouter.post('/login', userLoginCtrl)

userRouter.get('/profile-viewers/:id',islogin, whoViewedMyProfileCtrl)

userRouter.get('/profile/', islogin, userProfileCtrl)

userRouter.get('/', getUsersCtrl)

userRouter.delete('/:id', userDeleteCtrl)

userRouter.put('/:id', userUpdateCtrl)



userRouter.post('/profile-photo-upload',islogin, upload.single("profile"), profilePhotoUploadCtrl)

module.exports = userRouter;